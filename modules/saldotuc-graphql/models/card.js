const mongoose = require('./db');

const {Schema} = mongoose;

const schema = new Schema({
	balance: {
		default: 0,
		type: Number
	},
	createdAt: {
		default: Date.now,
		type: Date
	},
	name: {
		required: true,
		type: String
	},
	number: {
		required: true,
		type: String
	},
	updatedAt: {
		default: Date.now,
		type: Date
	},
	user: {
		ref: 'User',
		required: true,
		type: Schema.Types.ObjectId
	}
});

module.exports = mongoose.model('Card', schema);
