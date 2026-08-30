const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema(
    {
        // The user this progress belongs to
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        // Skills the user already knows
        currentSkills: [
            {
                type: String
            }
        ],

        // Skills the user is currently learning
        learningSkills: [
            {
                type: String
            }
        ],

        // Skills the user has completed
        completedSkills: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("UserProgress", userProgressSchema);