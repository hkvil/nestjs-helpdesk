#!/usr/bin/env bash
# Small helper to generate self-signed certs for testing.
# Usage: ./generate-self-signed.sh 134.185.87.80

set -euo pipefail

IP_ADDRESS=${1:-127.0.0.1}
OUT_DIR="$(dirname "$0")/ssl"
mkdir -p "$OUT_DIR"

echo "Generating self-signed certificate for $IP_ADDRESS -> $OUT_DIR"

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout "$OUT_DIR/server.key" -out "$OUT_DIR/server.crt" \
  -subj "/CN=$IP_ADDRESS"

echo "Done. Self-signed cert: $OUT_DIR/server.crt, key: $OUT_DIR/server.key"
echo "Copy these to the server or keep them here and they will be mounted by docker-compose"
