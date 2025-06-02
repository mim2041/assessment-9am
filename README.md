# MERN Authentication & Authorization with Subdomain Support

A production-ready MERN stack application featuring secure authentication, authorization, and dynamic subdomain-based shop management.

---

## ✨ Features

### 🔐 Secure Authentication
- JWT-based authentication with access and refresh tokens
- Password validation (8+ characters, includes number and special character)
- "Remember Me" functionality (7-day vs 30-minute sessions)
- Secure password hashing with bcrypt

### 🏪 Shop Management
- Create 3–4 unique shop names per user
- Global shop namespace (no duplicates across users)
- Dynamic subdomain routing (e.g., `beautyhub.localhost:5173`)

### 🌐 Cross-Subdomain Authentication
- Session persistence across all subdomains
- Automatic token refresh
- Loading states during authentication

### 🛡️ Security Features
- Rate limiting on authentication endpoints
- CORS configuration for subdomain support
- Input validation and sanitization
- `helmet.js` for security headers

---

## 🧱 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios  
- **Backend**: Node.js, Express, MongoDB, Mongoose  
- **Authentication**: JWT (Access & Refresh Tokens)  
- **Security**: bcrypt, helmet, express-rate-limit  

---

## ⚙️ Prerequisites

- Node.js (v14+)
- MongoDB (local or cloud instance)
- npm or yarn

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mern-auth-app.git
cd mern-auth-app
