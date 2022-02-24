import React from "react";
import World from "./src/World";
import Difficulty from "./src/components/Difficulty";
import { useState, useEffect } from "react";

export default function App() {
  const [DifficultySelected, selectedDifficulty] = useState("");

  function handleDifficultySelect(updateDifficulty) {
    selectedDifficulty(updateDifficulty);
  }
  return (
    <>
      <Difficulty passToMain={handleDifficultySelect} selectedDifficulty={DifficultySelected} />
      <World gravity= {DifficultySelected} />
    </>
  );
}

// export default App;
