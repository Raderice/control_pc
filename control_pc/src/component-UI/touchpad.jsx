import React, { useRef } from "react";

const sendTouchCommand = async (dx, dy, action) => {
  try {
    await fetch(`http://${window.location.hostname}:4000/touchpad`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dx, dy, action }),
    });
  } catch (e) {
    // Можно добавить обработку ошибок
  }
};

const sendMouseButton = async (button) => {
  try {
    await fetch(`http://${window.location.hostname}:4000/touchpad`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "click", button }),
    });
  } catch (e) {}
};

const sendWheel = async (direction) => {
  try {
    await fetch(`http://${window.location.hostname}:4000/touchpad`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "wheel", direction }),
    });
  } catch (e) {}
};

const Touchpad = () => {
  const lastPos = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    lastPos.current = { x: touch.clientX, y: touch.clientY };
    sendTouchCommand(0, 0, "start");
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const dx = touch.clientX - lastPos.current.x;
    const dy = touch.clientY - lastPos.current.y;
    lastPos.current = { x: touch.clientX, y: touch.clientY };
    sendTouchCommand(dx, dy, "move");
  };

  const handleTouchEnd = () => {
    sendTouchCommand(0, 0, "end");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          width: 300,
          height: 300,
          border: "2px solid #1976d2",
          borderRadius: 8,
          background: "#f0f0f0",
          margin: "24px 0 12px 0",
          touchAction: "none",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "#1976d2", fontSize: 22 }}>Тачпад</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 10 }}>
        <button
          style={{
            width: 60,
            height: 40,
            borderRadius: 8,
            background: "#1976d2",
            color: "#fff",
            fontSize: 18,
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => sendMouseButton("left")}
        >
          ЛКМ
        </button>
        <button
          style={{
            width: 60,
            height: 40,
            borderRadius: 8,
            background: "#1976d2",
            color: "#fff",
            fontSize: 18,
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => sendMouseButton("middle")}
        >
          СКМ
        </button>
        <button
          style={{
            width: 60,
            height: 40,
            borderRadius: 8,
            background: "#1976d2",
            color: "#fff",
            fontSize: 18,
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => sendMouseButton("right")}
        >
          ПКМ
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
        <button
          style={{
            width: 48,
            height: 36,
            borderRadius: 8,
            background: "#1976d2",
            color: "#fff",
            fontSize: 22,
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => sendWheel("up")}
          title="Прокрутка вверх"
        >
          ↑
        </button>
        <button
          style={{
            width: 48,
            height: 36,
            borderRadius: 8,
            background: "#1976d2",
            color: "#fff",
            fontSize: 22,
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => sendWheel("down")}
          title="Прокрутка вниз"
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default Touchpad;