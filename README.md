# LAURA MERCEDES - Luxury Hair & Beauty Atelier

## Static File Configuration

### Image Serving

The project uses Express.js to serve static files. Images are configured to be served from two routes:

1. **`/images/IMAGE_NAME`** - Primary route for serving product images
2. **`/uploads/IMAGE_NAME`** - Alternate route (aliased to `/images`)

Both routes serve files from the `public/images/` directory.

### Configuration

In `server.js`:

```javascript
app.use('/images', express.static(path.join(__dirname, 'public', 'images'), {
  maxAge: '1d',
  etag: false
}));

app.use('/uploads', express.static(path.join(__dirname, 'public', 'images'), {
  maxAge: '1d',
  etag: false
}));
```

### How to Use

1. **Place images** in the `public/images/` directory
2. **Reference them** in your HTML/JavaScript using `/images/filename.jpg` or `/uploads/filename.jpg`
3. **Start the server**: `npm start` (runs on port 3000 by default)
4. **Access images**: Visit `http://localhost:3000/images/filename.jpg`

### Environment Variables

- `PORT` - Server port (default: 3000)

### Build & Run

```bash
npm install      # Install dependencies
npm run build    # Build for production
npm start        # Start the production server
```

### Database

The product images are stored in the Supabase database in the `products` table:
- `main_image` - Filename stored in database (e.g., `Vietnamese-bounce-3.jpeg`)
- `gallery_images` - Array of filenames stored as JSONB

Image paths in the database are filenames only (no `/public/` prefix). The frontend constructs full URLs by prepending `/images/` to the filename.

### Frontend Image URL Construction

In shop.html (and other frontend files), images are loaded using:

```javascript
function getImageUrl(imagePath) {
  if (!imagePath) return 'https://images.pexels.com/photos/3993324/pexels-photo-3993324.jpeg';
  if (imagePath.startsWith('http')) return imagePath;
  return `/images/${imagePath}`;
}
```

This ensures all image filenames from the database are properly served via the Express static middleware.
