# Practical 3: File Upload 

A simple, secure file upload system using Node.js/Express backend with React frontend integration.

## What You'll Build

- Secure file upload server
- File validation (type & size)
- Progress tracking
- Error handling
- React frontend integration

## Quick Setup

### Backend Setup

1. **Initialize Project**
```bash
mkdir file-upload-app
cd file-upload-app
npm init -y
npm install express cors multer morgan dotenv
```

2. **Create `server.js`**
```javascript
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Create uploads folder
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|pdf|doc/;
        const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        cb(isValid ? null : new Error('Invalid file type'), isValid);
    }
});

// Upload endpoint
app.post('/api/upload', upload.array('files', 5), (req, res) => {
    try {
        if (!req.files?.length) {
            return res.status(400).json({ success: false, message: 'No files uploaded' });
        }

        const fileInfo = req.files.map(file => ({
            name: file.originalname,
            size: file.size,
            path: file.path
        }));

        res.json({ success: true, message: 'Upload successful!', files: fileInfo });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Error handling
app.use((error, req, res, next) => {
    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File too large (max 10MB)' });
    }
    res.status(400).json({ success: false, message: error.message });
});

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
```

3. **Start Server**
```bash
node server.js
```

### Frontend Integration

**React Component Example:**
```javascript
import { useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleFileSelect = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleUpload = async () => {
        if (!files.length) return alert('Select files first!');

        const formData = new FormData();
        files.forEach(file => formData.append('files', file));

        try {
            setUploading(true);
            const response = await axios.post('http://localhost:8000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (e) => setProgress(Math.round((e.loaded * 100) / e.total))
            });

            alert(response.data.message);
            setFiles([]);
            setProgress(0);
        } catch (error) {
            alert(error.response?.data?.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" multiple onChange={handleFileSelect} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? `Uploading... ${progress}%` : 'Upload Files'}
            </button>
        </div>
    );
}
```

## 🔧 Key Features

### File Validation
- **Types**: JPEG, PNG, PDF, DOC files only
- **Size**: Maximum 10MB per file
- **Count**: Up to 5 files at once

### Security
- File type checking
- Size limits
- Secure file naming
- CORS protection

### User Experience
- Real-time progress tracking
- Clear error messages
- Multiple file support

## Project Structure
```
file-upload-app/
├── server.js          # Backend server
├── package.json       # Dependencies
└── uploads/           # Uploaded files
```

## Testing

1. Start backend: `node server.js`
2. Open frontend on `localhost:3000`
3. Try uploading different file types and sizes
4. Check error handling with invalid files

## Next Steps

- Add user authentication
- Implement file deletion
- Use cloud storage (AWS S3, Cloudinary)
- Add file preview functionality
- Deploy to production

