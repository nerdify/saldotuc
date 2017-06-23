const {sign} = require('jsonwebtoken');
const {createError} = require('micro');
const query = require('micro-query');

const Verification = require('./models/verification');

module.exports = async req => {
	const {token} = query(req);

	const verification = await Verification.findOne({
		verified: true,
		requestToken: token
	}).populate('user');

	if (!verification) {
		throw createError(400);
	}

	return {
		token: sign({id: verification.user._id}, process.env.TUC_SECRET)
	};
};
