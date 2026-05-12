#!/usr/bin/env bash
set -e

echo "==> GetLicence - Instalador automatico"

# 1) Detecta IP local automaticamente
SERVER_IP=$(hostname -I 2>/dev/null | awk '{print $1}')
if [ -z "$SERVER_IP" ]; then
  SERVER_IP=$(ip route get 1.1.1.1 2>/dev/null | awk '{print $7; exit}')
fi
if [ -z "$SERVER_IP" ]; then
  SERVER_IP="localhost"
fi
echo "==> IP detectado: $SERVER_IP"

# 2) Instala Docker se necessario
if ! command -v docker >/dev/null 2>&1; then
  echo "==> Instalando Docker..."
  curl -fsSL https://get.docker.com | sh
fi

# 3) Instala plugin docker compose se necessario
if ! docker compose version >/dev/null 2>&1; then
  echo "==> Instalando docker compose..."
  apt-get update -y && apt-get install -y docker-compose-plugin || true
fi

# 4) Cria .env
cat > .env <<EOF
SERVER_IP=$SERVER_IP
APP_PORT=8080
POSTGRES_USER=getlicence
POSTGRES_PASSWORD=getlicence_$(openssl rand -hex 8 2>/dev/null || echo changeme)
POSTGRES_DB=getlicence
EOF
echo "==> .env criado"

# 5) Sobe os containers
echo "==> Subindo containers..."
docker compose up -d --build

echo ""
echo "============================================"
echo "  GetLicence instalado com sucesso!"
echo "  Acesse: http://$SERVER_IP:8080"
echo "============================================"
