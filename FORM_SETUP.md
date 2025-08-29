# Setting Up the Intake Form

## Overview

The intake form now supports:

- Email notifications via EmailJS
- Automatic redirect to Calendly after submission
- Works without configuration (demo mode)

## Configuration Steps

### 1. EmailJS Setup (Optional but Recommended)

If you already have an EmailJS account from before, you can use the same credentials. The same API key works for multiple forms.

#### Get Your EmailJS Credentials:

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Sign in or create a free account
3. Get your credentials:
   - **Service ID**: Found in Email Services section
   - **Template ID**: Create a new template (see below)
   - **Public Key**: Found in Account > API Keys

#### Create an Email Template:

1. In EmailJS dashboard, go to Email Templates
2. Create a new template
3. Use these variables in your template:
   ```
   Project Name: {{project_name}}
   Business: {{business_description}}
   Challenge: {{main_challenge}}
   Target Users: {{target_users}}
   Timeline: {{timeline}}
   Budget: {{budget}}
   Contact Email: {{contact_email}}
   Contact Phone: {{contact_phone}}
   ... (all other fields are available)
   ```

### 2. Calendly Setup

1. Get your Calendly link from your [Calendly account](https://calendly.com/)
2. It should look like: `https://calendly.com/yourname/30min`

### 3. Configure Your .env File

Edit the `.env` file in the root directory:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key

# Calendly Configuration
VITE_CALENDLY_URL=https://calendly.com/yourname/30min
```

### 4. Restart the Dev Server

After updating .env:

```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

## How It Works

### With Configuration:

1. User fills out the form
2. Form data is emailed to you via EmailJS
3. Success message appears
4. User is redirected to your Calendly page to schedule a call

### Without Configuration (Demo Mode):

1. User fills out the form
2. Form data is logged to console
3. If Calendly URL is set, redirects to Calendly
4. Otherwise shows demo alert

## Testing

1. Fill out the form completely
2. Submit
3. Check your email (if EmailJS is configured)
4. Verify Calendly redirect opens in new tab

## Troubleshooting

### Form not sending emails?

- Check browser console for errors
- Verify EmailJS credentials in .env
- Make sure email template variables match

### Calendly not opening?

- Check VITE_CALENDLY_URL in .env
- Make sure URL is complete (https://...)
- Check popup blocker settings

### Getting CORS errors?

- Make sure you're using the Public Key, not Private Key
- Check EmailJS service is active

## Email Template Example

Here's a sample EmailJS template you can use:

```
Subject: New Project Inquiry: {{project_name}}

Hello,

You have a new project inquiry!

PROJECT DETAILS
===============
Project Name: {{project_name}}
Business: {{business_description}}
Main Challenge: {{main_challenge}}

SCOPE
=====
Target Users: {{target_users}}
Primary Goal: {{primary_goal}}
User Scale: {{user_scale}}

REQUIREMENTS
============
Timeline: {{timeline}}
Budget: {{budget}}
Priority: {{priority}}

CONTACT
=======
Email: {{contact_email}}
Phone: {{contact_phone}}
Preferred Contact: {{preferred_contact}}

ADDITIONAL INFO
===============
{{additional_info}}

---
This form was submitted from your project intake form.
```

## Free Tier Limits

- **EmailJS Free**: 200 emails/month, 2 templates
- **Calendly Free**: Unlimited scheduling, 1 event type

Both services offer paid plans if you need more.
