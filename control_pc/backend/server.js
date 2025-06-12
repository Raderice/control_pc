const http = require('http');
const open = require('open');
const loudness = require('loudness');

const server = http.createServer(async (req, res) => {
  // Добавляем CORS-заголовки для всех запросов
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обработка preflight-запросов (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Логируем все POST-запросы
  if (req.method === 'POST') {
    console.log(`Получена команда: ${req.url.replace('/', '').toUpperCase()}`);
  }

  if (req.method === 'POST' && req.url === '/play') {
    console.log('Получена команда PLAY');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK');
  } else if (req.method === 'POST' && req.url === '/pause') {
    console.log('Получена команда PAUSE');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK');
  } else if (req.method === 'POST' && req.url === '/open-youtube') {
    console.log('Открыть YouTube');
    await open('https://youtube.com');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK');
  } else if (req.method === 'POST' && req.url === '/volume-up') {
    let vol = await loudness.getVolume();
    vol = Math.min(vol + 10, 100);
    await loudness.setVolume(vol);
    console.log('Громкость увеличена:', vol);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK');
  } else if (req.method === 'POST' && req.url === '/volume-down') {
    let vol = await loudness.getVolume();
    vol = Math.max(vol - 10, 0);
    await loudness.setVolume(vol);
    console.log('Громкость уменьшена:', vol);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK');
  } else if (req.method === 'POST') {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
  }
});

server.listen(4000, '0.0.0.0', () => {
  console.log('Сервер управления запущен на порту 4000');
});