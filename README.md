# 🤖 AI-First CRM Agent

An intelligent AI-powered Customer Relationship Management (CRM) platform that helps organizations manage customer interactions, automate responses, and generate actionable insights using Generative AI.

## 📌 Overview

AI-First CRM Agent is a full-stack application that combines modern web technologies with Large Language Models (LLMs) to enhance customer relationship management.

The system enables users to maintain customer profiles, record interactions, and leverage AI assistance for generating intelligent responses and improving engagement workflows.

## 🚀 Key Features

### 👤 Customer Management

* Create and manage customer profiles
* Store customer details and interaction history
* Track customer engagement activities

### 💬 AI Interaction Assistant

* Generate AI-powered responses using LLMs
* Assist users in customer communication
* Provide intelligent suggestions for interactions

### 📊 CRM Insights

* Analyze customer interactions
* Improve follow-up strategies
* Support data-driven decisions

### 🔒 Secure Configuration

* Environment-based API key management
* Protected sensitive credentials

---

# 🏗️ System Architecture

```
                User
                 |
                 |
          React Frontend
                 |
                 |
          FastAPI Backend
                 |
        -----------------
        |               |
   CRM Services    AI Services
                        |
                  Groq LLM API
```

---

# 🛠️ Tech Stack

## Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Vite

## Backend

* Python
* FastAPI
* REST APIs

## Artificial Intelligence

* Generative AI
* Large Language Models (LLMs)
* Groq API

## Development Tools

* Git
* GitHub
* VS Code

---

# 📂 Project Structure

```
AI-First-CRM-Agent/
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── package.json
│
├── backend/
│   ├── app.py
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/spurthy2212/CRM-AI-AGENT.git
cd CRM-AI-AGENT
```

---

## 2. Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```


Run backend server:

```bash
uvicorn app:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

## 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
```

Install packages:

```bash
npm install
```

Run application:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔐 Environment Variables

The project uses environment variables for security.

```

Sensitive keys are excluded from the repository.
---

# 🔮 Future Enhancements

* User authentication and role management
* Database integration with PostgreSQL/MySQL
* AI-based customer sentiment analysis
* Automated email and follow-up scheduling
* Cloud deployment

---

# 👩‍💻 Developer

**Ravuri Lakshmi Spurthy**

GitHub:
https://github.com/spurthy2212

LinkedIn:
https://linkedin.com/in/lakshmi-spurthy-ravuri-1a67ba30b

---

# ⭐ Project Highlights

✔ Full-stack AI application
✔ REST API development using FastAPI
✔ React-based responsive interface
✔ Generative AI integration
✔ Secure API credential handling
