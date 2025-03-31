# Blog Application Backend

## Overview

This is the backend for a blog application that provides APIs for user authentication, post management, and comments. It is built using Node.js and Express with MongoDB as the database.

## Features

- User authentication (sign-up, login, logout)
- Create, edit, and delete blog posts
- Add and manage comments on blog posts
- Secure API endpoints using JWT authentication
- Role-based access control for admins
- RESTful API design

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose ORM
- **Authentication:** JWT (JSON Web Tokens)
- **Middleware:** Express.js

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Chioma-Okeke/blog-platform.git
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Run the server:

   ```sh
   npm start
   ```

   The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate a user and return a JWT
- `POST /api/auth/logout` - Logout a user

### Blog Posts

- `GET /api/post` - Fetch all blog posts
- `GET /api/post/:id` - Fetch a single blog post
- `POST /api/post` - Create a new blog post (Authenticated)
- `PUT /api/post/:id` - Update a blog post (Authenticated)
- `DELETE /api/post/:id` - Delete a blog post (Authenticated)
- `DELETE /api/admin/posts/:id` - Delete a blog post (Admin only)

### Comments

- `GET /api/comments/:id` - Get comments for a post
- `POST /api/comment/:postId` - Add a comment to a post (Authenticated)
- `DELETE /api/admin/comments/:id` - Delete a comment (Admin only)
- `GET /api/user/comments` - Get user-specific comments (Authenticated)

