#!/usr/bin/env bash
set -e

echo "==> GetLicence - Instalador automatico"

if [ "$(id -u)" -ne 0 ]; then
  echo "==> Execute com sudo: sudo bash install.sh"
  exit 1
fi

# 1) Detecta IP local automaticamente
SERVER_IP=$(hostname -I 2>/dev/null | awk '{print $1}')
if [ -z "$SERVER_IP" ]; then
  SERVER_IP=$(ip route get 1.1.1.1 2>/dev/null | awk '{print $7; exit}')
fi
if [ -z "$SERVER_IP" ]; then
  SERVER_IP="localhost"
fi
echo "==> IP detectado: $SERVER_IP"

# Remove instalacao antiga via systemd, que tentava abrir .output/server/index.mjs
for SERVICE in getlicence-app.service getlicence.service; do
  if systemctl list-unit-files "$SERVICE" >/dev/null 2>&1; then
    echo "==> Desativando servico antigo: $SERVICE"
    systemctl stop "$SERVICE" >/dev/null 2>&1 || true
    systemctl disable "$SERVICE" >/dev/null 2>&1 || true
    rm -f "/etc/systemd/system/$SERVICE"
  fi
done
systemctl daemon-reload >/dev/null 2>&1 || true

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

if docker compose version >/dev/null 2>&1; then
  COMPOSE="docker compose"
elif command -v docker-compose >/dev/null 2>&1; then
  COMPOSE="docker-compose"
else
  echo "ERRO: Docker Compose nao foi instalado corretamente."
  exit 1
fi

# 4) Cria .env apenas se ainda nao existir, para nao trocar a senha do banco em reinstalacoes
if [ ! -f .env ]; then
  cat > .env <<EOF
SERVER_IP=$SERVER_IP
APP_PORT=8080
POSTGRES_USER=getlicence
POSTGRES_PASSWORD=getlicence_$(openssl rand -hex 8 2>/dev/null || echo changeme)
POSTGRES_DB=getlicence
EOF
  echo "==> .env criado"
else
  sed -i "s/^SERVER_IP=.*/SERVER_IP=$SERVER_IP/" .env || true
  echo "==> .env existente atualizado com IP detectado"
fi

# 5) Sobe os containers
echo "==> Subindo containers..."
$COMPOSE down --remove-orphans >/dev/null 2>&1 || true
$COMPOSE up -d --build

echo ""
echo "============================================"
echo "  GetLicence instalado com sucesso!"
echo "  Acesse: http://$SERVER_IP:8080"
echo "============================================"
