## NOTE: The actual practical work implementation is done in Practical2_API_Design_and_Implementation_Tiktok folder. This folder is just for README.md and Reflection.md.

# Practical 4: Connecting TikTok to PostgreSQL with Prisma ORM

Build a TikTok clone backend with a real database and user authentication.

## Overview

- Connect PostgreSQL database to your app
- Use Prisma ORM for easy database operations
- Add user authentication with JWT
- Create protected API routes
- Hash passwords securely

## Quick Setup

### 1. Install Everything
```bash
# Database tools
npm install @prisma/client prisma bcrypt jsonwebtoken

# Initialize Prisma
npx prisma init
```

### 2. Database Setup
```bash
# Create PostgreSQL database
sudo -u postgres psql
```
```sql
CREATE DATABASE tiktok_db;
CREATE USER tiktok_user WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE tiktok_db TO tiktok_user;
```

### 3. Environment Setup
Create `.env` file:
```env
DATABASE_URL="postgresql://tiktok_user:mypassword@localhost:5432/tiktok_db"
JWT_SECRET="your-secret-key"
```

### 4. Create Database Tables
Edit `prisma/schema.prisma` to define your data structure:
- Users (username, email, password)
- Videos (title, url, user relationship)
- Comments (content, user, video relationships)
- Likes (user + video relationships)
- Follows (user relationships)

Run migration:
```bash
npx prisma migrate dev --name init
```

### 5. Build Your API

**Key Files You'll Create:**
- `lib/prisma.js` - Database connection
- `middleware/auth.js` - JWT authentication
- `routes/auth.js` - Login/register endpoints
- `routes/videos.js` - Video CRUD operations
- `server.js` - Main app file

**Main Concepts:**
- **Authentication**: Users register → get JWT token → use token for protected routes
- **Database Relations**: Users have videos, videos have comments/likes
- **Security**: Hash passwords, validate JWT tokens, protect sensitive routes

## Test Your API

1. **Register**: POST `/api/auth/register` with username, email, password
2. **Login**: POST `/api/auth/login` with email, password → get JWT token
3. **Create Video**: POST `/api/videos` with JWT token in header
4. **Get Videos**: GET `/api/videos` (public route)

## Project Structure
```
tiktok-clone/
├── prisma/schema.prisma    # Database schema
├── lib/prisma.js          # Database connection
├── middleware/auth.js     # JWT middleware
├── routes/               # API endpoints
├── .env                  # Environment variables
└── server.js            # Main app
```

## Key Concepts

**Prisma ORM**: Write JavaScript instead of SQL
```javascript
// Instead of: SELECT * FROM users WHERE email = ?
const user = await prisma.user.findUnique({ where: { email } });
```

**JWT Authentication**: Secure user sessions
```javascript
// Create token when user logs in
const token = jwt.sign({ userId }, JWT_SECRET);

// Verify token on protected routes
const decoded = jwt.verify(token, JWT_SECRET);
```

**Password Security**: Never store plain passwords
```javascript
// Hash before saving
const hashedPassword = await bcrypt.hash(password, 10);

// Compare when logging in
const isValid = await bcrypt.compare(password, hashedPassword);
```

## Next Steps

- Add file upload for videos
- Build React frontend
- Add real-time features
- Deploy to production

