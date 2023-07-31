const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});
UserSchema.plugin(passportLocalMongoose);