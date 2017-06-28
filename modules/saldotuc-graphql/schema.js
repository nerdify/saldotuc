const got = require('got');
const {
	GraphQLFloat,
	GraphQLID,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString
} = require('graphql');
const {
	connectionArgs,
	connectionDefinitions,
	connectionFromPromisedArray,
	fromGlobalId,
	globalIdField,
	mutationWithClientMutationId,
	nodeDefinitions,
	offsetToCursor
} = require('graphql-relay');

const Card = require('./models/card');
const User = require('./models/user');

async function getBalance(number) {
	const response = await got(`https://balance.saldotuc.com/${number}`, {json: true});

	return response.body;
}

const {nodeField, nodeInterface} = nodeDefinitions(
	globalId => {
		const {id, type} = fromGlobalId(globalId);

		if (type === 'Card') {
			return Card.findById(id);
		} else if (type === 'User') {
			return User.findById(id);
		}

		return null;
	},
	obj => {
		if (obj instanceof Card) {
			return GraphQLCard; // eslint-disable-line no-use-before-define
		} else if (obj instanceof User) {
			return GraphQLUser; // eslint-disable-line no-use-before-define
		}

		return null;
	}
);

const GraphQLCard = new GraphQLObjectType({
	description: 'Represents a Card',
	name: 'Card',
	fields: {
		id: globalIdField(),
		balance: {
			description: 'The balance of the card.',
			type: GraphQLFloat,
			resolve: card => parseFloat(card.balance)
		},
		createdAt: {
			description: 'Identifies the date and time when the object was created.',
			type: GraphQLString,
			resolve: card => card.createdAt.toISOString()
		},
		name: {
			description: 'The name of the card.',
			type: GraphQLString,
			resolve: card => card.name
		},
		number: {
			description: 'The number of the card.',
			type: GraphQLString,
			resolve: card => card.number
		},
		updatedAt: {
			description: 'Identifies the date and time when the object was updated.',
			type: GraphQLString,
			resolve: card => card.updatedAt.toISOString()
		}
	},
	interfaces: [nodeInterface]
});

const {
	connectionType: CardConnection,
	edgeType: GraphQLCardEdge
} = connectionDefinitions({
	nodeType: GraphQLCard
});

const GraphQLUser = new GraphQLObjectType({
	description: 'A user is an individual\'s account on Saldo TUC.',
	name: 'User',
	fields: {
		id: globalIdField(),
		email: {
			description: 'The user\'s email.',
			type: GraphQLString
		},
		cards: {
			args: connectionArgs,
			description: 'A list of cards that the user owns.',
			type: CardConnection,
			resolve: (obj, args) =>
				connectionFromPromisedArray(Card.find({user: obj}), args)
		}
	},
	interfaces: [nodeInterface]
});

const Query = new GraphQLObjectType({
	description: 'The query root of Saldo TUC\'s GraphQL interface.',
	name: 'Query',
	fields: {
		node: nodeField,
		viewer: {
			type: GraphQLUser,
			resolve: (_, args, request) => request.user
		}
	}
});

const CreateCardMutation = mutationWithClientMutationId({
	description: 'Creates a new card.',
	name: 'CreateCard',
	inputFields: {
		name: {
			description: 'The name of card.',
			type: new GraphQLNonNull(GraphQLString)
		},
		number: {
			description: 'The number of the card.',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	outputFields: {
		cardEdge: {
			description: 'The edge from the user\'s card connection.',
			type: GraphQLCardEdge,
			resolve: ({card, user}) => new Promise(async resolve => {
				const cards = await Card.find({user});
				const offset = cards.findIndex(item => item._id.equals(card._id));

				resolve({
					cursor: offsetToCursor(offset),
					node: card
				});
			})
		}
	},
	mutateAndGetPayload: async ({name, number}, {user}) => {
		if (await Card.findOne({number, user})) {
			throw new Error('Esta tarjeta ya está asociada a tu cuenta');
		}

		try {
			const {balance} = await getBalance(number);

			const card = await new Card({balance, name, number, user}).save();

			return {card, user};
		} catch (err) {
			if (err.statusCode === 404) {
				throw new Error('Número de tarjeta no válido o inactivo');
			}
		}
	}
});

const UpdateCardBalanceMutation = mutationWithClientMutationId({
	description: 'Update the balance of the given card.',
	name: 'UpdateCardBalance',
	inputFields: {
		cardId: {
			description: 'The Card ID to update.',
			type: new GraphQLNonNull(GraphQLID)
		}
	},
	outputFields: {
		card: {
			description: 'The updated card.',
			type: GraphQLCard,
			resolve: card => card
		}
	},
	mutateAndGetPayload: async ({cardId}) => {
		try {
			const {id} = fromGlobalId(cardId);
			const card = await Card.findById(id);
			const {balance} = await getBalance(card.number);

			card.balance = balance;

			await card.save();

			return card;
		} catch (err) {
			if (err.statusCode === 404) {
				throw new Error('Número de tarjeta no válido o inactivo');
			}
		}
	}
});

const DeleteCardMutation = mutationWithClientMutationId({
	description: 'Delete a card.',
	name: 'DeleteCard',
	inputFields: {
		cardId: {
			description: 'The Node ID of the card object.',
			type: new GraphQLNonNull(GraphQLID)
		}
	},
	outputFields: {
		deletedCardId: {
			description: 'The deleted card ID.',
			type: new GraphQLNonNull(GraphQLID),
			resolve: ({cardId}) => cardId
		}
	},
	mutateAndGetPayload: async ({cardId}, {user}) => {
		const {id} = fromGlobalId(cardId);

		await Card.remove({user, _id: id}).exec();

		return {cardId};
	}
});

const Mutation = new GraphQLObjectType({
	description: 'The root query for implementing GraphQL mutations.',
	name: 'Mutation',
	fields: {
		createCard: CreateCardMutation,
		deleteCard: DeleteCardMutation,
		updateCardBalance: UpdateCardBalanceMutation
	}
});

module.exports = new GraphQLSchema({
	mutation: Mutation,
	query: Query
});
