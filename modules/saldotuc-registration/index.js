const {get, post, router} = require('microrouter');

module.exports = router(
  get('/api/registration/confirm', require('./confirm')),
  get('/api/registration/verify', require('./verify')),
  post('/api/registration', require('./registration'))
);
