# Content Management Guide

## Overview

This site uses Decap CMS (formerly Netlify CMS) for content management. All content is stored in the `content/` directory as JSON or Markdown files.

## Content Files

### `content/home.json`
Home page content including:
- Hero section (title, subtitle)
- Logo URL
- Main description

### `content/about.md`
About page content in Markdown format with frontmatter.

### `content/team.json`
Team members list:
```json
{
  "members": [
    {
      "name": "Member Name",
      "role": "Role Title",
      "bio": "Bio text"
    }
  ]
}
```

### `content/events.json`
Events list:
```json
{
  "events": [
    {
      "title": "Event Title",
      "date": "2024-01-15",
      "time": "6:00 PM",
      "location": "Location",
      "description": "Event description"
    }
  ]
}
```

### `content/advising.md`
Advising page in Markdown with frontmatter for links:
```markdown
---
title: Advising
links:
  - title: "Link Title"
    url: "https://example.com"
---

# Content here
```

### `content/resources.json`
Resources structure with sections and subsections.

### `content/contact.json`
Contact information including email and social media links.

## Editing Content

### Via Admin Panel (Recommended)

1. Navigate to `/admin` in your browser
2. Select a collection from the sidebar
3. Edit the content
4. Click "Save" to save changes

### Via File System

1. Edit files directly in the `content/` directory
2. Files are in JSON or Markdown format
3. For Markdown files, use frontmatter (YAML) for metadata

## Adding New Content Types

1. Create a new content file in `content/`
2. Add a new collection to `public/admin/config.yml`
3. Create a page in `app/` to display the content
4. Add a function in `lib/content.ts` to load the content

## Media Files

- Upload images to `public/images/`
- Reference them in content as `/images/filename.jpg`
- The CMS will handle uploads when configured with Git Gateway

## Markdown Support

Markdown files support:
- Headers (# ## ###)
- Bold and italic text
- Links
- Lists
- Code blocks
- And more standard Markdown features
