# Deployment — auralgraphix.com

Static Next.js export served directly by nginx. No Node process runs in
production; nginx serves pre-rendered HTML from disk.

```
GitHub ──▶ /var/www/AURAL-GRAPHIX ──▶ npm run build ──▶ out/ ──▶ nginx ──▶ auralgraphix.com
```

---

## 1. Build

| | |
|---|---|
| **Build command** | `npm run build` |
| **Output directory** | `/var/www/AURAL-GRAPHIX/out` |
| **Node** | 18.18+ (20 LTS recommended) |
| **Runtime needed in prod** | none — static files only |

`output: "export"` in `next.config.ts` makes `next build` write `out/` as part of
the normal build. There is no separate `next export` step (removed in Next 14).

`npm start` no longer works and is expected to fail — `next start` refuses to run
against a static export. Serve `out/` instead.

---

## 2. Environment variables

Both are **build-time** and are **inlined into the JavaScript bundle**. Anyone can
read them in view-source. Never put a private key, SMTP password, or API secret
in a `NEXT_PUBLIC_` variable — a static site has no server to keep a secret on.

Create `/var/www/AURAL-GRAPHIX/.env.production` (see `.env.example`):

```bash
NEXT_PUBLIC_SITE_URL=https://auralgraphix.com
NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/your-form-id
```

| Variable | Required | Effect if wrong/missing |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | recommended | Defaults to `https://auralgraphix.com`. Drives `sitemap.xml`, `robots.txt`, canonical tags and absolute `og:image` URLs. A mismatch points crawlers at the wrong host. |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | **yes** | Unset ⇒ the contact form always shows its error state and logs to the browser console. **Must be set before building**, not after. |

### Contact form setup

The site previously had a `POST /api/contact` Next route. A static export cannot
run one, so the form now POSTs JSON straight from the browser to an external form
backend. Pick any service that accepts a cross-origin JSON POST:

1. Create a form at Formspree / Getform / Basin (or deploy a small Cloudflare
   Worker of your own).
2. Copy its **public submit URL** into `NEXT_PUBLIC_CONTACT_ENDPOINT`.
3. Allow the origin `https://auralgraphix.com` in that service's CORS/domain
   settings, or the browser will block the request.
4. Rebuild. The value is baked in at build time.

The form sends `{ name, email, phone, company, message, submittedAt }` and keeps
the same name/email/phone validation the old API route did, now client-side.
Only the service's *public* submit identifier lives in the frontend; the secret
half (mail credentials, forwarding rules) stays in that service's dashboard.

---

## 3. nginx configuration

`/etc/nginx/sites-available/www.auralgraphix.com`:

```nginx
# www -> apex. Canonical URLs in sitemap.xml/robots.txt use the apex domain,
# so www must redirect rather than serve a duplicate copy.
server {
    listen 80;
    listen [::]:80;
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.auralgraphix.com;

    ssl_certificate     /etc/letsencrypt/live/auralgraphix.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/auralgraphix.com/privkey.pem;

    return 301 https://auralgraphix.com$request_uri;
}

server {
    listen 80;
    listen [::]:80;
    server_name auralgraphix.com;
    return 301 https://auralgraphix.com$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name auralgraphix.com;

    root /var/www/AURAL-GRAPHIX/out;
    index index.html;

    ssl_certificate     /etc/letsencrypt/live/auralgraphix.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/auralgraphix.com/privkey.pem;

    # Security headers. These were in next.config.ts headers(), which is a no-op
    # under output:"export" — there is no Next server left to set them.
    add_header X-Content-Type-Options   "nosniff"                        always;
    add_header Referrer-Policy          "strict-origin-when-cross-origin" always;
    add_header X-DNS-Prefetch-Control   "on"                             always;

    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/javascript application/json
               image/svg+xml application/xml;
    gzip_min_length 1024;

    # ---- ROUTING ----------------------------------------------------------
    # $uri.html MUST come before $uri. The export produces BOTH `blog.html` and
    # a `blog/` directory (same for projects/). With `$uri` first, the directory
    # can shadow the page and /blog 404s or 301-loops. Testing .html first makes
    # it unambiguous.
    location / {
        try_files $uri.html $uri $uri/index.html =404;
    }

    # Content-hashed build output: safe to cache forever.
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location /assets/ {
        expires 30d;
        add_header Cache-Control "public";
        access_log off;
    }

    # HTML and the .txt RSC payloads are NOT content-hashed — they are
    # overwritten on every deploy, so they must revalidate or users get a stale
    # page pointing at deleted JS chunks.
    location ~* \.(html|txt)$ {
        add_header Cache-Control "public, max-age=0, must-revalidate";
    }

    # next/og writes this PNG with no file extension, so nginx would otherwise
    # serve it as application/octet-stream and social crawlers reject the preview.
    location = /opengraph-image {
        default_type image/png;
        expires 7d;
    }

    error_page 404 /404.html;
    location = /404.html { internal; }
}
```

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/www.auralgraphix.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

TLS, if not already issued:

```bash
sudo certbot --nginx -d auralgraphix.com -d www.auralgraphix.com
```

---

## 4. Permissions

nginx workers (`www-data` on Debian/Ubuntu) need **read** on the files and
**execute** on every parent directory.

```bash
sudo chown -R $USER:www-data /var/www/AURAL-GRAPHIX
sudo find /var/www/AURAL-GRAPHIX/out -type d -exec chmod 755 {} \;
sudo find /var/www/AURAL-GRAPHIX/out -type f -exec chmod 644 {} \;
chmod 755 /var /var/www /var/www/AURAL-GRAPHIX
```

Keep `.env.production` out of nginx's reach and unreadable by others:

```bash
chmod 600 /var/www/AURAL-GRAPHIX/.env.production
```

Build as a normal user, never as root — a root-owned `.next/` will break the
next unprivileged build.

If SELinux is enforcing (RHEL/Alma/Rocky, not Debian/Ubuntu):

```bash
sudo semanage fcontext -a -t httpd_sys_content_t "/var/www/AURAL-GRAPHIX/out(/.*)?"
sudo restorecon -Rv /var/www/AURAL-GRAPHIX/out
```

---

## 5. Updating after a git pull

```bash
cd /var/www/AURAL-GRAPHIX
git pull origin main
npm ci                 # not `npm install` — respects package-lock.json
npm run build          # regenerates out/
sudo systemctl reload nginx   # only needed if the nginx config itself changed
```

`out/` is gitignored and rebuilt in place. nginx serves from disk, so a reload is
not required for content changes — the new files are live as soon as the build
finishes.

Deploy script (`deploy.sh`), optional:

```bash
#!/usr/bin/env bash
set -euo pipefail
cd /var/www/AURAL-GRAPHIX
git pull origin main
npm ci
npm run build
sudo find out -type d -exec chmod 755 {} \;
sudo find out -type f -exec chmod 644 {} \;
echo "Deployed $(git rev-parse --short HEAD)"
```

### Zero-downtime note

`npm run build` deletes and repopulates `out/`, so for a few seconds the site can
serve 404s. To avoid that, build to a staging path and swap symlinks:

```bash
# point nginx root at /var/www/auralgraphix-current instead
npm run build
rm -rf /var/www/releases/$(date +%s) && cp -r out /var/www/releases/$(date +%s)
ln -sfn /var/www/releases/<new> /var/www/auralgraphix-current
sudo systemctl reload nginx
```

---

## 6. Verifying a deploy

```bash
# out/ exists and has the expected 17 pages
test -d /var/www/AURAL-GRAPHIX/out && find /var/www/AURAL-GRAPHIX/out -name '*.html' | wc -l

# every route returns 200 through nginx — especially /blog and /projects,
# which are the two that the directory-shadowing bug would break
for p in / /about-us /blog /projects /contact-us \
         /blog/why-storytelling-shapes-brand-success \
         /projects/pawbiotics /legal-pages/privacy-policy \
         /robots.txt /sitemap.xml; do
  printf '%-50s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' https://auralgraphix.com$p)"
done

# og image must report image/png, not application/octet-stream
curl -sI https://auralgraphix.com/opengraph-image | grep -i content-type

# a bad path must serve the styled 404
curl -s -o /dev/null -w '%{http_code}\n' https://auralgraphix.com/nope
```

---

## 7. Troubleshooting

**`out/` is not created by `npm run build`**
`output: "export"` is missing from `next.config.ts`. Confirm with
`grep output next.config.ts`. Also delete a stale `.next/` and rebuild.

**`/blog` or `/projects` 404s, but `/blog/some-post` works**
The directory-shadowing problem. `try_files` must test `$uri.html` *before*
`$uri`, because the export contains both `blog.html` and `blog/`. Check the
`location /` block above.

**Every route except `/` 404s**
`try_files` is missing the `$uri.html` fallback entirely — nginx is looking for
an extensionless file that does not exist. The export uses flat `about-us.html`
files, not `about-us/index.html`.

**403 Forbidden on everything**
Permissions. nginx needs `+x` on `/var`, `/var/www`, `/var/www/AURAL-GRAPHIX` and
`out/`. Check with `sudo -u www-data stat /var/www/AURAL-GRAPHIX/out/index.html`.

**Build fails: `export const dynamic = "force-static" ... not configured`**
A metadata route (`robots.ts`, `sitemap.ts`, `opengraph-image.tsx`) lost its
`export const dynamic = "force-static"`. All three need it under static export.

**Build fails on an API route or Server Action**
Static export cannot include either. There are none left in this repo; if one is
reintroduced it must move to an external service.

**Contact form always errors**
`NEXT_PUBLIC_CONTACT_ENDPOINT` was unset *at build time* — setting it afterwards
does nothing, the value is compiled in. Rebuild. If it is set, open devtools: a
CORS error means the origin is not allowlisted in the form provider.

**Social previews show no image**
`/opengraph-image` is being served as `application/octet-stream`. Add the
`location = /opengraph-image { default_type image/png; }` block.

**sitemap.xml / canonical tags point at the wrong domain**
`NEXT_PUBLIC_SITE_URL` was wrong at build time. Fix it and rebuild.

**Stale page after deploy**
HTML was cached. HTML and `.txt` must send `max-age=0, must-revalidate`; only
`/_next/static/` is safe to cache immutably.

**`npm start` fails**
Expected. There is no server. Serve `out/` with nginx.
