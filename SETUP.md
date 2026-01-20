# Quick Setup Guide

## First Time Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Site**
   - Main site: http://localhost:3001
   - Admin panel: http://localhost:3001/admin

## Using the CMS (Admin Panel)

### Local Development
The CMS is configured to use the file system backend by default, which means:
- No authentication required for local development
- Changes are saved directly to files in the `content/` directory
- Perfect for testing and development

### Accessing the Admin Panel
1. Navigate to http://localhost:3001/admin
2. You'll see the Decap CMS interface
3. Click on any collection (Home, About, Events, etc.) to edit content
4. Changes are saved immediately to the content files

### Editing Content
- **Home Page**: Edit hero title, subtitle, logo, and description
- **About Page**: Edit markdown content
- **Team**: Add/edit team members
- **Events**: Add/edit events
- **Advising**: Edit markdown content and links
- **Resources**: Edit resource sections and subsections
- **Contact**: Edit contact information and social links

## Production Deployment

### Option 1: Netlify (Recommended for CMS)
1. Push code to GitHub/GitLab
2. Connect to Netlify
3. Update `public/admin/config.yml`:
   ```yaml
   backend:
     name: git-gateway
     branch: main
   ```
4. Enable Netlify Identity and Git Gateway
5. Build command: `npm run build`
6. Publish directory: `out`

### Option 2: Static Hosting (No CMS)
1. Build the site: `npm run build`
2. Deploy the `out` directory to any static host
3. Note: Admin panel won't work without Git Gateway setup

## Adding a Logo

Replace `public/logo.png` with your actual logo image. Supported formats: PNG, JPG, SVG.

## Customization

- **Colors**: Edit `tailwind.config.js` to change the color scheme
- **Styling**: Modify component files in `components/` directory
- **Content Structure**: Update `public/admin/config.yml` to add new fields or collections
