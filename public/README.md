# Public Assets Directory

Static files that will be served directly without processing.

## What Goes Here

- `favicon.ico` - Site favicon
- `robots.txt` - Search engine directives  
- `manifest.json` - PWA manifest
- `service-worker.js` - PWA service worker
- Images that don't need processing
- Fonts (if not using CDN)
- Static JSON data files

## Files to Add

### favicon.ico
Generate from your logo using a favicon generator.

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

### manifest.json (for PWA)
Update with your app details:
- name
- short_name
- description
- theme_color
- background_color
- icons

## Note

Files in this directory are served at the root path:
- `/public/favicon.ico` → `https://yourdomain.com/favicon.ico`

For processed assets (that need optimization), put them in `src/assets/` instead.