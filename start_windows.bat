@echo off
cd /d "%~dp0conrol_pz"

REM Получить локальный IP (берём первый IPv4)
for /f "tokens=2 delims=:" %%f in ('ipconfig ^| findstr /c:"IPv4"') do (
    set IP=%%f
    goto :gotip
)
:gotip
set IP=%IP: =%

REM Установить зависимости для backend
if not exist backend\node_modules (
    cd backend
    call npm install
    cd ..
)

REM Установить зависимости для клиента
if not exist node_modules (
    call npm install
)

REM Запуск серверной части
cd backend
start "" cmd /c "node server.js > ..\server.log 2>&1"
cd ..

REM Запуск клиентской части
start "" cmd /c "npm start > client.log 2>&1"

echo Сервер и клиент запущены.
echo Откройте на телефоне: http://%IP%:3000
pause