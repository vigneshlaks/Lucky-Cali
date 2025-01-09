# LLM-Based Strength Training Website

[Visit the website here](https://lucky-cali.com)

## **Theory and Motivation**

The **LLM-Based Strength Training Website** is designed to have a personal learning aspect where users have access to a skill tree and a personalized LLM to help them develop their skills. The Main Vision is expressed below:

- **Personalization**: Providing a more tailored training experience based on user goals and skill levels.
- **Accessible Knowledge**: Democratizing and aggregating the best resources for calisthenics enthusiasts.

---

## **Features and Complexities**

### **Training**
- **Custom LLM Agent (Under Development)**
  - **Complexity**: Use Open Source LLM to handle diverse user queries and return meaningful answers.
  - **Approach**: Integrate a Retrieval-Augmented Generation (RAG) system for context-aware and accurate responses.
  - **Impact**: Offers intelligent, real-time feedback for users’ training questions.

- **Customized Skill Tree**
  - **Complexity**: Aggregates calisthenics resources into an intuitive, personalized learning path and present information in a semantically meaningful way.
  - **Impact**: Makes complex skills approachable and progression-focused.

---

### **Competition (Under Development)**
- **Contests**
  - **Complexity**: Weekly competitions with dynamic scoring.
  - **Impact**: Encourage healthy competition among users.

- **Leaderboard**
  - **Complexity**: Tracks global ranks using a SQL-backed scoring system.
  - **Impact**: Promote engagement.

- **Feedback**
  - **Complexity**: Provides a way for higher level users to provide insights for skill improvement based on user-submitted videos or metrics.
  - **Impact**: Delivers actionable advice to incentivize users to use this competition portion.

---

### **User Experience**
- **Custom Animations**
  - **Complexity**: Using Framer Motion.
  - **Approach**: Balances smooth transitions and performance.
  - **Impact**: Enhances user engagement.

- **Responsive Design**
  - **Complexity**: Seamless cross-device compatibility.
  - **Approach**: UI/UX built with Tailwind CSS.
  - **Impact**: Provides a consistent experience.

---

## **Technology Stack**

### **Frontend**
- **React**
- **Framer Motion**
- **Tailwind CSS**

### **Backend**
- **Node.js**
- **SQL**

### **AI and Machine Learning**
- **FAISS**: Implements vector embeddings for similarity search in the RAG system.

### **Authentication**
- **JWT (JSON Web Tokens)**: Ensures secure user sessions.
- **bcrypt**: Provides robust password hashing for data protection.

---

## **Deployment**

### **Docker-Optimized**
The entire service is containerized using Docker. Needed to learn Docker in great detail through intern work and this personal project.


### **VPS with Caddy**
- Configured on a VPS using **Caddy Reverse Proxy** to enable:
  - HTTPS encryption.
  - Efficient routing.

---
