const {createError, send} = require('micro');
const query = require('micro-query');

const Verification = require('./models/verification');

module.exports = async (req, res) => {
	const {token} = query(req);

	const verification = await Verification.findOne({
		verified: true,
		requestToken: token
	});

	if (!verification) {
		throw createError(400);
	}

	send(res, 200);
};
