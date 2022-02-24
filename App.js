import React from "react";
import World from "./src/World";
import DifficultyLevel from "./src/components/Difficulty";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [DifficultySelected, selectedDifficulty] = useState(1);
  const [difficulty, setDifficulty] = useState(1);

  useEffect(() => {
  console.log(difficulty)
  }, [difficulty]);

  function handleDifficultySelect(updateDifficulty) {
    selectedDifficulty(updateDifficulty);
  }
  
  return (
    <View style={styles.container}>
      <DifficultyLevel
        difficultyValue={difficulty}
        handleSetDifficulty={setDifficulty}
      />
      <World gravity={difficulty} />
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea"
  }})
// export default App;
