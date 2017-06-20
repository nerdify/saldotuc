require('dotenv').config();

const graphqlHTTP = require('express-graphql');
const jwtAuth = require('micro-jwt-auth');

const schema = require('./schema');
const User = require('./models/user');

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

module.exports = compose(
	jwtAuth(process.env.TUC_SECRET),
	fn => async (req, res) => {
		req.user = await User.findById(req.jwt.id);

		return fn(req, res);
	}
)(graphqlHTTP({schema}));
