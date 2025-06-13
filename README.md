#10-06-2025 == pivo
необходимые предустановленные пакеты для win10:  
- java  
- nircmd (скачать с https://www.nirsoft.net/utils/nircmd.html и положить в backend/tools/)  
- firewall

## Запуск проекта

### 1. Установите зависимости

#### Серверная часть:
```bash
cd backend
npm install
```

#### Клиентская часть:
```bash
npm install
```

### 2. Для Linux установите alsa-utils (если не установлен)
```bash
sudo apt update
sudo apt install alsa-utils
```

### 3. Скачайте nircmd.exe и положите в backend/tools/ (для Windows)

### 4. Запустите сервер
```bash
cd backend
node server.js
```

### 5. Запустите клиент
```bash
npm start
```

### 6. Откройте сайт на телефоне или другом устройстве в сети, используя IP вашего компьютера и порт 3000

---

**Примечание:**  
- Для управления громкостью на Linux нужен установленный `amixer` (alsa-utils).
- На Windows требуется nircmd.exe и java.

- На macOS дополнительных действий не требуется.- На macOS дополнительных действий не требуется.
