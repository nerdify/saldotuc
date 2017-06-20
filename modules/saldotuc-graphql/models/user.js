const mongoose = require('./db');

const {Schema} = mongoose;

const schema = new Schema({
	email: {
		required: true,
		type: String,
		unique: true
	}
});

schema.virtual('cards', {
	foreignField: 'user',
	localField: '_id',
	ref: 'Card'
});

module.exports = mongoose.model('User', schema);
