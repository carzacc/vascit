var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var amministratori = mongoose.Schema({

    local            : {
        username     : String,
        password     : String,
        amministratore: String,
    }

});

// methods ======================
// generating a hash
amministratori.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
amministratori.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', amministratori);
