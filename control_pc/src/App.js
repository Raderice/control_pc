import React, { useState } from "react";
import Header from "./component-UI/header";
import InputSender from "./component-UI/InputSender";
import Keyboard from "./component-UI/keyboard";
import PlayPauseButton from "./component-UI/play";
import Touchpad from "./component-UI/touchpad";

// Карта компонентов для вывода
const COMPONENTS = {
  input: <InputSender />,
  keyboard: <Keyboard />,
  play: <PlayPauseButton />,
  touchpad: <Touchpad />,
};

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div
      className="App"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)",
        color: "#b3cfff",
        fontFamily: "'Orbitron', 'Segoe UI', Arial, sans-serif",
        letterSpacing: "0.05em",
        padding: 0,
        margin: 0,
      }}
    >
      <Header selected={selected} setSelected={setSelected} />
      {/* Выводим только выбранный компонент под header */}
      <div style={{ minHeight: 40 }} />
      {selected && (
        <div
          style={{
            margin: "24px auto",
            background: "rgba(31, 64, 104, 0.85)",
            borderRadius: 14,
            boxShadow: "0 4px 24px 0 #0f2027cc",
            padding: "24px 18px",
            maxWidth: 700,
            border: "1.5px solid #1976d2",
            transition: "box-shadow 0.2s, background 0.2s",
          }}
        >
          {COMPONENTS[selected]}
        </div>
      )}
    </div>
  );
}

export default App;
