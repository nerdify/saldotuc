import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation DeleteCardMutation($input: DeleteCardInput!) {
    deleteCard(input: $input) {
      deletedCardId
    }
  }
`;

function sharedUpdater(store, user, deletedID) {
  const userProxy = store.get(user.id);
  const conn = ConnectionHandler.getConnection(userProxy, 'CardList_cards');

  ConnectionHandler.deleteNode(conn, deletedID);
}

function commit(environment, user, card, onCompleted) {
  return commitMutation(
    environment,
    {
      mutation,
      onCompleted,
      variables: {
        input: {
          cardId: card.id,
        },
      },
      updater: (store) => {
        const payload = store.getRootField('deleteCard');

        sharedUpdater(store, user, payload.getValue('deletedCardId'));
      },
      optimisticUpdater: (store) => {
        sharedUpdater(store, user, card.id);
      },
    }
  );
}

export default {commit};
