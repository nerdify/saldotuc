const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.TUC_MONGODB_URI, {
	useMongoClient: true
});

module.exports = mongoose;
