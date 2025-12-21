# Product Images Guide

This guide explains how to properly add and manage product images in the database to ensure they display correctly on the website.

## Image Storage Location

All product images must be stored in the `/public/images/` directory:
```
/public/images/
├── homepage-picture-1.jpeg
├── Bone straight-14inch.jpeg
├── Donor-3C.jpeg
└── ... (other images)
```

## Image Path Format

### Main Image
The `main_image` field should contain a **plain string** (NOT an array) with the path starting with `/images/`:

✅ **CORRECT:**
```
/images/Bone straight-14inch.jpeg
```

❌ **INCORRECT:**
```
["/Bone straight-14inch.jpeg"]          ← Array format (wrong!)
/Bone straight-14inch.jpeg              ← Missing /images/ prefix
/public/Bone straight-14inch.jpeg       ← Wrong path
["https://example.com/image.jpg"]       ← Array format (wrong!)
```

### Gallery Images
The `gallery_images` field should contain a **JSON array** of image paths:

✅ **CORRECT:**
```json
["/images/Bone straight-14inches.jpeg", "/images/Bone straight-14inch-2.jpeg"]
```

❌ **INCORRECT:**
```json
["/Bone straight-14inches.jpeg"]                    ← Missing /images/ prefix
"/images/Bone straight-14inches.jpeg"               ← Not an array (should be array for gallery_images)
["/public/Bone straight-14inches.jpeg"]             ← Wrong path
```

## Step-by-Step: Adding a Product with Images

### Step 1: Upload Images
1. Place your product images in `/public/images/` folder
2. Use descriptive filenames (e.g., `product-name-main.jpeg`, `product-name-gallery-1.jpeg`)

### Step 2: Add Product to Database

When adding a product via Supabase dashboard or SQL:

```sql
INSERT INTO products (
  category_id,
  name,
  slug,
  description,
  price,
  main_image,
  gallery_images,
  in_stock
) VALUES (
  'your-category-id',
  'Premium Bone Straight Wig',
  'premium-bone-straight-wig',
  'Beautiful 14-inch bone straight wig made from premium human hair',
  285000,
  '/images/Bone straight-14inch.jpeg',                                    -- ← Plain string
  '["/images/Bone straight-14inches.jpeg", "/images/Bone straight-2.jpeg"]'::jsonb,  -- ← JSON array
  true
);
```

## Common Mistakes to Avoid

### ❌ Mistake 1: Using Array Format for Main Image
```sql
-- WRONG!
main_image = '["/images/product.jpeg"]'
```
**Fix:** Remove the square brackets
```sql
-- CORRECT
main_image = '/images/product.jpeg'
```

### ❌ Mistake 2: Missing /images/ Prefix
```sql
-- WRONG!
main_image = '/product.jpeg'
gallery_images = '["/product-2.jpeg"]'::jsonb
```
**Fix:** Add `/images/` prefix
```sql
-- CORRECT
main_image = '/images/product.jpeg'
gallery_images = '["/images/product-2.jpeg"]'::jsonb
```

### ❌ Mistake 3: Using /public/ in Path
```sql
-- WRONG!
main_image = '/public/images/product.jpeg'
```
**Fix:** Remove `/public/` from path
```sql
-- CORRECT
main_image = '/images/product.jpeg'
```

### ❌ Mistake 4: Empty or Null Images
```sql
-- WRONG!
main_image = ''
main_image = null
```
**Fix:** Always provide a valid image path or use a placeholder
```sql
-- CORRECT (with fallback)
main_image = '/images/product.jpeg'
-- OR if no image available yet
main_image = 'https://images.pexels.com/photos/3993324/pexels-photo-3993324.jpeg'
```

## Updating Existing Products

If you need to fix image paths for existing products:

```sql
-- Fix a single product
UPDATE products
SET
  main_image = '/images/correct-image-name.jpeg',
  gallery_images = '["/images/gallery-1.jpeg", "/images/gallery-2.jpeg"]'::jsonb
WHERE slug = 'your-product-slug';
```

## Image Validation Checklist

Before adding a product, verify:

- [ ] Images are uploaded to `/public/images/` folder
- [ ] `main_image` is a plain string (no brackets)
- [ ] `main_image` starts with `/images/`
- [ ] `gallery_images` is a JSON array
- [ ] All paths in `gallery_images` start with `/images/`
- [ ] Image files actually exist in the folder
- [ ] Image filenames match exactly (including spaces and capitalization)

## Image Display Logic

The website will:
1. **Product Card** (Shop Page):
   - Try to display `main_image` first
   - If `main_image` is empty, use first image from `gallery_images`
   - If both are empty, show placeholder image

2. **Product Detail Page**:
   - Combine `main_image` and `gallery_images` into a single gallery
   - Filter out any empty or null images
   - Display the first valid image as the main view
   - Show all valid images as thumbnails below

## Examples

### Example 1: Product with Main Image Only
```sql
INSERT INTO products (name, slug, price, main_image, gallery_images, in_stock)
VALUES (
  'Luxury Wig',
  'luxury-wig',
  250000,
  '/images/luxury-wig-main.jpeg',
  '[]'::jsonb,
  true
);
```

### Example 2: Product with Main Image and Gallery
```sql
INSERT INTO products (name, slug, price, main_image, gallery_images, in_stock)
VALUES (
  'Premium Hair Bundle',
  'premium-hair-bundle',
  185000,
  '/images/premium-bundle-main.jpeg',
  '["/images/premium-bundle-2.jpeg", "/images/premium-bundle-3.jpeg", "/images/premium-bundle-4.jpeg"]'::jsonb,
  true
);
```

### Example 3: Product with Gallery Only (No Main Image)
```sql
INSERT INTO products (name, slug, price, main_image, gallery_images, in_stock)
VALUES (
  'Short Bob Wig',
  'short-bob-wig',
  145000,
  '',
  '["/images/Short-bob-6F.jpeg", "/images/Short-bob-6Ff.jpeg"]'::jsonb,
  true
);
```
Note: The website will automatically use the first gallery image as the main display image.

## Troubleshooting

### Images Not Showing on Website?

1. **Check the browser console** for 404 errors
   - Open DevTools (F12) → Console tab
   - Look for image loading errors

2. **Verify the database values**
   ```sql
   SELECT name, main_image, gallery_images FROM products WHERE slug = 'your-product-slug';
   ```

3. **Check the file exists**
   - Verify file is in `/public/images/`
   - Check filename matches exactly (case-sensitive!)

4. **Validate the path format**
   - `main_image` should be: `/images/filename.jpeg` (plain string)
   - `gallery_images` should be: `["/images/file1.jpeg", "/images/file2.jpeg"]` (JSON array)

5. **Rebuild the project**
   ```bash
   npm run build
   ```

## Need Help?

If images still aren't displaying:
1. Check that the image file exists in `/public/images/`
2. Verify the exact filename (including spaces and capital letters)
3. Ensure the database field format is correct (string vs array)
4. Clear browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
5. Check the browser console for any JavaScript errors
