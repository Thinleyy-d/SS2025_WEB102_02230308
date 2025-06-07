# Practical 6: Authentication - Token-based ( Email & Password ) 

A practical guide to building secure email/password authentication with JWT tokens using TypeScript, Hono, and PostgreSQL.

## Overview 

Build a complete authentication system featuring:
- **User Registration & Login**: Email-based authentication
- **Secure Passwords**: Bcrypt hashing for password protection
- **JWT Tokens**: Stateless authorization for API access
- **Protected Routes**: Middleware-based endpoint security

## Quick Setup 

### Prerequisites
- Node.js/Bun runtime
- PostgreSQL database
- Basic TypeScript knowledge

### Installation
```bash
git clone <your-repo>
cd auth-project
bun install
bunx prisma db push
bun run dev
```

Server runs on `http://localhost:3000`

## Database Schema 🗄️

**User Model:**
```prisma
model User {
  id           String    @id @default(uuid())
  email        String    @unique
  hashPassword String
  Account      Account[]
}
```

**Account Model:**
```prisma
model Account {
  id      String @id @default(uuid())
  userId  String
  user    User   @relation(fields: [userId], references: [id])
  balance Int    @default(0)
}
```

Simple one-to-many relationship: Users can have multiple accounts.

## API Endpoints 

| Method | Endpoint                     | Description       | Auth Required |
|--------|------------------------------|-------------------|---------------|
| POST   | `/register`                  | Create new user   | NO            |
| POST   | `/login`                     | Login and get JWT | NO            |
| GET    | `/protected/account/balance` | Get account info  | YES           |

## How It Works 

### Registration Process
1. User provides email and password
2. Password gets hashed with bcrypt
3. User and default account created in database
4. Success confirmation returned

### Login Process
1. User provides credentials
2. Email verified in database
3. Password checked against stored hash
4. JWT token generated and returned (expires in 1 hour)

### Accessing Protected Routes
1. Include JWT in `Authorization: Bearer <token>` header
2. Middleware validates token
3. Access granted to authenticated endpoints

## Core Implementation 

### User Registration
```typescript
app.post("/register", async (c) => {
  const body = await c.req.json();

  // Hash password securely
  const hashedPassword = await Bun.password.hash(body.password, {
    algorithm: "bcrypt",
    cost: 4,
  });

  // Create user with account
  const user = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
      Account: { create: { balance: 0 } },
    },
  });

  return c.json({ message: `${user.email} created successfully` });
});
```

### User Login
```typescript
app.post("/login", async (c) => {
  const body = await c.req.json();

  // Find user and verify password
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  const isValid = await Bun.password.verify(
    body.password,
    user.hashedPassword
  );

  if (isValid) {
    // Generate JWT token
    const token = await sign({
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
    }, "mySecretKey");

    return c.json({ message: "Login successful", token });
  }

  throw new HTTPException(401, { message: "Invalid credentials" });
});
```

### Route Protection
```typescript
// Protect all /protected/* routes
app.use("/protected/*", jwt({ secret: 'mySecretKey' }));

// Protected endpoint
app.get("/protected/account/balance", async (c) => {
  const payload = c.get('jwtPayload');
  
  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { Account: true },
  });

  return c.json({ data: user });
});
```

## Testing Your API 

### Register a User
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "mypassword"}'
```

### Login
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "mypassword"}'
```

### Access Protected Route
```bash
curl -X GET http://localhost:3000/protected/account/balance \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Security Best Practices 

### Password Security
- **Never store plain text passwords**
- **Use bcrypt hashing** with appropriate cost factor
- **Implement password strength requirements**

### JWT Security
- **Store secret keys in environment variables**
- **Set reasonable token expiration times**
- **Use HTTPS in production**

### Error Handling
- **Generic error messages** to prevent information leakage
- **Proper validation** for all user inputs
- **Rate limiting** to prevent brute force attacks

## Production Checklist 

Before deploying:
- [ ] Move secrets to environment variables
- [ ] Enable HTTPS
- [ ] Add input validation and sanitization
- [ ] Implement rate limiting
- [ ] Add proper logging
- [ ] Consider refresh token implementation
- [ ] Test with security tools

## Common Issues & Solutions 

**Token Not Working?**
- Check Authorization header format: `Bearer <token>`
- Verify token hasn't expired
- Confirm secret key matches

**Registration Failing?**
- Check email uniqueness constraints
- Verify database connection
- Validate input data format

