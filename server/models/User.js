var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		index: { unique: true}
	},
	password: String,
	created: {
		type: Date,
		required: true,
		default: new Date()
	}
})



UserSchema.methods.comparePassword = function (password, callback) {
	bcrypt.compare(password, this.password, callback);
}


UserSchema.pre('save', function (next) {
	var user = this;
	if (!user.isModified('password')) {
		return next();
	}

	return bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err);

		return bcrypt.hash(user.password, salt, function (hashError, hash) {
			  if (hashError) {
			  	return next(hashError)
			  }
			  user.password = hash;
			  return next()
		})
	})
})

module.exports = mongoose.model('User', UserSchema)