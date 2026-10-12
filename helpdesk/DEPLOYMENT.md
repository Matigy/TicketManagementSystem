# HelpDesk – Railway Deployment Guide

## Demo Credentials (post-seed)
| Field    | Value              |
|----------|--------------------|
| Email    | test@example.com   |
| Password | password           |

---

## Local Development Setup

```bash
# 1. Install PHP dependencies
composer install

# 2. Install Node dependencies
npm install

# 3. Copy environment file and generate key
cp .env.example .env
php artisan key:generate

# 4. Run migrations + seed
php artisan migrate --seed

# 5. Build frontend assets
npm run build

# 6. Start dev servers (in two terminals)
php artisan serve
npm run dev
```

---

## Railway Deployment (Production MySQL)

### Step 1 – Create a Railway project
1. Go to [railway.app](https://railway.app) and create a new project.
2. Click **+ New Service → Database → MySQL**.
3. Once provisioned, click the MySQL service and copy the **connection variables** from the *Variables* tab.

### Step 2 – Add Laravel service
1. In the same project, click **+ New Service → GitHub Repo** and select your repository.
2. Railway detects `railway.json` automatically and uses Nixpacks.

### Step 3 – Set environment variables on the Laravel service
Go to the Laravel service → *Variables* tab and add:

```
APP_NAME=HelpDesk
APP_ENV=production
APP_DEBUG=false
APP_KEY=            ← run: php artisan key:generate --show
APP_URL=https://<your-service>.railway.app
ASSET_URL=https://<your-service>.railway.app

DB_CONNECTION=mysql
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_DATABASE=${{MySQL.MYSQLDATABASE}}
DB_USERNAME=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
LOG_CHANNEL=stack
LOG_LEVEL=error
```

> Railway supports **reference variables** — use `${{MySQL.MYSQLHOST}}` syntax to link
> directly to the MySQL service variables without copying secrets manually.

### Step 4 – Generate APP_KEY
Run locally and paste the output into the Railway variable:
```bash
php artisan key:generate --show
```

### Step 5 – Deploy
Push to your GitHub branch. Railway automatically:
1. Runs `composer install --no-dev` + `npm ci` + `npm run build`
2. Executes `php artisan migrate --force && php artisan db:seed --force`
3. Starts `php artisan serve --host=0.0.0.0 --port=$PORT`

### Step 6 – Verify
- Visit `https://<your-service>.railway.app`
- Register or log in with `test@example.com` / `password`
- You should see 12 pre-seeded tickets across page 1 and 2 (10 per page)

---

## Build & Start Commands (reference)
| Purpose       | Command |
|---------------|---------|
| Build assets  | `npm run build` |
| Migrate       | `php artisan migrate --force` |
| Seed          | `php artisan db:seed --force` |
| Start server  | `php artisan serve --host=0.0.0.0 --port=$PORT` |
