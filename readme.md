# Course Selling App - Backend

A backend API for a course selling platform built to practice API design and advanced authentication concepts. This project focuses on user management, course creation, and purchase workflows.

## 🚀 Features

- **User Authentication** - JWT-based auth for users and admins
- **Course Management** - Create, update, and manage courses
- **Purchase System** - Course enrollment and purchase tracking
- **Role-based Access** - Separate endpoints for users and admins

## 🛠️ Tech Stack

- **Node.js** & **Express.js**
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing

## 🚦 Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/course-selling-backend.git
   cd course-selling-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   ```

   Add your environment variables:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/course-selling
   JWT_SECRET=your-jwt-secret
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

## 📚 API Endpoints

### User Routes (`/api/v1/user`)

| Method | Endpoint     | Description                  |
| ------ | ------------ | ---------------------------- |
| POST   | `/signup`    | Register new user            |
| POST   | `/login`     | User login                   |
| GET    | `/purchases` | Get user's purchased courses |

### Admin Routes (`/api/v1/admin`)

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| POST   | `/signup`      | Register new admin     |
| POST   | `/login`       | Admin login            |
| POST   | `/course`      | Create new course      |
| PATCH  | `/course`      | Update existing course |
| GET    | `/all-courses` | Get all courses        |

### Course Routes (`/api/v1/course`)

| Method | Endpoint       | Description               |
| ------ | -------------- | ------------------------- |
| POST   | `/purchase`    | Purchase a course         |
| GET    | `/all-courses` | Get all available courses |

## 🎯 What I Learned

- **API Design** - RESTful architecture and proper routing
- **Authentication** - JWT implementation and middleware
- **Database Design** - MongoDB schemas and relationships
- **Security** - Password hashing and protected routes

## 🚧 Next Steps

- [ ] Frontend implementation (React/Vue.js)
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] File upload for course content

_Backend-focused learning project to practice authentication and API design patterns._
