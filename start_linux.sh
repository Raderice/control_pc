#!/bin/bash
# Скрипт для автоматического запуска backend и frontend (npm start) из корня проекта

cd "$(dirname "$0")" || exit 1

# Получить локальный IP (берём первый не-loopback IPv4)
LOCAL_IP=$(ip -4 addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | grep -v '^127\.' | head -n 1)
if [ -z "$LOCAL_IP" ]; then
  LOCAL_IP=$(ifconfig | grep -oP 'inet\s+\K\d+(\.\d+){3}' | grep -v '^127\.' | head -n 1)
fi

# Установить права на выполнение для react-scripts (и всех бинарников npm)
if [ -d "control_pc/node_modules/.bin" ]; then
  chmod -R u+x control_pc/node_modules/.bin
fi

# Установить зависимости для backend
if [ ! -d "control_pc/backend/node_modules" ]; then
  cd control_pc/backend
  npm install
  cd ../..
fi

# Установить зависимости для клиента
if [ ! -d "control_pc/node_modules" ]; then
  cd control_pc
  npm install
  cd ..
fi

# Запуск серверной части в новом терминале
gnome-terminal -- bash -c "cd control_pc/backend && node server.js; echo 'Сервер завершён. Нажмите Enter...'; read"

# Запуск клиентской части в новом терминале
gnome-terminal -- bash -c "cd control_pc && npm start; echo 'Клиент завершён. Нажмите Enter...'; read"

echo "Сервер и клиент запущены."
echo "Откройте на телефоне: http://$LOCAL_IP:3000"
echo "Нажмите Enter для выхода..."
read