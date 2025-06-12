@echo off
cd /d "%~dp0control_pc"

REM Получить локальный IP (берём первый IPv4)
for /f "tokens=2 delims=:" %%f in ('ipconfig ^| findstr /c:"IPv4"') do (
    set IP=%%f
    goto :gotip
)
:gotip
set IP=%IP: =%

@REM REM Установить зависимости для backend
@REM if not exist backend\node_modules (
@REM     cd backend
@REM     call npm install
@REM     cd ..
@REM )

REM Установить зависимости для клиента
if not exist node_modules (
    call npm install
)

REM Запуск серверной части в новом окне, окно не закрывается
cd backend
start "Backend Server" cmd /k "node server.js"
cd ..

REM Запуск клиентской части в новом окне, окно не закрывается
start "Client App" cmd /k "npm start"

echo Сервер и клиент запущены.
echo Откройте на телефоне: http://%IP%:3000
pause