const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(require('./middleware/formatResponse'));

// Serve static files
app.use(express.static('public'));

// API Documentation route
app.get('/api-docs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'docs.html'));
});

// Routes (to be defined later)
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/posts/:id/comments', require('./routes/comments')); // Mount comments under posts
app.use('/posts/:id/likes', require('./routes/likes'));
// app.use('/users/:id/followers', require('./routes/followers.js'));
require
// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Social Media API' });
});

// Error handler middleware (to be defined later)
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in development mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    process.exit(1);
});
