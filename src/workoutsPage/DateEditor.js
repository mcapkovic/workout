import React from "react";
import { DatePicker, TextBox, Button } from "../common";

/**
 * not finished
 */
function DateEditor(props) {
  const [count, setCount] = React.useState(0);

  function updateCount(e) {
    const newValue = Number(e.target.value);
    console.log(newValue);
    console.log(isNaN(newValue));
    console.log(Number.isInteger(newValue));

    if (isNaN(newValue)) return;
    if (!Number.isInteger(newValue)) return;

    setCount(newValue);
  }

  return (
    <div className="date-editor">
      <DatePicker />
      <TextBox value={count} onChange={updateCount} />
      <Button> Save</Button>
    </div>
  );
}

export default DateEditor;
