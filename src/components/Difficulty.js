import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import DropDownPicker from "react-native-dropdown-picker";

function difficultyLevel(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Level 1", value: 1 },
    { label: "Level 2", value: 2 },
  ]);
  useEffect(() => {}, []);

  async function retrieveDifficultyLevel() {
    return (
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={handleDifficultySelect}
        setItems={setItems}
      />
    );
  }

  function handleDifficultySelect(e) {
    e.preventDefault();
    props.passToMain(value);
    props.selectedDifficulty(value);
  }

  return <>{retrieveDifficultyLevel()}</>;
}

export default difficultyLevel;
