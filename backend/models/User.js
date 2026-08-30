const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

// Add Passport functionality
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;