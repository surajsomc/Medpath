# Email Contact Form Setup Guide

Your contact form is ready! Now you need to configure an email service to actually send emails. Here are the recommended options:

## Option 1: Resend (Recommended - Easiest)

Resend is a modern email API that's easy to set up and has a generous free tier.

### Setup Steps:

1. **Sign up for Resend:**
   - Go to https://resend.com
   - Create a free account
   - Get your API key from the dashboard

2. **Install Resend:**
   ```bash
   npm install resend
   ```

3. **Add API key to environment variables:**
   - Create a `.env.local` file in your project root (if it doesn't exist)
   - Add: `RESEND_API_KEY=your_api_key_here`

4. **Update the API route:**
   - Open `app/api/contact/route.ts`
   - Uncomment the Resend code block (lines with `// Option 1: Use Resend`)
   - Update the `from` email address to your verified domain email
   - Remove or comment out the `console.log` section

5. **Verify your domain** (for production):
   - In Resend dashboard, add and verify your domain
   - Use a verified email as the `from` address

## Option 2: Nodemailer (SMTP)

Use Nodemailer if you have SMTP credentials (Gmail, Outlook, custom SMTP server).

### Setup Steps:

1. **Install Nodemailer:**
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

2. **Add SMTP credentials to `.env.local`:**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=your-email@gmail.com
   ```

3. **For Gmail:**
   - Enable 2-factor authentication
   - Generate an "App Password" (not your regular password)
   - Use the app password in `SMTP_PASS`

4. **Update the API route:**
   - Open `app/api/contact/route.ts`
   - Uncomment the Nodemailer code block (lines with `// Option 2: Use Nodemailer`)
   - Remove or comment out the `console.log` section

## Option 3: Formspree (No Backend Code Needed)

Formspree is a form backend service - you can use it without writing email code.

### Setup Steps:

1. **Sign up at https://formspree.io**
2. Get your form endpoint URL
3. Update `ContactForm.tsx` to send directly to Formspree instead of `/api/contact`

## Option 4: EmailJS (Client-Side Only)

EmailJS sends emails directly from the browser without a backend.

### Setup Steps:

1. **Sign up at https://www.emailjs.com**
2. **Install EmailJS:**
   ```bash
   npm install @emailjs/browser
   ```
3. **Update ContactForm.tsx** to use EmailJS instead of the API route

## Current Status

Right now, the form will:
- ✅ Accept submissions
- ✅ Validate input
- ✅ Show success/error messages
- ⚠️ Log emails to console (development only)

**You need to configure one of the options above for production email sending.**

## Testing

1. Start your dev server: `npm run dev`
2. Go to `/contact`
3. Fill out and submit the form
4. Check the console for the logged email (until you configure a service)
5. Once configured, emails will be sent to the address in `content/contact.json` (or `CONTACT_EMAIL` env variable)

## Environment Variables

Create a `.env.local` file in your project root:

```env
# For Resend
RESEND_API_KEY=your_resend_api_key

# OR for Nodemailer
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com

# Contact email (optional - defaults to contact.json email)
CONTACT_EMAIL=contact@medpathucsd.edu
```

**Important:** Add `.env.local` to your `.gitignore` to keep credentials safe!

## Troubleshooting

- **Emails not sending?** Check your API keys/credentials are correct
- **CORS errors?** Make sure your API route is accessible
- **Form not submitting?** Check browser console for errors
- **Validation errors?** Ensure all required fields are filled

## Production Deployment

When deploying:
1. Add environment variables to your hosting platform (Vercel, Netlify, etc.)
2. Make sure your email service is configured for production
3. Test the form after deployment
4. Monitor email delivery in your email service dashboard
