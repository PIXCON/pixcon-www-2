# Pixcon Website

Hugo + Tailwind CSS (optimized build, no CDN)

## Performance

| Metric | Before | After |
|--------|--------|-------|
| CSS Size | ~127 KB (CDN) | **3.08 KB** (gzip) |
| CSS Loading | External, blocking | Local, fast |
| LCP Impact | +200-500ms | Minimal |

## Quick Start

```bash
# Install dependencies
npm install

# Build CSS + start Hugo dev server
npm run dev
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Build CSS + Hugo dev server |
| `npm run build` | Production build (CSS check + Hugo) |
| `npm run css:dev` | Watch CSS changes |
| `npm run css:build` | Build minified CSS |
| `npm run css:check` | Build + verify size budget |
| `npm run start` | Hugo server only (no CSS rebuild) |

## CSS Budget

- **Target:** < 12 KB uncompressed (~3-4 KB gzip)
- **Hard Limit:** 15 KB uncompressed
- **Build fails** if CSS exceeds hard limit

## Project Structure

```
├── assets/css/input.css    # Tailwind source
├── static/css/styles.css   # Built CSS (gitignored optional)
├── layouts/                # Hugo templates
├── content/                # Markdown content
├── scripts/                # Build scripts
│   └── check-css-size.js   # CSS budget guard
├── tailwind.config.js      # Tailwind config (strict purge)
└── package.json            # npm scripts
```

## Adding New Styles

1. Use Tailwind utility classes in `layouts/*.html`
2. Run `npm run css:build` to regenerate CSS
3. Check size with `npm run css:check`

⚠️ **Don't add Tailwind CDN back!** The whole point is local, purged CSS.

## Requirements

- Node.js 18+
- Hugo (extended) 0.110+
