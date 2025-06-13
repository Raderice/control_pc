import React, { useState, useRef, useEffect } from "react";

const COMPONENTS = {
  input: { label: "Текстовое поле", icon: "⌨️" },
  keyboard: { label: "Клавиатура", icon: "🖮" },
  play: { label: "Плеер", icon: "🎵" },
  touchpad: { label: "Тачпад", icon: "🖱️" },
};

const Header = ({ selected, setSelected }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Закрытие меню при клике вне меню
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Клик по пункту меню: выбрать или скрыть компонент, закрыть меню
  const handleSelect = (key) => {
    setSelected((prev) => (prev === key ? null : key));
    setOpen(false);
  };

  return (
    <div
      style={{
        width: "100%",
        background: "linear-gradient(90deg, #162447 0%, #1f4068 100%)",
        color: "#b3cfff",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 12px 0 #0f2027cc",
        borderBottom: "2px solid #1976d2",
        fontFamily: "'Orbitron', 'Segoe UI', Arial, sans-serif",
        letterSpacing: "0.07em",
      }}
    >
      <div
        style={{
          padding: "16px 24px",
          fontSize: 26,
          cursor: "pointer",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          fontWeight: 700,
          textShadow: "0 2px 8px #0f2027",
          position: "relative",
        }}
        onClick={() => setOpen((v) => !v)}
      >
        <span style={{ marginRight: 10 }}>☰ Меню</span>
        {selected && (
          <span
            style={{
              marginLeft: 8,
              background: "#1976d2",
              color: "#fff",
              borderRadius: "50%",
              width: 28,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
              fontWeight: 600,
              boxShadow: "0 0 8px #1976d2",
            }}
            title="Панель выбрана"
          >
            1
          </span>
        )}
      </div>
      {open && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            left: 0,
            top: "100%",
            background: "linear-gradient(90deg, #1b2a49 0%, #23395d 100%)",
            color: "#b3cfff",
            boxShadow: "0 4px 16px 0 #0f2027cc",
            zIndex: 1000,
            minWidth: 240,
            borderRadius: "0 0 12px 12px",
            padding: "8px 0",
            border: "1px solid #1976d2",
            maxWidth: "95vw",
          }}
        >
          {Object.entries(COMPONENTS).map(([key, { label, icon }]) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              style={{
                width: "100%",
                padding: "14px 28px",
                background:
                  selected === key
                    ? "linear-gradient(90deg, #1976d2 0%, #0f2027 100%)"
                    : "transparent",
                color: selected === key ? "#fff" : "#b3cfff",
                border: "none",
                textAlign: "left",
                fontSize: 19,
                cursor: "pointer",
                outline: "none",
                fontWeight: 600,
                letterSpacing: "0.06em",
                transition: "background 0.2s, color 0.2s",
                borderBottom: "1px solid #23395d",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
              tabIndex={0}
            >
              <span
                style={{
                  fontSize: 22,
                  opacity: selected === key ? 1 : 0.7,
                  transition: "opacity 0.2s",
                }}
              >
                {icon}
              </span>
              {label}
              <span style={{ marginLeft: "auto" }}>
                <input
                  type="radio"
                  checked={selected === key}
                  readOnly
                  style={{
                    accentColor: "#1976d2",
                    width: 18,
                    height: 18,
                    marginRight: 2,
                  }}
                  tabIndex={-1}
                />
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;