## Docker Compose deployment (VPS using public IP)

This project includes a small `docker-compose.yml` and `deploy/nginx.conf` to make running the API on a VPS quick and repeatable.

Overview:
- `app` uses the published image `ghcr.io/hkvil/nestjs-helpdesk:main` and reads environment from `.env` in repo root.
- `nginx` is a lightweight reverse proxy that forwards requests on port 80/443 to `app:3000`.

Important: do NOT commit your real `.env` with secrets into Git.

Quick start on VPS (example path: /home/ubuntu/helpdesk):

1) Place an `.env` file at the project root (example already included in `.env.example`).

2) Generate a self-signed cert (optional, for HTTPS testing) — run from repo root:
```bash
chmod +x ./deploy/generate-self-signed.sh
./deploy/generate-self-signed.sh 134.185.87.80
```

3) Start your stack in detached mode:
```bash
docker compose up -d
```

4) Check logs & status:
```bash
docker compose ps
docker compose logs -f nginx
docker compose logs -f app
```

Notes:
- The `app` service exposes port 3000 internally. nginx will accept traffic on port 80/443 and forward to port 3000.
- If you want to use the source tree instead of the published image, edit `docker-compose.yml` and replace the `app` image with `build: .` so it builds locally.
- If you want automatic image updates, use a small watcher like `containrrr/watchtower`.
