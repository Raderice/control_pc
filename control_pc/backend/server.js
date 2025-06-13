const http = require('http');
const open = require('open');
const loudness = require('loudness');
const keySender = require('node-key-sender');
const os = require('os');
const { exec } = require('child_process');

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
  } else if (req.method === 'POST' && req.url === '/key') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { key } = JSON.parse(body);

        const keyMap = {
          'Esc': 'escape',
          'Tab': 'tab',
          'CapsLock': 'caps_lock',
          'Shift': 'shift',
          'Ctrl': 'control',
          'Alt': 'alt',
          'Win': 'command',
          'Menu': 'menu',
          'Enter': 'enter',
          'Backspace': 'backspace',
          'Del': 'delete',
          'Insert': 'insert',
          'Home': 'home',
          'End': 'end',
          'PgUp': 'page_up',
          'PgDn': 'page_down',
          '↑': 'up',
          '↓': 'down',
          '←': 'left',
          '→': 'right',
          'PrtSc': 'print_screen',
          'Scroll': 'scroll_lock',
          'Pause': 'pause',
          'NumLock': 'num_lock',
          'Space': 'space',
          // Символы
          ';': 'semicolon',
          ':': 'semicolon',
          '`': 'back_quote',
          '~': 'back_quote',
          "'": 'quote',
          '"': 'quote',
          ',': 'comma',
          '<': 'comma',
          '.': 'dot',
          '>': 'dot',
          '/': 'slash',
          '?': 'slash',
          '\\': 'backslash',
          '|': 'backslash',
          '[': 'open_bracket',
          '{': 'open_bracket',
          ']': 'close_bracket',
          '}': 'close_bracket',
          '-': 'minus',
          '_': 'minus',
          '=': 'equals',
          '+': 'equals',
          ...Object.fromEntries(Array.from({length:12},(_,i)=>[`F${i+1}`,`f${i+1}`])),
        };

        // --- Исправление для Backspace на Linux ---
        if (key === "Backspace" && os.platform() === "linux") {
          exec('xdotool key BackSpace', (err) => {
            if (err) {
              console.error('Ошибка xdotool:', err);
              res.writeHead(500, {'Content-Type': 'text/plain'});
              res.end('xdotool error');
            } else {
              console.log('Нажата Backspace через xdotool');
              res.writeHead(200, {'Content-Type': 'text/plain'});
              res.end('OK');
            }
          });
        // --- Можно добавить Win/Super аналогично, если нужно ---
        // } else if ((key === "Win" || key === "Super") && os.platform() === "linux") {
        //   exec('xdotool key Super_L', (err) => {
        //     if (err) {
        //       console.error('Ошибка xdotool:', err);
        //       res.writeHead(500, {'Content-Type': 'text/plain'});
        //       res.end('xdotool error');
        //     } else {
        //       console.log('Нажата Win/Super через xdotool');
        //       res.writeHead(200, {'Content-Type': 'text/plain'});
        //       res.end('OK');
        //     }
        //   });
        } else if (keyMap[key]) {
          keySender.sendKey(keyMap[key])
            .then(() => {
              console.log('Нажата спецклавиша/символ:', key, '→', keyMap[key]);
              res.writeHead(200, {'Content-Type': 'text/plain'});
              res.end('OK');
            })
            .catch((err) => {
              console.error('Ошибка отправки:', err);
              res.writeHead(500, {'Content-Type': 'text/plain'});
              res.end('Key send error');
            });
        } else if (/^[a-zA-Z0-9]$/.test(key)) {
          keySender.sendKey(key.toLowerCase())
            .then(() => {
              console.log('Нажата клавиша:', key.toLowerCase());
              res.writeHead(200, {'Content-Type': 'text/plain'});
              res.end('OK');
            })
            .catch((err) => {
              console.error('Ошибка отправки:', err);
              res.writeHead(500, {'Content-Type': 'text/plain'});
              res.end('Key send error');
            });
        } else {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.end('Unknown key');
        }
      } catch (e) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Bad request');
      }
    });
    return;
<<<<<<< Updated upstream
=======
  } else if (req.method === 'POST' && req.url === '/touchpad') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { dx, dy, action, button, direction } = JSON.parse(body);
        const platform = os.platform();

        if (action === "move" && (dx !== 0 || dy !== 0)) {
          if (platform === "linux") {
            // Linux: xdotool
            exec('xdotool getmouselocation --shell', (err, stdout) => {
              if (err) {
                console.error('Ошибка xdotool getmouselocation:', err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('xdotool error');
                return;
              }
              const xMatch = stdout.match(/X=(\d+)/);
              const yMatch = stdout.match(/Y=(\d+)/);
              if (!xMatch || !yMatch) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('xdotool parse error');
                return;
              }
              const x = parseInt(xMatch[1], 10) + Math.round(dx);
              const y = parseInt(yMatch[1], 10) + Math.round(dy);
              exec(`xdotool mousemove ${x} ${y}`, (err2) => {
                if (err2) {
                  console.error('Ошибка xdotool mousemove:', err2);
                  res.writeHead(500, {'Content-Type': 'text/plain'});
                  res.end('xdotool error');
                } else {
                  res.writeHead(200, {'Content-Type': 'text/plain'});
                  res.end('OK');
                }
              });
            });
          } else if (platform === "win32") {
            // Windows: nircmd (https://www.nirsoft.net/utils/nircmd.html) должен быть в PATH
            // nircmd.exe перемещает мышь относительно текущей позиции
            exec(`nircmd.exe movecursor ${Math.round(dx)} ${Math.round(dy)}`, (err) => {
              if (err) {
                console.error('Ошибка nircmd:', err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('nircmd error');
              } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('OK');
              }
            });
          } else if (platform === "darwin") {
            // macOS: cliclick (https://github.com/BlueM/cliclick) должен быть в PATH
            exec('cliclick p', (err, stdout) => {
              if (err) {
                console.error('Ошибка cliclick:', err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('cliclick error');
                return;
              }
              // Получить позицию: stdout = "123 456"
              const [x0, y0] = stdout.trim().split(/\s+/).map(Number);
              const x = Math.round(x0 + dx);
              const y = Math.round(y0 + dy);
              exec(`cliclick m:${x},${y}`, (err2) => {
                if (err2) {
                  console.error('Ошибка cliclick move:', err2);
                  res.writeHead(500, {'Content-Type': 'text/plain'});
                  res.end('cliclick error');
                } else {
                  res.writeHead(200, {'Content-Type': 'text/plain'});
                  res.end('OK');
                }
              });
            });
          } else {
            // Неизвестная ОС — ничего не делаем
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('OK');
          }
        } else if (action === "click" && button) {
          // Клик мышью
          if (platform === "linux") {
            // 1 - левая, 2 - средняя, 3 - правая
            const btnNum = button === "left" ? 1 : button === "middle" ? 2 : button === "right" ? 3 : 1;
            exec(`xdotool click ${btnNum}`, (err) => {
              if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('xdotool click error');
              } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('OK');
              }
            });
          } else if (platform === "win32") {
            // nircmd: left, right, middle
            exec(`nircmd.exe sendmouse ${button} click`, (err) => {
              if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('nircmd click error');
              } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('OK');
              }
            });
          } else if (platform === "darwin") {
            // cliclick: c:.
            const btn = button === "left" ? "c:." : button === "right" ? "rc:." : button === "middle" ? "mc:." : "c:.";
            exec(`cliclick ${btn}`, (err) => {
              if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('cliclick click error');
              } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('OK');
              }
            });
          } else {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('OK');
          }
        } else if (action === "wheel" && direction) {
          // Колесико мыши
          if (platform === "linux") {
            // 4 - вверх, 5 - вниз
            const btnNum = direction === "up" ? 4 : 5;
            exec(`xdotool click ${btnNum}`, (err) => {
              if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('xdotool wheel error');
              } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('OK');
              }
            });
          } else if (platform === "win32") {
            // nircmd: wheel up/down
            exec(`nircmd.exe sendmouse wheel ${direction === "up" ? "up" : "down"}`, (err) => {
              if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('nircmd wheel error');
              } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('OK');
              }
            });
          } else if (platform === "darwin") {
            // cliclick: w:50 (вверх), w:-50 (вниз)
            const amount = direction === "up" ? 50 : -50;
            exec(`cliclick w:${amount}`, (err) => {
              if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('cliclick wheel error');
              } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('OK');
              }
            });
          } else {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('OK');
          }
        } else {
          // Для start/end просто отвечаем OK
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end('OK');
        }
      } catch (e) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Bad request');
      }
    });
    return;
>>>>>>> Stashed changes
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
  }
});

server.listen(4000, '0.0.0.0', () => {
  console.log('Сервер управления запущен на порту 4000');
});