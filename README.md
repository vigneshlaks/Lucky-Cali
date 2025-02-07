# LLM-Based Strength Training Website

[Visit the website here](https://lucky-cali.com)

## **Theory and Motivation**

The **LLM-Based Strength Training Website** is designed to have a personal learning aspect where users have access to a skill tree and a personalized LLM to help them develop their skills. The Main Vision is expressed below:

- **Personalization**: Providing a more tailored training experience based on user goals and skill levels.
- **Accessible Knowledge**: Democratizing and aggregating the best resources for calisthenics enthusiasts.


I read the book 'the cold start problem'. It made lead me to think more about how the website I was building could be oriented as a "networked product". I eventually came up with the idea of scaling the product in two verticals. Having a competition side where users would compete against eachother and then a LLM centered learning resource. The users would initially be attracted by the learning resource then as the application scales more users would take advantage of the competition aspect. This idea was directly inspired by what I had been reading.

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

## **Technology Stack**

### **Frontend**
- **React**
- **Framer Motion**
- **Tailwind CSS**

### **Backend**
- **Node.js**
- **SQL**

### **Authentication**
- **JWT (JSON Web Tokens)**: Ensures secure user sessions.
- **bcrypt**: Provides robust password hashing for data protection.

---

## **Deployment**

### **Docker**
The entire service is containerized using Docker. Needed to learn Docker in great detail through intern work and this personal project.


### **VPS with Caddy**
- Configured on a VPS using **Caddy Reverse Proxy** to enable:
  - HTTPS encryption.
  - Efficient routing.

---
