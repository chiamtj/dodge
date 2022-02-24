import { useState, useEffect } from "react";
import { View, Picker, StyleSheet } from "react-native";

function difficultyLevel(props) {

    const [selectedValue, setSelectedValue] = useState("");

  async function retrieveDifficultyLevel() {
    return (
        <View style={styles.container}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={handleDifficultySelect}
        >
          <Picker.Item label="Java" value={1} />
          <Picker.Item label="JavaScript" value={2} />
        </Picker>
      </View>
    );
  }

  function handleDifficultySelect(e) {
    e.preventDefault();
    props.selectedDifficulty(e.target.value)
    setSelectedValue(e.target.value)
    props.passToMain(e.target.value);
  }

  return <>{retrieveDifficultyLevel()}</>;
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      alignItems: "center"
    }
  });
export default difficultyLevel;