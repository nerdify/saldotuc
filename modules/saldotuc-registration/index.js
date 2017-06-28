require('dotenv').config();

const {get, post, router} = require('microrouter');
const Raven = require('raven');

if (process.env.NODE_ENV === 'production') {
	Raven.config(process.env.TUC_SENTRY_DSN).install();
}

module.exports = router(
  get('/api/registration/confirm', require('./confirm')),
  get('/api/registration/verify', require('./verify')),
  post('/api/registration', require('./registration'))
);
