import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    const [message, setMessage] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [progress, setProgress] = useState(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
const [email, setEmail] = useState("");
    const [showSignup, setShowSignup] = useState(false);

    useEffect(() => {
        async function checkLogin() {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/me",
                    {
                        credentials: "include"
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    await loadProgress();
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
            } finally {
                setCheckingAuth(false);
            }
        }

        checkLogin();
    }, []);

    async function login() {
        if (!username || !password) {
            setLoginError("Username and password are required.");
            return;
        }

        setLoginError("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed"
                );
            }

            setUser(data.user);
            await loadProgress();

        } catch (error) {
            console.error(error);
            setLoginError(error.message);
        }
    }

    async function signup() {
    if (!username || !email || !password) {
        setLoginError(
            "Username, email and password are required."
        );
        return;
    }

    setLoginError("");

    try {
        const response = await fetch(
            "http://localhost:5000/api/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Signup failed"
            );
        }

        setShowSignup(false);
        setPassword("");

        setLoginError(
            "Account created successfully. Please sign in."
        );

    } catch (error) {
        console.error(error);
        setLoginError(error.message);
    }
}

    async function loadProgress() {
        try {
            const response = await fetch(
                "http://localhost:5000/api/progress",
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to load progress"
                );
            }

            setProgress(data.progress);

        } catch (error) {
            console.error("Progress error:", error);
        }
    }

    async function startLearning(skill) {
        try {
            const response = await fetch(
                "http://localhost:5000/api/progress/learning",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        skill
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to start learning"
                );
            }

            setProgress(data.progress);

        } catch (error) {
            console.error("Start learning error:", error);
            setError("Unable to start learning.");
        }
    }

    async function completeSkill(skill) {
        try {
            const response = await fetch(
                "http://localhost:5000/api/progress/complete",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        skill
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to complete skill"
                );
            }

            setProgress(data.progress);

            await refreshRecommendations();

        } catch (error) {
            console.error("Complete skill error:", error);
            setError("Unable to update learning progress.");
        }
    }

    async function refreshRecommendations() {
        try {
            const response = await fetch(
                "http://localhost:5000/api/recommendations",
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to get recommendations"
                );
            }

            setResult(prev => ({
                ...prev,
                recommendation: data
            }));

        } catch (error) {
            console.error("Recommendation error:", error);
        }
    }


    async function logout() {
    try {
        const response = await fetch(
            "http://localhost:5000/api/logout",
            {
                method: "POST",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Logout failed");
        }

        setUser(null);
        setProgress(null);
        setResult(null);
        setMessage("");

    } catch (error) {
        console.error("Logout error:", error);
        setError("Unable to logout.");
    }
}



    async function generatePath() {
        if (!message.trim()) {
            setError("Please tell us about your learning goal.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const response = await fetch(
                "http://localhost:5000/api/generate-path",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        message
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Something went wrong"
                );
            }

            setResult(data);

        } catch (error) {
            console.error(error);
            setError(
                "Unable to generate your learning path."
            );
        } finally {
            setLoading(false);
        }
    }

    if (checkingAuth) {
        return (
            <div className="loading-screen">
                <div className="loading-logo">
                    Polaris
                </div>
                <p>Loading your learning space...</p>
            </div>
        );
    }

    if (!user) {
    return (
        <div className="login-page">

            <div className="login-background">
                <div className="glow glow-one"></div>
                <div className="glow glow-two"></div>
            </div>

            <div className="login-container">

                <div className="login-brand">
                    <div className="login-logo">
                        ✦
                    </div>

                    <span>Polaris</span>
                </div>

                <div className="login-card">

                    {showSignup ? (

                        /* =========================
                           SIGN UP
                        ========================= */

                        <>
                            <div className="login-heading">
                                <h1>Create your account</h1>

                                <p>
                                    Start your personalized
                                    learning journey.
                                </p>
                            </div>

                            <div className="form-group">
                                <label>Username</label>

                                <input
                                    type="text"
                                    placeholder="Choose a username"
                                    value={username}
                                    onChange={(event) =>
                                        setUsername(
                                            event.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(
                                            event.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>

                                <input
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(
                                            event.target.value
                                        )
                                    }
                                />
                            </div>

                            {loginError && (
                                <div className="login-error">
                                    {loginError}
                                </div>
                            )}

                            <button
                                className="login-submit"
                                onClick={signup}
                            >
                                Create account
                                <span>→</span>
                            </button>

                            <div className="signup-prompt">
                                <span>
                                    Already have an account?
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowSignup(false)
                                    }
                                >
                                    Sign in
                                </button>
                            </div>
                        </>

                    ) : (

                        /* =========================
                           SIGN IN
                        ========================= */

                        <>
                            <div className="login-heading">
                                <h1>Welcome back</h1>

                                <p>
                                    Continue your personalized
                                    learning journey.
                                </p>
                            </div>

                            <div className="form-group">
                                <label>Username</label>

                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(event) =>
                                        setUsername(
                                            event.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(
                                            event.target.value
                                        )
                                    }
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            login();
                                        }
                                    }}
                                />
                            </div>

                            {loginError && (
                                <div className="login-error">
                                    {loginError}
                                </div>
                            )}

                            <button
                                className="login-submit"
                                onClick={login}
                            >
                                Sign in
                                <span>→</span>
                            </button>

                            <div className="signup-prompt">
                                <span>
                                    Don't have an account?
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowSignup(true)
                                    }
                                >
                                    Create account
                                </button>
                            </div>
                        </>
                    )}

                </div>

                <p className="login-footer">
                    Learn smarter. Build your path.
                </p>

            </div>

        </div>
    );
}

   const completedCount =
    progress?.completedSkills?.length || 0;

const learningCount =
    progress?.learningSkills?.length || 0;

const nextCount =
    result?.recommendation?.next_skills?.length || 0;

const totalSkills =
    completedCount +
    learningCount +
    nextCount;

const progressPercentage =
    totalSkills === 0
        ? 0
        : Math.round(
            (completedCount / totalSkills) * 100
        );

    return (
        <div className="app">

            {/* HEADER */}

            <header className="header">

                <div className="logo">
                    <span>✦</span> Polaris
                </div>

                <div className="user-area">

                    <div className="user-avatar">
                        {user.username
                            ?.charAt(0)
                            .toUpperCase()}
                    </div>

                    <span className="username">
                        {user.username}
                    </span>

                    <button className="logout-button" onClick={logout} >
                         Logout
                   </button>

                </div>

            </header>


            {/* DASHBOARD */}

            <main className="dashboard">

                {/* WELCOME */}

                <section className="welcome">

                    <h1>
                        Welcome back, {user.username} 👋
                    </h1>

                    <p>
                        Here's an overview of your learning journey.
                    </p>

                </section>


                {/* PROGRESS */}

                {progress && (
                    <section className="progress-grid">

                        <div className="progress-card">
                            <h3>Completed</h3>

                            <div className="progress-number">
                                {completedCount}
                            </div>

                            <div className="progress-description">
                                Skills mastered
                            </div>
                        </div>


                        <div className="progress-card">
                            <h3>Currently Learning</h3>

                            <div className="progress-number">
                                {learningCount}
                            </div>

                            <div className="progress-description">
                                Skills in progress
                            </div>
                        </div>


                        <div className="progress-card">
                            <h3>Up Next</h3>

                            <div className="progress-number">
                                {nextCount}
                            </div>

                            <div className="progress-description">
                                Recommended skills
                            </div>
                        </div>

                    </section>
                )}


              <section className="section">

    <div className="section-header">
        <div>
            <h2>Learning Progress</h2>
            <p className="section-subtitle">
                Keep building your skills, one step at a time.
            </p>
        </div>

        <span className="progress-percentage">
            {progressPercentage}%
        </span>
    </div>

    <div className="progress-bar-card">

        <div className="progress-bar">
            <div
                className="progress-bar-fill"
                style={{
                    width: `${progressPercentage}%`
                }}
            />
        </div>

        <div className="progress-bar-info">

            <span>
                {completedCount} completed
            </span>

            <span>
                {learningCount} learning
            </span>

            <span>
                {nextCount} up next
            </span>

        </div>

    </div>

</section>


                {/* CONTINUE LEARNING */}

                {progress &&
                    progress.learningSkills.length > 0 && (

                        <section className="section">

                            <div className="section-header">
                                <h2>
                                    Continue Learning
                                </h2>
                            </div>

                            <div className="learning-card">

                                <div>
                                    <h3>
                                        {progress.learningSkills[0]}
                                    </h3>

                                    <p>
                                        You're currently learning this skill.
                                    </p>
                                </div>

                                <button>
                                    Continue →
                                </button>

                            </div>

                        </section>
                    )}


                {/* FIND PATH */}

                <section className="section">

                    <div className="section-header">
                        <h2>
                            Find Your Learning Path
                        </h2>
                    </div>

                    <div className="goal-card">

                        <h2>
                            What do you want to learn?
                        </h2>

                        <p>
                            Tell Polaris about your goal and
                            your current skills.
                        </p>

                        <textarea
                            className="goal-input"
                            value={message}
                            onChange={(event) =>
                                setMessage(event.target.value)
                            }
                            placeholder="Example: I want to become a full-stack developer. I know HTML and CSS."
                        />

                        <button
                            className="primary-button"
                            onClick={generatePath}
                            disabled={loading}
                        >
                            {loading
                                ? "Generating..."
                                : "Find My Path →"}
                        </button>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                    </div>

                </section>


                {/* CURRENT PROGRESS */}

                {progress && (
                    <section className="section">

                        <div className="section-header">
                            <h2>Your Progress</h2>
                        </div>

                        <div className="profile-card">

                            <h3>Current Skills</h3>

                            {progress.currentSkills.length > 0 ? (

                                <ul className="skill-list">

                                    {progress.currentSkills.map(
                                        (skill, index) => (
                                            <li
                                                className="skill-chip"
                                                key={index}
                                            >
                                                {skill}
                                            </li>
                                        )
                                    )}

                                </ul>

                            ) : (

                                <p className="empty-state">
                                    No current skills recorded.
                                </p>

                            )}


                            <h3 style={{ marginTop: "28px" }}>
                                Currently Learning
                            </h3>

                            {progress.learningSkills.length > 0 ? (

                                <div className="learning-list">

                                    {progress.learningSkills.map(
                                        (skill, index) => (

                                            <div
                                                className="learning-item"
                                                key={index}
                                            >

                                                <span>
                                                    {skill}
                                                </span>

                                                <button
                                                    className="secondary-button"
                                                    onClick={() =>
                                                        completeSkill(skill)
                                                    }
                                                >
                                                    Mark Completed
                                                </button>

                                            </div>

                                        )
                                    )}

                                </div>

                            ) : (

                                <p className="empty-state">
                                    No skills currently being learned.
                                </p>

                            )}


                            <h3 style={{ marginTop: "28px" }}>
                                Completed Skills
                            </h3>

                            {progress.completedSkills.length > 0 ? (

                                <ul className="skill-list">

                                    {progress.completedSkills.map(
                                        (skill, index) => (
                                            <li
                                                className="skill-chip"
                                                key={index}
                                            >
                                                ✓ {skill}
                                            </li>
                                        )
                                    )}

                                </ul>

                            ) : (

                                <p className="empty-state">
                                    No completed skills yet.
                                </p>

                            )}

                        </div>

                    </section>
                )}


                {/* RESULT */}

                {result && (

                    <section className="section">

                        <div className="section-header">
                            <h2>
                                Your Learning Path
                            </h2>
                        </div>


                        <div className="profile-card">

                            <div className="profile-row">

                                <div className="profile-box">

                                    <h4>GOAL</h4>

                                    <p>
                                        {result.profile.goal}
                                    </p>

                                </div>


                                <div className="profile-box">

                                    <h4>LEVEL</h4>

                                    <p>
                                        {result.profile.level}
                                    </p>

                                </div>

                            </div>


                            <h3 style={{ marginTop: "28px" }}>
                                Interests
                            </h3>

                            <ul className="skill-list">

                                {result.profile.interests.map(
                                    (interest, index) => (
                                        <li
                                            className="skill-chip"
                                            key={index}
                                        >
                                            {interest}
                                        </li>
                                    )
                                )}

                            </ul>


                           <h3 style={{ marginTop: "32px" }}>
    Learning Path
</h3>

<div className="learning-path">

    {result.recommendation.next_skills.map(
        (skill, index) => {

            const isCompleted =
                progress.completedSkills.includes(skill);

            const isLearning =
                progress.learningSkills.includes(skill);

            return (
                <div
                    className={`path-item ${
                        isCompleted
                            ? "completed"
                            : isLearning
                            ? "learning"
                            : ""
                    }`}
                    key={index}
                >

                    <div className="path-number">
                        {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="path-line" />

                    <div className="path-content">

                        <div className="path-title-row">

                            <h3>{skill}</h3>

                            <span className="path-status">

                                {isCompleted
                                    ? "✓ Completed"
                                    : isLearning
                                    ? "◉ Currently Learning"
                                    : "○ Start Learning"}

                            </span>

                        </div>

                        <p>
                            {isCompleted
                                ? "You've completed this skill."
                                : isLearning
                                ? "You're currently working on this skill."
                                : "This skill is recommended as your next step."}
                        </p>

                        {!isCompleted && (
                            <button
                                className="secondary-button"
                                onClick={() =>
                                    isLearning
                                        ? completeSkill(skill)
                                        : startLearning(skill)
                                }
                            >
                                {isLearning
                                    ? "Mark Completed"
                                    : "Start Learning"}
                            </button>
                        )}

                    </div>

                </div>
            );
        }
    )}

</div>

                        </div>

                    </section>

                )}

            </main>

        </div>
    );
}

export default App;