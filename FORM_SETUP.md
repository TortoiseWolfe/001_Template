# Setting Up the Intake Form

## Overview

The intake form now supports:

- Email notifications via Web3Forms
- Automatic redirect to Calendly after submission
- Works without configuration (demo mode)

## Configuration Steps

### 1. Web3Forms Setup (Optional but Recommended)

Web3Forms is simpler than EmailJS - you only need one access key, and you can reuse the same key across multiple forms.

#### Get Your Web3Forms Access Key:

1. Go to [Web3Forms](https://web3forms.com/)
2. Click "Create Access Key" (no signup required!)
3. Enter your email address where you want to receive form submissions
4. Copy the access key that's generated

That's it! No templates to configure, no multiple IDs to manage.

### 2. Calendly Setup

1. Get your Calendly link from your [Calendly account](https://calendly.com/)
2. It should look like: `https://calendly.com/yourname/30min`

### 3. Configure Your .env File

Edit the `.env` file in the root directory:

```env
# Web3Forms Configuration
VITE_WEB3FORMS_ACCESS_KEY=your_actual_access_key

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
2. Form data is sent to your email via Web3Forms
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
3. Check your email (if Web3Forms is configured)
4. Verify Calendly redirect opens in new tab

## Troubleshooting

### Form not sending emails?

- Check browser console for errors
- Verify Web3Forms access key in .env
- Make sure the access key is correct (starts with a UUID)
- Check that your email is correctly set in Web3Forms

### Calendly not opening?

- Check VITE_CALENDLY_URL in .env
- Make sure URL is complete (https://...)
- Check popup blocker settings

### Getting errors?

- Make sure you're using the correct access key
- Web3Forms has a generous free tier (unlimited forms, 250 submissions/month)
- Check the browser console for detailed error messages

## Email Format

Web3Forms automatically formats your email with all the form fields. The email you receive will include:

- **Subject**: "New Project Inquiry: [Project Name]"
- **All form fields** organized in a clean, readable format
- **Contact information** prominently displayed
- **Timestamp** of submission

## What You'll Receive

When someone submits the form, you'll get an email like this:

```
Subject: New Project Inquiry: CRUDgames.com

New submission from your intake form:

PROJECT DETAILS
===============
Project Name: CRUDgames.com
Business: We provide Software as a Service (SaaS) solutions...
Main Challenge: Helping small businesses discover that custom software...

SCOPE
=====
Target Users: Small businesses and startups...
Primary Goal: Learn about our services...
User Scale: < 100

REQUIREMENTS
============
Timeline: asap
Budget: startup
Priority: design

FEATURES
========
User Accounts: none
Payments: one-time, donations
Content Features: managed, blog, downloads
Communication: contact
Special Features: search, calendar, portfolio, twitch

BRAND
=====
Personality: friendly, modern, playful
Brand Info: Cyberpunk aesthetic with neon blues...
Examples: https://tortoisewolfe.github.io/Resume/

CONTACT
=======
Email: [client email]
Phone: [client phone]
Preferred Contact: [preference]

SUCCESS METRICS
===============
- Generate 10+ qualified leads per month
- Book 5+ discovery calls monthly
- Build sustainable six-figure revenue stream
- Maintain creative freedom and enjoyment in our work
- Help small businesses achieve their software goals

ADDITIONAL INFO
===============
[Any additional notes]
```

## Free Tier Limits

- **Web3Forms Free**: 250 submissions/month, unlimited forms
- **Calendly Free**: Unlimited scheduling, 1 event type

Both services offer paid plans if you need more.

## Advantages of Web3Forms over EmailJS

1. **Simpler Setup**: Only one access key needed (vs 3 credentials for EmailJS)
2. **No Account Required**: Get started immediately without signing up
3. **Better Free Tier**: 250 submissions/month vs 200 for EmailJS
4. **No Template Management**: Automatic formatting of all fields
5. **Spam Protection**: Built-in honeypot and reCAPTCHA support
6. **Reusable**: Same access key works across multiple forms and projects
