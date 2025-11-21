# EmailJS Setup Instructions

The contact form on the Globalexis website uses EmailJS to send emails directly from the browser without needing a backend server.

## Quick Setup (5 minutes)

### Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add an Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the instructions to connect your email account
5. Copy the **Service ID** (you'll need this later)

### Step 3: Create an Email Template

1. In the EmailJS dashboard, go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

**Subject:**
```
New Contact Form Submission from {{from_name}}
```

**Body:**
```
You have received a new contact form submission from the Globalexis website.

Name: {{from_name}}
Company: {{company_name}}
Email: {{from_email}}
Phone: {{phone}}
Service Interest: {{service_interest}}

Message:
{{message}}

---
This email was sent via the Globalexis contact form.
```

4. Save the template and copy the **Template ID**

### Step 4: Get Your Public Key

1. Go to **Account** → **General** in the EmailJS dashboard
2. Find your **Public Key** (also called User ID)
3. Copy this key

### Step 5: Update Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

### Step 6: Test the Form

1. Restart your development server if it's running
2. Fill out and submit the contact form
3. Check your email inbox for the submission

## Template Variables Reference

The contact form sends these variables to your EmailJS template:

- `from_name` - The submitter's full name
- `company_name` - The company name
- `from_email` - The submitter's email address
- `phone` - Phone number (or "Not provided")
- `service_interest` - Selected service type
- `message` - The message content

Make sure your email template includes these variable names in double curly braces: `{{variable_name}}`

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- All features included
- No credit card required

This should be sufficient for a contact form. If you need more, check their pricing page.

## Troubleshooting

**Form shows "EmailJS configuration is missing" error:**
- Make sure all three environment variables are set in the `.env` file
- Restart your development server after updating `.env`

**Emails not being received:**
- Check your EmailJS dashboard to see if the email was sent
- Verify your email service is properly connected
- Check spam/junk folder
- Ensure template variables match exactly

**CORS errors:**
- EmailJS handles CORS automatically, but make sure you're using the correct Public Key
- Don't use the Private Key in the frontend

## Production Deployment

When deploying to production, make sure to:
1. Set the environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Never commit your actual credentials to version control
3. Keep the `.env` file in `.gitignore`

## Support

For more help, visit the [EmailJS Documentation](https://www.emailjs.com/docs/)
