#!/bin/bash
cd "$(dirname "$0")/control_pc" || exit 1

# Получить локальный IP (берём первый не-loopback IPv4)
LOCAL_IP=$(ip -4 addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | grep -v '^127\.' | head -n 1)
if [ -z "$LOCAL_IP" ]; then
  LOCAL_IP=$(ifconfig | grep -oP 'inet\s+\K\d+(\.\d+){3}' | grep -v '^127\.' | head -n 1)
fi

# # Установить зависимости для backend
# if [ ! -d "backend/node_modules" ]; then
#   cd backend
#   npm install
#   cd ..
# fi

# Установить зависимости для клиента
if [ ! -d "node_modules" ]; then
  npm install
fi

# Запуск серверной части в новом терминале
cd backend
gnome-terminal -- bash -c "node server.js; echo 'Сервер завершён. Нажмите Enter...'; read"
cd ..

# Запуск клиентской части в новом терминале
gnome-terminal -- bash -c "npm start; echo 'Клиент завершён. Нажмите Enter...'; read"

echo "Сервер и клиент запущены."
echo "Откройте на телефоне: http://$LOCAL_IP:3000"
echo "Нажмите Enter для выхода..."
read