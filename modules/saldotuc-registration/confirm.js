const {createError} = require('micro');
const query = require('micro-query');
const redirect = require('micro-redirect');

const Verification = require('./models/verification');

module.exports = async (req, res) => {
	const {token} = query(req);

	const verification = await Verification.findOneAndUpdate({
		verificationToken: token,
		verified: false
	}, {
		verified: true
	});

	if (!verification) {
		throw createError(403);
	}

	redirect(res, 302, 'https://saldotuc.com/email-confirmed');
};
