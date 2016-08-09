var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
Promise.promisifyAll(bcrypt);



var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    this.on('saving', function(model) {
      return bcrypt.genSaltAsync(10)
      .then(salt => bcrypt.hashAsync(model.get('password'), salt, function() {}))
      .then(hashedPW => model.set('password', hashedPW));
    });
  }
},
  {
    login: function (username, password) {
      return new User({username: username}).fetch()
      .then(user => bcrypt.compareAsync(password, user.get('password')))
      .then(pwdIsCorrect => {
        if (!pwdIsCorrect) { throw new Error('Authentication error...'); }
        return pwdIsCorrect;
      });
    }
  });

module.exports = User;
