# ---------------------------------------
# Recommendation Engine
# ---------------------------------------

LEARNING_PATHS = {

    # ==============================
    # WEB DEVELOPMENT
    # ==============================

    "Web Development": [
        "HTML",
        "CSS",
        "JavaScript",
        "Git",
        "Responsive Design",
        "React",
        "Node.js",
        "Express.js",
        "REST APIs",
        "MongoDB",
        "Authentication",
        "Deployment"
    ],

    "Frontend Development": [
        "HTML",
        "CSS",
        "JavaScript",
        "Git",
        "Responsive Design",
        "DOM",
        "React",
        "State Management",
        "REST APIs",
        "TypeScript",
        "Testing",
        "Deployment"
    ],

    "Backend Development": [
        "Programming Fundamentals",
        "Git",
        "Node.js",
        "Express.js",
        "REST APIs",
        "Databases",
        "SQL",
        "Authentication",
        "Authorization",
        "Testing",
        "Docker",
        "Deployment"
    ],

    "Full Stack Development": [
        "HTML",
        "CSS",
        "JavaScript",
        "Git",
        "React",
        "Node.js",
        "Express.js",
        "REST APIs",
        "MongoDB",
        "SQL",
        "Authentication",
        "Deployment",
        "Docker"
    ],


    # ==============================
    # SOFTWARE DEVELOPMENT
    # ==============================

    "Software Development": [
        "Programming Fundamentals",
        "Data Structures",
        "Algorithms",
        "Object-Oriented Programming",
        "Git",
        "Databases",
        "SQL",
        "APIs",
        "Testing",
        "System Design",
        "Version Control",
        "Deployment"
    ],


    # ==============================
    # DATA
    # ==============================

    "Data Science": [
        "Python",
        "NumPy",
        "Pandas",
        "Matplotlib",
        "Statistics",
        "SQL",
        "Data Cleaning",
        "Data Visualization",
        "Exploratory Data Analysis",
        "Machine Learning",
        "Model Evaluation",
        "Deployment"
    ],

    "Data Analyst": [
        "Excel",
        "SQL",
        "Statistics",
        "Data Cleaning",
        "Pandas",
        "Data Visualization",
        "Power BI",
        "Tableau",
        "Exploratory Data Analysis",
        "Business Intelligence"
    ],

    "Data Engineering": [
        "Python",
        "SQL",
        "Git",
        "Linux",
        "Databases",
        "Data Modeling",
        "ETL",
        "APIs",
        "Apache Spark",
        "Data Warehousing",
        "Cloud Computing",
        "Docker",
        "Airflow"
    ],


    # ==============================
    # AI / ML
    # ==============================

    "Machine Learning": [
        "Python",
        "NumPy",
        "Pandas",
        "Matplotlib",
        "Statistics",
        "Linear Algebra",
        "Machine Learning Fundamentals",
        "Scikit-learn",
        "Data Preprocessing",
        "Model Evaluation",
        "Feature Engineering",
        "Deep Learning",
        "Model Deployment"
    ],

    "Artificial Intelligence": [
        "Python",
        "Programming Fundamentals",
        "Data Structures",
        "Linear Algebra",
        "Probability",
        "Statistics",
        "Machine Learning",
        "Deep Learning",
        "Neural Networks",
        "Natural Language Processing",
        "Computer Vision",
        "Model Deployment"
    ],

    "Generative AI": [
        "Python",
        "Machine Learning Fundamentals",
        "Deep Learning",
        "Neural Networks",
        "Transformers",
        "Large Language Models",
        "Prompt Engineering",
        "Embeddings",
        "Vector Databases",
        "RAG",
        "AI APIs",
        "LLM Evaluation",
        "AI Application Deployment"
    ],

    "Natural Language Processing": [
        "Python",
        "NumPy",
        "Pandas",
        "Statistics",
        "Machine Learning",
        "Deep Learning",
        "Natural Language Processing",
        "Text Processing",
        "Word Embeddings",
        "Transformers",
        "Large Language Models",
        "Model Deployment"
    ],

    "Computer Vision": [
        "Python",
        "NumPy",
        "OpenCV",
        "Image Processing",
        "Mathematics",
        "Machine Learning",
        "Deep Learning",
        "CNN",
        "Object Detection",
        "Image Segmentation",
        "Computer Vision Models",
        "Model Deployment"
    ],


    # ==============================
    # DEVOPS / CLOUD
    # ==============================

    "DevOps": [
        "Linux",
        "Git",
        "Networking Fundamentals",
        "Shell Scripting",
        "Docker",
        "CI/CD",
        "GitHub Actions",
        "Cloud Fundamentals",
        "AWS",
        "Infrastructure as Code",
        "Terraform",
        "Kubernetes",
        "Monitoring"
    ],

    "Cloud Engineering": [
        "Linux",
        "Networking",
        "Git",
        "Cloud Fundamentals",
        "AWS",
        "EC2",
        "S3",
        "IAM",
        "Databases",
        "Docker",
        "CI/CD",
        "Terraform",
        "Kubernetes",
        "Monitoring"
    ],


    # ==============================
    # CYBERSECURITY
    # ==============================

    "Cybersecurity": [
        "Computer Networks",
        "Linux",
        "Operating Systems",
        "Python",
        "Cryptography",
        "Web Security",
        "Authentication",
        "Network Security",
        "OWASP",
        "Ethical Hacking",
        "Penetration Testing",
        "Security Monitoring",
        "Incident Response"
    ],


    # ==============================
    # MOBILE DEVELOPMENT
    # ==============================

    "Mobile Development": [
        "Programming Fundamentals",
        "Git",
        "UI Fundamentals",
        "Mobile Development Fundamentals",
        "REST APIs",
        "Authentication",
        "Local Storage",
        "State Management",
        "Testing",
        "App Deployment"
    ],

    "Android Development": [
        "Programming Fundamentals",
        "Kotlin",
        "Object-Oriented Programming",
        "Android Studio",
        "Android UI",
        "Activities",
        "Fragments",
        "APIs",
        "Room Database",
        "Authentication",
        "Testing",
        "Google Play Deployment"
    ],


    # ==============================
    # OTHER
    # ==============================

    "Game Development": [
        "Programming Fundamentals",
        "Object-Oriented Programming",
        "Mathematics",
        "Game Development Fundamentals",
        "Unity",
        "C#",
        "Game Physics",
        "Game AI",
        "3D Graphics",
        "Game Optimization",
        "Game Deployment"
    ],

    "UI UX Design": [
        "Design Fundamentals",
        "Color Theory",
        "Typography",
        "User Research",
        "Wireframing",
        "Prototyping",
        "Information Architecture",
        "Interaction Design",
        "Figma",
        "Usability Testing",
        "Design Systems"
    ]
}


# ---------------------------------------
# Goal aliases
# ---------------------------------------

GOAL_ALIASES = {

    "web developer": "Web Development",
    "web development": "Web Development",
    "website developer": "Web Development",

    "frontend developer": "Frontend Development",
    "front end developer": "Frontend Development",
    "frontend development": "Frontend Development",

    "backend developer": "Backend Development",
    "back end developer": "Backend Development",
    "backend development": "Backend Development",

    "full stack developer": "Full Stack Development",
    "fullstack developer": "Full Stack Development",
    "full stack development": "Full Stack Development",

    "software engineer": "Software Development",
    "software developer": "Software Development",

    "data scientist": "Data Science",
    "data science": "Data Science",

    "data analyst": "Data Analyst",
    "data analytics": "Data Analyst",

    "data engineer": "Data Engineering",
    "data engineering": "Data Engineering",

    "machine learning engineer": "Machine Learning",
    "machine learning": "Machine Learning",
    "ml engineer": "Machine Learning",

    "ai engineer": "Artificial Intelligence",
    "artificial intelligence": "Artificial Intelligence",

    "generative ai": "Generative AI",
    "gen ai": "Generative AI",
    "genai": "Generative AI",

    "nlp": "Natural Language Processing",
    "natural language processing": "Natural Language Processing",

    "computer vision": "Computer Vision",

    "devops engineer": "DevOps",
    "devops": "DevOps",

    "cloud engineer": "Cloud Engineering",
    "cloud computing": "Cloud Engineering",

    "cybersecurity": "Cybersecurity",
    "cyber security": "Cybersecurity",
    "security engineer": "Cybersecurity",

    "mobile developer": "Mobile Development",
    "mobile development": "Mobile Development",

    "android developer": "Android Development",
    "android development": "Android Development",

    "game developer": "Game Development",
    "game development": "Game Development",

    "ui ux designer": "UI UX Design",
    "ux designer": "UI UX Design",
    "ui ux": "UI UX Design"
}


# ---------------------------------------
# Normalize goal
# ---------------------------------------

def normalize_goal(goal):

    goal = goal.lower().strip()

    # Direct match
    if goal in GOAL_ALIASES:
        return GOAL_ALIASES[goal]

    # Check whether an alias appears inside
    # the user's goal

    for alias, domain in GOAL_ALIASES.items():

        if alias in goal:
            return domain

    return None


# ---------------------------------------
# Recommendation function
# ---------------------------------------
def recommend_skills(goal, current_skills, completed_skills=None):

    if completed_skills is None:
        completed_skills = []

    # Normalize the user's goal
    normalized_goal = normalize_goal(goal)

    required_skills = LEARNING_PATHS.get(normalized_goal)

    # Goal not supported
    if normalized_goal is None:
        return {
            "status": "unknown_goal",
            "message": "This learning domain is not available yet.",
            "goal": goal,
            "current_skills": current_skills,
            "completed_skills": completed_skills,
            "missing_skills": [],
            "next_skills": []
        }

    # Get required skills for the normalized goal
    required_skills = LEARNING_PATHS[normalized_goal]

    # Convert current skills to lowercase
    current_skills_lower = {
        skill.strip().lower()
        for skill in current_skills
    }

    # Convert completed skills to lowercase
    completed_skills_lower = {
        skill.strip().lower()
        for skill in completed_skills
    }

    # Completed skills are also known skills
    known_skills = current_skills_lower.union(
        completed_skills_lower
    )

    # Find skills the user still needs
    missing_skills = []

    for skill in required_skills:

        if skill.lower() not in known_skills:
            missing_skills.append(skill)

    # Recommend the next 3 skills
    next_skills = missing_skills[:3]

    return {
        "status": "success",
        "goal": normalized_goal,
        "current_skills": current_skills,
        "completed_skills": completed_skills,
        "missing_skills": missing_skills,
        "next_skills": next_skills
    }


    # -----------------------------------
    # Get required skills
    # -----------------------------------

    required_skills = LEARNING_PATHS[normalized_goal]


    # -----------------------------------
    # Normalize current skills
    # -----------------------------------

    current_skills_lower = {
        skill.strip().lower()
        for skill in current_skills
    }


    # -----------------------------------
    # Find missing skills
    # -----------------------------------

    missing_skills = []

    for skill in required_skills:

        if skill.lower() not in current_skills_lower:

            missing_skills.append(skill)


    # -----------------------------------
    # Recommend next skills
    # -----------------------------------

    next_skills = missing_skills[:3]


    # -----------------------------------
    # Return result
    # -----------------------------------

    return {

        "status": "success",

        "goal": normalized_goal,

        "current_skills": current_skills,

        "missing_skills": missing_skills,

        "next_skills": next_skills

    }