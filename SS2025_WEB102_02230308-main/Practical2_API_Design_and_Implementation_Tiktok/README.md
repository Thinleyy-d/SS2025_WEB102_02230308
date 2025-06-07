# Practical 2 : API Design and Implementation (Tiktok)

A RESTful backend API for a TikTok-like video sharing platform built with Node.js and Express.js.

## Overview

This API handles video uploads, user management, comments, likes, and follows - everything you need to build the next viral video app! Built with RESTful principles and ready for real-world use.

## Features

- **Video Management**  - Upload, update, delete videos
- **User Profiles**  - User accounts and social features  
- **Comments & Likes**  - Full interaction system
- **Follow System**  - User relationships and feeds
- **RESTful Design** - Clean, predictable API structure

## Quick Start

1. **Setup project**
   ```bash
   mkdir tiktok-api && cd tiktok-api
   npm init -y
   npm install express cors morgan body-parser dotenv
   npm install --save-dev nodemon
   ```

2. **Start server**
   ```bash
   npm run dev
   ```

3. **Test it out**
   ```bash
   curl http://localhost:3000/api/videos
   ```

## API Endpoints

### Videos 
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/videos` | Get all videos |
| GET | `/api/videos/:id` | Get specific video |
| POST | `/api/videos` | Upload new video |
| PUT | `/api/videos/:id` | Update video |
| DELETE | `/api/videos/:id` | Delete video |
| GET | `/api/videos/:id/comments` | Get video comments |
| POST | `/api/videos/:id/likes` | Like/unlike video |

### Users 
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user profile |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update profile |
| GET | `/api/users/:id/videos` | Get user's videos |
| POST | `/api/users/:id/followers` | Follow/unfollow user |

### Comments 
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/comments` | Get all comments |
| POST | `/api/comments` | Create comment |
| PUT | `/api/comments/:id` | Update comment |
| DELETE | `/api/comments/:id` | Delete comment |
| POST | `/api/comments/:id/likes` | Like/unlike comment |

## Example Usage

### Get trending videos
```bash
curl http://localhost:3000/api/videos
```

### Create a new user
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "tiktoker123",
    "email": "user@example.com",
    "displayName": "TikTok Star"
  }'
```

### Upload a video
```bash
curl -X POST http://localhost:3000/api/videos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Dance Video",
    "description": "Check out my moves! #dance",
    "userId": 1,
    "videoUrl": "https://example.com/video.mp4"
  }'
```

### Follow a user
```bash
curl -X POST http://localhost:3000/api/users/1/followers \
  -H "Content-Type: application/json" \
  -d '{"followerId": 2}'
```

## Project Structure

```
├── src/
│   ├── controllers/    # Business logic
│   │   ├── videoController.js
│   │   ├── userController.js
│   │   └── commentController.js
│   ├── routes/        # API endpoints
│   ├── models/        # Data models (in-memory)
│   ├── app.js         # Express setup
│   └── server.js      # Server entry point
├── .env              # Environment variables
└── package.json
```

## Key Features

**RESTful Architecture** - Clean, predictable URL patterns  
**CRUD Operations** - Full create, read, update, delete support  
**Social Features** - Likes, comments, follows, user feeds  
**JSON Responses** - Consistent API response format  
**Error Handling** - Proper HTTP status codes  
**CORS Enabled** - Ready for frontend integration  

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin support
- **Morgan** - Request logging
- **Body-parser** - Request parsing

## Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

## Testing

Use these tools to test the API:
- **cURL** - Command line testing
- **Postman** - GUI testing tool
- **Thunder Client** - VS Code extension
- **Insomnia** - API client

Base URL: `http://localhost:3000`

## Environment Setup

Create a `.env` file:
```env
PORT=3000
NODE_ENV=development
```

## Next Steps

- JWT Authentication
- File upload for videos
- Database integration (MongoDB/PostgreSQL)
- Real-time features with WebSockets
- Rate limiting and security