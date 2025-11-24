## Docker Compose deployment (VPS using public IP)

This project includes a small `docker-compose.yml` and `deploy/Caddyfile` to make running the API on a VPS quick and repeatable.

Overview:
- `app` uses the published image `ghcr.io/hkvil/nestjs-helpdesk:main` and reads environment from `.env` in repo root.
- `caddy` is used as the reverse proxy — it can automatically obtain TLS certificates via Let's Encrypt for `helpdesk.hidayat.me` and forward traffic on port 80/443 to `app:3000`.

Important: do NOT commit your real `.env` with secrets into Git.

Quick start on VPS (example path: /home/ubuntu/helpdesk):

1) Place an `.env` file at the project root (example already included in `.env.example`).

2) If you are deploying with the domain `helpdesk.hidayat.me`:

	- Make sure the DNS A record for `helpdesk.hidayat.me` points to your VPS public IP (`134.185.87.80`).
	- Caddy will automatically request and manage Let's Encrypt certificates for the domain.

	If you don't want to use Let's Encrypt or prefer local testing, you can still generate a self-signed cert with the helper:
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
docker compose logs -f caddy
docker compose logs -f app
```

Notes:
- The `app` service exposes port 3000 internally. Caddy will accept traffic on port 80/443 and forward to port 3000. Ensure `helpdesk.hidayat.me` DNS points to your VPS so Caddy can provision TLS.
- If you want to use the source tree instead of the published image, edit `docker-compose.yml` and replace the `app` image with `build: .` so it builds locally.
- If you want automatic image updates, use a small watcher like `containrrr/watchtower`.
