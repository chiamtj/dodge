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
   setDifficulty(updateDifficulty);
  }
  
  return (
    <View style={styles.container}>
      <DifficultyLevel
        difficultyValue={difficulty}
        handleSetDifficulty={handleDifficultySelect}
      />
      <World gravity={difficulty} />
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft:0,
    paddingRight:0,
    paddingTop:50,
    backgroundColor: "#eaeaea"
  }})
// export default App;
