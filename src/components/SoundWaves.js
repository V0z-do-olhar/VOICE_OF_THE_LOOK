import React from "react";
import "./SoundWave.css"; // Estilo das ondas sonoras

const SoundWaves = ({ volume }) => {
  // Volume será um valor entre 0 e 1, e vamos ajustá-lo para definir a altura das barras
  const numBars = 5; // Número de barras representando as ondas
  const bars = [];

  for (let i = 0; i < numBars; i++) {
    const barHeight = Math.max(1, volume * 100 * (1 - i / numBars)); // Ajusta a altura da barra com base no volume
    bars.push(
      <div
        key={i}
        className="sound-wave-bar"
        style={{
          height: `${barHeight}%`,
          backgroundColor: `#fff, ${1 - i / numBars})`, // Diminui a opacidade conforme a barra
          width: `${100 / numBars}%`, // Distribui uniformemente as barras
        }}
      />
    );
  }

  return <div className="sound-wave-container">{bars}</div>;
};

export default SoundWaves;
