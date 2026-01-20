# Hosting on GitHub Pages

Your Medpath site is set up to deploy to **https://surajsomc.github.io/Medpath/**.

## One-time setup in GitHub

1. Open your repo: **https://github.com/surajsomc/Medpath**
2. Go to **Settings** → **Pages** (under "Code and automation").
3. Under **Build and deployment**:
   - **Source:** choose **GitHub Actions**.

That’s it. The workflow runs on every push to `main`.

## Deploying

Push to `main`:

```powershell
git add .
git commit -m "Your message"
git push origin main
```

The **Deploy to GitHub Pages** workflow will build and publish the site. Progress: **Actions** tab in your repo.

## Your live URL

- **Project site:** https://surajsomc.github.io/Medpath/

## Local development

- Run `npm run dev` and open **http://localhost:3001/** (no `/Medpath` needed).
- `basePath` is only used in production builds for GitHub Pages.

## If you rename the repo

If the repo is no longer `Medpath`, update `next.config.js`:

- Change the `basePath` value (e.g. `'/NewRepoName'`) so it matches the new URL path.

## Troubleshooting

| Issue | What to do |
|-------|------------|
| 404 on GitHub Pages | In repo **Settings → Pages**, set **Source** to **GitHub Actions**. |
| Assets (CSS, JS, images) not loading | Confirm `basePath` in `next.config.js` matches the repo name in the URL. |
| Workflow failing | Open the **Actions** tab, click the failed run, and check the error in the **build** or **deploy** step. |
