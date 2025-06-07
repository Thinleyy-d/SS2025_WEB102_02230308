# Practical 1 : API Design and Implementation

A RESTful API for a social media platform built with Node.js and Express.js. Think Instagram, but for developers!

## Overview

This project demonstrates proper REST API design with full CRUD operations, content negotiation, and comprehensive error handling. Perfect for learning API development or as a foundation for your social media app.

## Features

- **Complete CRUD operations** for users, posts, comments, likes, and followers
- **Multiple response formats** - JSON, XML, and HTML
- **Proper HTTP status codes** and error handling
- **Interactive API documentation**
- **Mock data** ready for testing

## Quick Start

1. **Setup project**
   ```bash
   mkdir social-media-api && cd social-media-api
   npm init -y
   npm install express morgan cors helmet
   npm install nodemon --save-dev
   ```

2. **Start server**
   ```bash
   npm run dev
   ```

3. **Test API**
   ```bash
   curl http://localhost:3000/api/users
   ```

## API Endpoints

### Users

| Method | Endpoint      | Description       |
|--------|---------------|-------------------|
| GET    | `/users`      | List all users    |
| GET    | `/users/{id}` | Get specific user |
| POST   | `/users`      | Create new user   |
| PUT    | `/users/{id}` | Update user       |
| DELETE | `/users/{id}` | Delete user       |

### Posts

| Method | Endpoint      | Description       |
|--------|---------------|-------------------|
| GET    | `/posts`      | List all posts    |
| GET    | `/posts/{id}` | Get specific post |
| POST   | `/posts`      | Create new post   |
| PUT    | `/posts/{id}` | Update post       |
| DELETE | `/posts/{id}` | Delete post       |

### Comments, Likes & Followers
Similar CRUD patterns apply for `/comments`, `/likes`, and `/followers` endpoints.

## Example Usage

### Create a new user
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "bio": "Coffee lover ☕"
  }'
```

### Get user details
```bash
curl http://localhost:3000/api/users/1
```

## Content Negotiation

Get responses in different formats:

```bash
# JSON (default)
curl -H "Accept: application/json" http://localhost:3000/api/users

# XML format
curl -H "Accept: application/xml" http://localhost:3000/api/users

# HTML format  
curl -H "Accept: text/html" http://localhost:3000/api/users
```

## Response Format

All successful responses follow this structure:

```json
{
  "success": true,
  "count": 10,
  "data": [...],
  "message": "Operation successful"
}
```

## Project Structure

```
├── controllers/     # Business logic
├── routes/         # API endpoints
├── middleware/     # Custom middleware
├── utils/          # Helper functions & mock data
├── public/         # API documentation
└── server.js       # Main application
```

## HTTP Status Codes

- **200** - Success (GET, PUT)
- **201** - Created (POST)
- **400** - Bad Request (validation errors)
- **404** - Not Found
- **500** - Server Error

## Key Features

**RESTful Design** - Resource-based URLs and proper HTTP methods  
**Error Handling** - Consistent error responses  
**Mock Data** - 50+ users, 100+ posts ready for testing  
**Documentation** - Interactive HTML docs at `/docs`  
**Security** - CORS, Helmet.js, input validation  

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Morgan** - Request logging
- **Helmet.js** - Security headers
- **CORS** - Cross-origin support

## Testing

Visit `http://localhost:3000/docs` for interactive API documentation, or use tools like:
- Postman
- Insomnia  
- Thunder Client (VS Code)
- cURL commands

## Next Steps

- Add JWT authentication
- Connect to MongoDB/PostgreSQL
- Implement rate limiting
- Add input validation
- Deploy to Heroku/Railway



