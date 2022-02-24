import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import DropDownPicker from "react-native-dropdown-picker";

function DifficultyLevel(props) {
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    { label: "Level 1", value: 1 },
    { label: "Level 2", value: 2 },
  ]);
  // useEffect(() => {}, []);

  
  // function handleDifficultySelect(e) {
  //   e.preventDefault();
  //   props.passToMain(value);
  //   props.selectedDifficulty(value);
  // }

  return (
    <DropDownPicker
      open={open}
      value={props.difficultyValue}
      items={items}
      setOpen={setOpen}
      setValue={props.handleSetDifficulty}
      setItems={setItems}
    />
  );
}

export default DifficultyLevel;
