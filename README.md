# Ayatas Divorce Mediation Docs

Next.js documentation website for the AI-assisted divorce mediation platform research.

## Content

Research lives in `content/docs` as MDX. Navigation lives in `content/sidebar.ts`. Edit those files to change documentation without changing UI components.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Shared hosting

This site builds to static HTML. Typical cPanel/FTP hosts cannot run `next start`.

```bash
npm run build
```

Upload the **contents** of `out/` (including `.htaccess`) into `public_html` or the domain’s document root. Do not upload `package.json`, `node_modules`, or the Next.js source.

Preview the export locally with any static file server, for example:

```bash
npx --yes serve out
```

If the site lives in a subdirectory (for example `public_html/docs/`), also set `basePath` in `next.config.ts` to that path (`/docs`) and set `RewriteBase` in `.htaccess` to `/docs/`, then rebuild. Asset URLs are absolute, so a subdirectory will 404 without `basePath`.
