const {sign} = require('jsonwebtoken');
const {createError} = require('micro');
const query = require('micro-query');
const redirect = require('micro-redirect');

const Cookies = require('cookies');

const Verification = require('./models/verification');

module.exports = async (req, res) => {
	const {token} = query(req);

	const verification = await Verification.findOneAndUpdate({
		verificationToken: token,
		verified: false
	}, {
		verified: true
	}).populate('user');

	if (!verification) {
		throw createError(403);
	}

	const cookies = new Cookies(req, res);

	cookies.set('token', sign({id: verification.user._id}, process.env.TUC_SECRET), {
		expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1 year
		httpOnly: false
	});

	redirect(res, 302, 'https://saldotuc.com/email-confirmed');
};
