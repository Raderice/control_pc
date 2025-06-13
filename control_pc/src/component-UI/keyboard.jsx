import React from "react";

const sendKeyCommand = async (key) => {
  try {
    // Для спецклавиш отправляем label как есть, для букв/цифр — в нижнем регистре
    const isAlphaNum = /^[a-zA-Z0-9]$/.test(key);
    const sendKey = isAlphaNum ? key.toLowerCase() : key;
    await fetch(`http://${window.location.hostname}:4000/key`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: sendKey }),
    });
  } catch (e) {
    alert("Ошибка отправки команды на сервер");
  }
};

const keyboardLayout = [
  // Первая строка
  [
    { label: "Esc", width: 1 },
    ...Array.from({ length: 12 }, (_, i) => ({ label: `F${i + 1}`, width: 1 })),
    { label: "PrtSc", width: 1 },
    { label: "Scroll", width: 1 },
    { label: "Pause", width: 1 },
  ],
  // Вторая строка
  [
    { label: "`", width: 1 },
    ...Array.from({ length: 9 }, (_, i) => ({ label: `${i + 1}`, width: 1 })),
    { label: "0", width: 1 },
    { label: "-", width: 1 },
    { label: "=", width: 1 },
    { label: "Backspace", width: 2 },
    { label: "Insert", width: 1 },
    { label: "Home", width: 1 },
    { label: "PgUp", width: 1 },
    { label: "NumLock", width: 1 },
    { label: "/", width: 1 },
    { label: "*", width: 1 },
    { label: "-", width: 1 },
  ],
  // Третья строка
  [
    { label: "Tab", width: 1.5 },
    ...["Q","W","E","R","T","Y","U","I","O","P"],
    { label: "[", width: 1 },
    { label: "]", width: 1 },
    { label: "\\", width: 1.5 },
    { label: "Del", width: 1 },
    { label: "End", width: 1 },
    { label: "PgDn", width: 1 },
    { label: "7", width: 1 },
    { label: "8", width: 1 },
    { label: "9", width: 1 },
    { label: "+", width: 1, height: 2 },
  ].map(k => typeof k === "string" ? { label: k, width: 1 } : k),
  // Четвертая строка
  [
    { label: "CapsLock", width: 1.75 },
    ...["A","S","D","F","G","H","J","K","L"],
    { label: ";", width: 1 },
    { label: "'", width: 1 },
    { label: "Enter", width: 2.25 },
    { label: "4", width: 1 },
    { label: "5", width: 1 },
    { label: "6", width: 1 },
  ].map(k => typeof k === "string" ? { label: k, width: 1 } : k),
  // Пятая строка
  [
    { label: "Shift", width: 2.25 },
    ...["Z","X","C","V","B","N","M"],
    { label: ",", width: 1 },
    { label: ".", width: 1 },
    { label: "/", width: 1 },
    { label: "Shift", width: 2.75 },
    { label: "↑", width: 1 },
    { label: "1", width: 1 },
    { label: "2", width: 1 },
    { label: "3", width: 1 },
    { label: "Enter", width: 1, height: 2 },
  ].map(k => typeof k === "string" ? { label: k, width: 1 } : k),
  // Шестая строка
  [
    { label: "Ctrl", width: 1.25 },
    { label: "Win", width: 1.25 },
    { label: "Alt", width: 1.25 },
    { label: "Space", width: 6.25 },
    { label: "Alt", width: 1.25 },
    { label: "Win", width: 1.25 },
    { label: "Menu", width: 1.25 },
    { label: "Ctrl", width: 1.25 },
    { label: "←", width: 1 },
    { label: "↓", width: 1 },
    { label: "→", width: 1 },
    { label: "0", width: 2 },
    { label: ".", width: 1 },
  ],
];

const Keyboard = () => (
  <div style={{ display: "inline-block", background: "#222", padding: 16, borderRadius: 12 }}>
    {keyboardLayout.map((row, i) => (
      <div key={i} style={{ display: "flex", marginBottom: 4 }}>
        {row.map((key, j) => (
          <div
            key={j}
            style={{
              width: `${key.width * 40}px`,
              height: `${(key.height || 1) * 40}px`,
              marginRight: 4,
              background: "#1976d2",
              color: "#fff",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              border: "2px solid #1976d2",
              boxSizing: "border-box",
              userSelect: "none",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onClick={() => sendKeyCommand(key.label)}
          >
            {key.label}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default Keyboard;