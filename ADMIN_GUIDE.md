# Admin Panel Guide

## How to Access the Admin Panel

To edit content on your website, navigate to:
```
http://localhost:3001/admin
```
or directly:
```
http://localhost:3001/admin/index.html
```

## Login: When Is It Required?

- **Local (localhost, 127.0.0.1, 127.x.x.x, [::1], or `?backend=local` in the URL):** No login. The admin uses the local backend config and does not load Netlify Identity.
- **Production or any other host:** Login is required (Netlify Identity).

## How to Use the Admin Panel

1. **Open the Admin Panel**
   - Go to `http://localhost:3001/admin` in your browser
   - The Decap CMS interface will load with no login on local development

2. **Edit Content**
   - You'll see a list of collections on the left sidebar:
     - **Home Page** - Edit the home page content
     - **About Page** - Edit the about page (markdown)
     - **Team Members** - Add, edit, or remove team members (name, role, bio)
     - **Events** - Add, edit, or remove events (title, date, time, location, description)
     - **Advising Page** - Edit advising content
     - **Resources** - Edit resource sections
     - **Contact Page** - Edit contact information

3. **Making Changes**
   - Click on any collection to view/edit its content
   - Make your changes in the editor
   - Click **Publish** / **Save** to save
   - Changes are written to files in the `content/` directory (when using the local backend)

4. **Adding Events and Team Members**
   - **Events:** Open **Events** → **Events List** → use the **Add Events** (or similar) control to add an entry. Fill in Title, Date, Time (optional), Location (optional), and Description. Save.
   - **Team Members:** Open **Team Members** → **Team List** → use the **Add Members** control to add an entry. Fill in Name, Role, and Bio (optional). Save.

## Local Backend Setup (Required to Save Changes)

When running on localhost, the admin uses **config.local.yml** with `local_backend: true`. To actually **save** changes to `content/team.json` and `content/events.json` (and other files), a proxy server must be running.

### Quick Start (Recommended)

1. **Run in two terminals:**

   **Terminal 1** – Start the proxy server:
   ```bash
   npx decap-server
   ```
   (Leave this running – it will show "Proxy server listening on http://localhost:8081")

   **Terminal 2** – Start Next.js:
   ```bash
   npm run dev
   ```

2. **Access the admin panel:**
   - Go to `http://localhost:3001/admin` or `http://localhost:3001/admin/index.html`
   - The CMS will connect to the proxy; you can add/edit Events and Team (and other content) and save.

### Alternative: Use npm run dev:cms

```bash
npm run dev:cms
```
This runs `npx decap-server` and `npm run dev` together (requires `concurrently`).

**Important:** The proxy server (`npx decap-server`) MUST be running for the CMS to save files. Without it, you can view content but cannot publish changes.

## Content Files Location

All content is stored in the `content/` directory:

| File            | Content                            |
|-----------------|------------------------------------|
| `content/home.json`   | Home page                         |
| `content/about.md`    | About page                        |
| `content/team.json`   | Team members (add/edit here via CMS) |
| `content/events.json` | Events (add/edit here via CMS)      |
| `content/advising.md` | Advising page                    |
| `content/resources.json` | Resources                     |
| `content/contact.json`  | Contact page                    |

## Tips

- **Markdown:** The About and Advising pages support markdown.
- **Images:** Upload to `public/images/` and reference as `/images/filename.jpg`.
- **Events date:** The Date field can be date-only or date-time; the site will display it in a readable format.
- **Team:** Name and Role are required; Bio is optional.

## Troubleshooting

- **Admin doesn’t load:** Use `/admin` or `/admin/index.html`, ensure `npm run dev` is running, and hard-refresh (Ctrl+Shift+R / Cmd+Shift+R).
- **Can’t save / "Failed to persist entry":** Run `npx decap-server` in a separate terminal (or `npm run dev:cms`). The CMS needs the local backend to write to `content/`.
- **Login asked on localhost:** Use `http://localhost:3001` or `http://127.0.0.1:3001` (not an IP like 192.168.x.x). Or add `?backend=local` to the URL to force no-login mode.
- **Config:** `public/admin/config.yml` is for production (login). `public/admin/config.local.yml` is used on localhost (no login, local backend).

## Production Setup

For production (deployed site):

1. **Config:** `config.yml` is used (`local_backend: false`, `backend: git-gateway`). No changes needed.
2. **Netlify Identity and Git Gateway:** Enable them in the Netlify (or compatible) project so the admin can authenticate and write to the repo.
3. **Deploy:** Deploy to Netlify or another host that supports Git Gateway. The admin at `/admin` will require Netlify Identity login before editing.
