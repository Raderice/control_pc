#!/bin/bash
cd "$(dirname "$0")/conrol_pz" || exit 1

# Получить локальный IP
LOCAL_IP=$(hostname -I | awk '{print $1}')

# Установить зависимости для backend
if [ ! -d "backend/node_modules" ]; then
  cd backend
  npm install
  cd ..
fi

# Установить зависимости для клиента
if [ ! -d "node_modules" ]; then
  npm install
fi

# Запуск серверной части
cd backend
nohup node server.js > ../server.log 2>&1 &
cd ..

# Запуск клиентской части
nohup npm start > client.log 2>&1 &

echo "Сервер и клиент запущены."
echo "Откройте на телефоне: http://$LOCAL_IP:3000"