const mongoose = require('./db');

const {Schema} = mongoose;

const schema = new Schema({
	email: {
		required: true,
		type: String,
		unique: true
	}
});

module.exports = mongoose.model('User', schema);
