const mongoose = require('./db');

const {Schema} = mongoose;

const schema = new Schema({
	requestToken: {
		required: true,
		type: String
	},
	user: {
		ref: 'User',
		type: Schema.Types.ObjectId
	},
	verificationToken: {
		required: true,
		type: String
	},
	verified: {
		default: false,
		type: Boolean
	}
});

module.exports = mongoose.model('Verification', schema);
