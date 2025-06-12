import React, { useState } from "react";

const PlayPauseButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = async () => {
    const command = isPlaying ? "pause" : "play";
    try {
      await fetch(`http://${window.location.hostname}:4000/${command}`, {
        method: "POST",
      });
      setIsPlaying((prev) => !prev);
    } catch (error) {
      alert("Ошибка отправки команды на сервер");
    }
  };

  const handleOpenYoutube = async () => {
    try {
      await fetch(`http://${window.location.hostname}:4000/open-youtube`, {
        method: "POST",
      });
    } catch (error) {
      alert("Ошибка отправки команды на сервер");
    }
  };

  const handleVolume = async (direction) => {
    try {
      await fetch(
        `http://${window.location.hostname}:4000/volume-${direction}`,
        {
          method: "POST",
        }
      );
    } catch (error) {
      alert("Ошибка отправки команды на сервер");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <button
        style={{
          width: "120px",
          height: "48px",
          borderRadius: "8px",
          background: "#1976d2",
          color: "#fff",
          fontSize: "20px",
          border: "none",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onClick={handleClick}
      >
        {isPlaying ? "Pause" : "Пуск"}
      </button>
      <button
        style={{
          width: "120px",
          height: "48px",
          borderRadius: "8px",
          background: "#e53935",
          color: "#fff",
          fontSize: "20px",
          border: "none",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onClick={handleOpenYoutube}
      >
        Открыть YouTube
      </button>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "8px",
            background: "#43a047",
            color: "#fff",
            fontSize: "24px",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onClick={() => handleVolume("down")}
        >
          -
        </button>
        <button
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "8px",
            background: "#43a047",
            color: "#fff",
            fontSize: "24px",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onClick={() => handleVolume("up")}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default PlayPauseButton;