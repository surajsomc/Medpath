# Google Forms Embedding Guide

This guide shows you how to embed Google Forms directly into your website instead of just linking to them.

## How to Get Your Google Form Embed URL

1. **Open your Google Form** in Google Forms
2. Click the **"Send"** button (top right)
3. Click the **HTML (</>)** tab
4. You'll see an iframe code like this:
   ```html
   <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd.../viewform?embedded=true" width="640" height="1200" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
   ```
5. **Copy the URL** from the `src` attribute (everything between the quotes)
   - Example: `https://docs.google.com/forms/d/e/1FAIpQLSd.../viewform?embedded=true`

## Adding to Your Site

### Option 1: Through the CMS Admin Panel

1. Go to `/admin` on your site
2. Navigate to "Contact Page"
3. Expand the "Google Form" section
4. Paste your form URL in "Form URL"
5. Optionally customize:
   - **Form Title**: The heading above the form
   - **Form Description**: Text below the title
   - **Form Height**: Height in pixels (default: 1200)
5. Click "Save"

### Option 2: Edit contact.json Directly

Edit `content/contact.json` and add:

```json
{
  "description": "Get in touch with Med Path...",
  "email": "contact@medpathucsd.edu",
  "googleForm": {
    "googleFormUrl": "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true",
    "formTitle": "Contact Us",
    "formDescription": "Fill out this form to get in touch with us",
    "formHeight": 1200
  },
  "socialLinks": {
    "instagram": "...",
    "twitter": "...",
    "facebook": "..."
  }
}
```

### Option 3: Use the Component Directly

You can use the `GoogleFormEmbed` component anywhere in your site:

```tsx
import GoogleFormEmbed from '@/components/GoogleFormEmbed'

export default function MyPage() {
  return (
    <div>
      <h1>My Form</h1>
      <GoogleFormEmbed 
        formUrl="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
        height={1200}
        title="My Form Title"
      />
    </div>
  )
}
```

## Component Props

- `formUrl` (required): The Google Form embed URL
- `height` (optional, default: 1200): Height of the form in pixels
- `title` (optional): Accessibility title for the iframe
- `className` (optional): Additional CSS classes

## Tips

- **Make sure your form is public**: The form needs to be accessible to anyone (or at least to people who can view your site)
- **Test the embed**: Always test the embedded form to make sure it works correctly
- **Responsive design**: The component is responsive and will adjust to different screen sizes
- **Height adjustment**: Adjust the height based on your form's length. Longer forms may need more height.

## Example Use Cases

- Contact forms
- Registration forms
- Survey forms
- Application forms
- Feedback forms
- Event sign-up forms

## Troubleshooting

**Form not showing?**
- Check that the URL includes `?embedded=true` or `&embedded=true`
- Verify the form is set to accept responses from anyone
- Check browser console for any errors

**Form too tall/short?**
- Adjust the `formHeight` prop in the CMS or component
- The component has a minimum height of 600px for usability

**Form looks cut off?**
- Increase the height value
- Check if your form has many sections that require scrolling
