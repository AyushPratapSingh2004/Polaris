const express = require("express");
const cors = require("cors");
require("dotenv").config();


const axios = require("axios");
const mongoose = require("mongoose");
const LearningPath = require("./models/LearningPath");
const User = require("./models/User");
const UserProgress = require("./models/UserProgress");

const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


const app = express();

app.set("trust proxy", 1);

const PORT = process.env.PORT || 5000;

async function connectDB() {

    try {

        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "polaris"
        });

        console.log("Connected to MongoDB");

    } catch (error) {

        console.error("MongoDB connection error:");
        console.error(error);

        process.exit(1);

    }

}

connectDB();
// -----------------------------
// Middleware
// -----------------------------

app.use(cors({
    origin: "https://polaris-jade-nu.vercel.app",
    credentials: true
}));
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,

        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            ttl: 14 * 24 * 60 * 60
        }),

        cookie: {
              maxAge: 14 * 24 * 60 * 60 * 1000,
              httpOnly: true,
                secure: false,
               sameSite: "none"
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// -----------------------------
// Test route
// -----------------------------

app.get("/", (req, res) => {

    res.json({
        message: "Polaris backend is running"
    });

});


// -----------------------------
// Send user message to Python
// -----------------------------
app.post("/api/generate-path", async (req, res) => {

    try {

             if (!req.isAuthenticated()) {
    return res.status(401).json({
        message: "You must be logged in"
    });
}


        // 1. Get message from React
        const { message } = req.body;


   
        // 2. Check if message exists
        if (!message) {

            return res.status(400).json({
                message: "Learning goal is required"
            });

        }

        // 3. Send message to Python
        const response = await axios.post(
            "https://polaris-hpzr.onrender.com/generate-path",
            {
                message: message
            }
        );

        // 4. Get Python's result
        const result = response.data;

        // 5. Create a MongoDB document
        const learningPath = new LearningPath({
            
            user: req.user._id,

            message: message,

            profile: result.profile,

            recommendation: result.recommendation

        });

        // 6. Save the document
        const savedPath = await learningPath.save();

        // 7. Send result back to React
        res.json({

            profile: result.profile,

            recommendation: result.recommendation,

            savedPathId: savedPath._id

        });

    } catch (error) {

        console.error("Error generating learning path:");

        console.error(error);

        res.status(500).json({

            message: "Unable to generate learning path"

        });

    }

});



app.post("/api/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email and password are required"
            });
        }

        // Check whether email is already being used
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email is already registered"
            });
        }

        // passport-local-mongoose creates the salt and hash
        const user = new User({
            username,
            email
        });

        await User.register(user, password);

        await UserProgress.create({
    user: user._id
});

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Signup error:", error);

        res.status(500).json({
            message: "Unable to create user"
        });
    }
});


app.post("/api/login", (req, res, next) => {

    passport.authenticate("local", (err, user, info) => {

        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({
                message: info?.message || "Invalid username or password"
            });
        }

        req.logIn(user, (err) => {

            if (err) {
                return next(err);
            }

            res.json({
                message: "Login successful",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            });

        });

    })(req, res, next);
});


app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }

            res.clearCookie("connect.sid");

            res.json({
                message: "Logout successful"
            });
        });
    });
});


app.get("/api/me", (req, res) => {

    if (!req.isAuthenticated()) {
        return res.status(401).json({
            message: "Not logged in"
        });
    }

    res.json({
        message: "User is logged in",
        user: {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email
        }
    });

});

app.post("/api/progress", async (req, res) => {

    try {

        // Make sure user is logged in
        if (!req.isAuthenticated()) {
            return res.status(401).json({
                message: "You must be logged in"
            });
        }

        // Check if progress already exists
        let progress = await UserProgress.findOne({
            user: req.user._id
        });

        // If it doesn't exist, create it
        if (!progress) {

            progress = new UserProgress({
                user: req.user._id,
                currentSkills: [],
                learningSkills: [],
                completedSkills: []
            });

            await progress.save();
        }

        res.json({
            message: "Progress loaded successfully",
            progress: progress
        });

    } catch (error) {

        console.error("Progress error:");
        console.error(error);

        res.status(500).json({
            message: "Unable to load progress"
        });
    }
});


app.post("/api/progress/complete", async (req, res) => {

    try {

        // Make sure user is logged in
        if (!req.isAuthenticated()) {
            return res.status(401).json({
                message: "You must be logged in"
            });
        }

        const { skill } = req.body;

        // Make sure skill was provided
        if (!skill) {
            return res.status(400).json({
                message: "Skill is required"
            });
        }

        // Find user's progress
        let progress = await UserProgress.findOne({
            user: req.user._id
        });

        // If progress doesn't exist, create it
        if (!progress) {
            progress = new UserProgress({
                user: req.user._id,
                currentSkills: [],
                learningSkills: [],
                completedSkills: []
            });
        }

        // Check if already completed
        if (progress.completedSkills.includes(skill)) {
            return res.json({
                message: "Skill already completed",
                progress: progress
            });
        }

        // Remove from learning skills
        progress.learningSkills =
            progress.learningSkills.filter(
                existingSkill => existingSkill !== skill
            );

        // Add to completed skills
        progress.completedSkills.push(skill);

        // Save
        await progress.save();

        res.json({
            message: "Skill marked as completed",
            progress: progress
        });

    } catch (error) {

        console.error("Complete skill error:");
        console.error(error);

        res.status(500).json({
            message: "Unable to update progress"
        });
    }
});


app.post("/api/progress/learning", async (req, res) => {

    try {

        if (!req.isAuthenticated()) {
            return res.status(401).json({
                message: "You must be logged in"
            });
        }

        const { skill } = req.body;

        if (!skill) {
            return res.status(400).json({
                message: "Skill is required"
            });
        }

        let progress = await UserProgress.findOne({
            user: req.user._id
        });

        if (!progress) {
            progress = new UserProgress({
                user: req.user._id,
                currentSkills: [],
                learningSkills: [],
                completedSkills: []
            });
        }

        // Don't add a completed skill to learning
        if (progress.completedSkills.includes(skill)) {
            return res.status(400).json({
                message: "This skill is already completed"
            });
        }

        // Don't add duplicate learning skills
        if (!progress.learningSkills.includes(skill)) {
            progress.learningSkills.push(skill);
        }

        await progress.save();

        res.json({
            message: "Skill added to learning",
            progress: progress
        });

    } catch (error) {

        console.error("Learning skill error:");
        console.error(error);

        res.status(500).json({
            message: "Unable to update learning progress"
        });
    }
});

app.post("/api/recommendations", async (req, res) => {

    try {

        // User must be logged in
        if (!req.isAuthenticated()) {
            return res.status(401).json({
                message: "You must be logged in"
            });
        }

        // Find user's progress
        const progress = await UserProgress.findOne({
            user: req.user._id
        });

        if (!progress) {
            return res.status(404).json({
                message: "User progress not found"
            });
        }

        // Get user's goal
        const learningPath = await LearningPath.findOne({
            user: req.user._id
        }).sort({
            createdAt: -1
        });

        if (!learningPath) {
            return res.status(404).json({
                message: "No learning path found"
            });
        }

        // Send information to Python
        const response = await axios.post(
            "https://polaris-hpzr.onrender.com/recommend",
            {
                goal: learningPath.profile.goal,

                currentSkills: progress.currentSkills,

                learningSkills: progress.learningSkills,

                completedSkills: progress.completedSkills
            }
        );

        res.json(response.data);

    } catch (error) {

        console.error("Recommendation error:");
        console.error(error);

        res.status(500).json({
            message: "Unable to generate recommendation"
        });
    }
});

// -----------------------------
// Start server
// -----------------------------

app.listen(PORT, () => {

    console.log(`Polaris backend running on port ${PORT}`);

});