## NOTE: The actual practical work implementation is done in Practical2_API_Design_and_Implementation_Tiktok folder. This folder is just for README.md and Reflection.md.

# Practical 5: Implementing Cloud Storage with Supabase 

## Overview

This guide walks you through migrating your web application from local file storage to cloud storage using Supabase. Transform your app's storage capabilities with scalable, reliable cloud infrastructure.

## Why Cloud Storage? 

### Local Storage Problems 
- Limited server disk space
- Files lost during crashes or redeployments  
- Poor performance for global users
- Manual backup management

### Cloud Storage Benefits 
- **Unlimited Scalability**: Grow without storage limits
- **Global Performance**: Fast access worldwide via CDN
- **Built-in Reliability**: Automatic backups and redundancy
- **Better Security**: Advanced access controls and permissions

## What is Supabase? 

Supabase is an open-source Firebase alternative that provides:
- PostgreSQL Database 
- User Authentication 
- File Storage 
- Real-time Features 

Perfect for modern web applications needing reliable backend services.

## Quick Setup 

### 1. Create Supabase Project
1. Sign up at [supabase.com](https://supabase.com)
2. Click "New Project" and choose a name
3. Set a strong database password
4. Select your preferred region
5. Wait for project creation (~2 minutes)

### 2. Configure Storage
1. Go to **Storage** in your dashboard
2. Create a new bucket (e.g., "uploads")
3. Set bucket to **Public** for easy access
4. Configure upload policies for authenticated users

### 3. Get Your Keys
Copy these from Settings → API:
- Project URL
- Public API Key  
- Service Role Key (keep secret!)

## Implementation 

### Backend Setup
```bash
npm install @supabase/supabase-js
```

**Environment Variables:**
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
```

**Basic Configuration:**
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)
```

### Frontend Setup
```bash
npm install @supabase/supabase-js
```

**Environment Variables:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLIC_KEY=your-public-key
```

**Upload Function Example:**
```javascript
const uploadFile = async (file) => {
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(`files/${Date.now()}-${file.name}`, file)
  
  if (error) throw error
  return data.path
}
```

## How It Works 

1. **User Upload**: File selected in browser
2. **Direct Upload**: File goes straight to Supabase Storage
3. **Get URL**: Receive public URL for the uploaded file
4. **Store Reference**: Save file path/URL in your database
5. **Serve Content**: Files delivered globally via CDN

## Testing Your Setup 

1. **Upload Test**: Try uploading a file through your app
2. **Access Test**: Verify files are accessible via public URLs
3. **Performance Test**: Check loading speeds from different locations
4. **Security Test**: Confirm only authorized users can upload

## Migration from Local Storage 

If you have existing local files:
1. Create migration script to upload existing files
2. Update database records with new Supabase URLs
3. Test all file access functionality  
4. Remove old local files after verification

## Best Practices

- **File Naming**: Use timestamps or UUIDs to avoid conflicts
- **Size Limits**: Set reasonable upload size restrictions
- **File Types**: Validate file types before upload
- **Error Handling**: Always handle upload failures gracefully
- **Security**: Never expose service keys in frontend code

## Troubleshooting 

**Upload Fails?**
- Check bucket permissions and policies
- Verify file size isn't too large
- Ensure proper authentication

**Files Not Loading?**
- Confirm bucket is set to public
- Check the file URL format
- Verify CDN propagation (may take a few minutes)

## Next Steps 

With cloud storage implemented, you can now:
- Handle unlimited user uploads
- Serve content globally with great performance
- Focus on features instead of infrastructure management
- Scale your application without storage concerns

