import React, { useRef } from "react";

const sendKeyCommand = async (key) => {
  try {
    await fetch(`http://${window.location.hostname}:4000/key`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
  } catch (e) {
    // Можно добавить обработку ошибок
  }
};

const InputSender = () => {
  const prevValue = useRef("");

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length > prevValue.current.length) {
      const newChar = value.slice(-1);
      sendKeyCommand(newChar);
    } else if (value.length < prevValue.current.length) {
      sendKeyCommand("Backspace");
    }
    prevValue.current = value;
  };

  const handleBackspace = () => {
    sendKeyCommand("Backspace");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
      <input
        type="text"
        placeholder="Введите текст для отправки на ПК"
        onChange={handleChange}
        style={{
          width: "100%",
          maxWidth: 400,
          fontSize: 20,
          padding: 8,
          borderRadius: 8,
          border: "1px solid #1976d2",
          outline: "none",
        }}
      />
      <button
        onClick={handleBackspace}
        style={{
          marginLeft: 8,
          padding: "8px 16px",
          fontSize: 18,
          borderRadius: 8,
          border: "1px solid #1976d2",
          background: "#1976d2",
          color: "#fff",
          cursor: "pointer",
        }}
        title="Backspace"
      >
        ⌫
      </button>
    </div>
  );
};

export default InputSender;