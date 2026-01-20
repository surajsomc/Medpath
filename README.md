# Med Path - Static Website with CMS

A static website for Med Path, built with Next.js and Decap CMS for easy content management.

## Features

- ✅ Static site generation (SSG) with Next.js
- ✅ Easy content editing via Decap CMS (formerly Netlify CMS)
- ✅ Responsive design with Tailwind CSS
- ✅ All content stored in markdown/JSON files
- ✅ Git-based workflow for content management

## Tech Stack

- **Next.js 14** - React framework with static site generation
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Decap CMS** - Git-based headless CMS
- **React Markdown** - Markdown rendering
- **Gray Matter** - Frontmatter parsing

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3001](http://localhost:3001) in your browser

### Building for Production

```bash
npm run build
```

This will generate a static site in the `out` directory that can be deployed to any static hosting service.

## Content Management

### Accessing the Admin Panel

1. Navigate to `/admin` in your browser
2. For local development, Decap CMS will use the file system backend
3. For production, you'll need to set up Git Gateway (see below)

### Editing Content

All content is stored in the `content/` directory:

- `home.json` - Home page content
- `about.md` - About page (markdown)
- `team.json` - Team members list
- `events.json` - Events list
- `advising.md` - Advising page (markdown)
- `resources.json` - Resources structure
- `contact.json` - Contact information

You can edit these files directly or use the admin panel at `/admin`.

### Setting Up Git Gateway (for Production)

For production deployment with Git Gateway:

1. Deploy your site to Netlify (or use another Git-based hosting)
2. Enable Identity in Netlify
3. Enable Git Gateway
4. Update `public/admin/config.yml` to use `git-gateway` backend

Alternatively, you can use other backends:
- **GitHub** - Direct GitHub API
- **GitLab** - GitLab API
- **Bitbucket** - Bitbucket API
- **File System** - For local development only

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── about/             # About pages
│   ├── admin/             # Admin/CMS interface
│   ├── events/            # Events page
│   ├── advising/         # Advising page
│   ├── resources/         # Resources pages
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── QuickLinks.tsx
├── content/               # Content files (editable via CMS)
├── lib/                   # Utility functions
│   └── content.ts        # Content loading functions
└── public/                # Static assets
    └── admin/            # CMS configuration
        └── config.yml    # Decap CMS config
```

## Deployment

### Netlify (Recommended)

1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `out`
5. Enable Netlify Identity and Git Gateway for CMS

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Build settings are auto-detected
4. Note: For CMS, you'll need to configure Git Gateway separately

### Other Static Hosts

The `out` directory contains the static site that can be deployed to:
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps
- Any static hosting service

## Customization

### Adding a Logo

1. Add your logo image to the `public/images/` directory
2. Update `content/home.json` with the logo path (e.g., `/images/logo.png`)
3. Or edit via the admin panel at `/admin`

### Styling

- Edit `tailwind.config.js` to customize colors and theme
- Modify `app/globals.css` for global styles
- Component styles are in individual component files

### Adding New Pages

1. Create a new page in `app/your-page/page.tsx`
2. Add content file in `content/your-page.json` or `content/your-page.md`
3. Update `public/admin/config.yml` to include the new collection
4. Add navigation link in `components/Navigation.tsx`

### CMS Configuration

Edit `public/admin/config.yml` to:
- Add new content collections
- Customize field types
- Configure media uploads
- Set up workflows

## License

This project is a clone/recreation for educational purposes.

## Support

For issues or questions, please check the documentation or open an issue in the repository.
