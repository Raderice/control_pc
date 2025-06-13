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
        margin: "24px 0",
        touchAction: "none",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ color: "#1976d2", fontSize: 22 }}>Тачпад</span>
    </div>
  );
};

export default Touchpad;