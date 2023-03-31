import React from "react";
import { MenuItem, Select, OutlinedInput, FormControl } from "@mui/material";

const ValidConditionalValueInput = ({
  steps,
  currentStepIndex,
  value,
  onChange,
}) => {
  if (!Array.isArray(steps)) {
    return null;
  }

  const validValues = steps
    .filter((_, index) => index !== currentStepIndex)
    .map((step) => step.position.toString());

  const handleChange = (event) => {
    console.log("event.target.value", event.target.value);
    const newSelectedValues = event.target.value;
    console.log("newSelectedValues", newSelectedValues);

    // Make sure newSelectedValues is an array
    if (!Array.isArray(newSelectedValues)) {
      return;
    }

    if (newSelectedValues.length < value.length) {
      const deselectedValue = value.find(
        (val) => !newSelectedValues.includes(val)
      );
      if (deselectedValue) {
        const index = value.indexOf(deselectedValue);
        const newValue = [...value];
        newValue.splice(index, 1);
        onChange({ ...event, target: { ...event.target, value: newValue } });
        return;
      }
    }

    // Remove any object ids from the array before updating state
    const newValue = newSelectedValues.filter(
      (val) => !val.includes("ObjectId")
    );

    onChange({
      ...event,
      target: { ...event.target, value: newValue },
    });
  };

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <Select
        name="conditionValue"
        multiple
        displayEmpty
        value={value}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Select a value</em>;
          }
          return selected.join(", ");
        }}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem disabled value="">
          <em>Select a value</em>
        </MenuItem>
        <MenuItem value="none">None</MenuItem> {/* Add this line */}
        {validValues.map((val) => (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ValidConditionalValueInput;

// Path: client\src\components\ChecklistForm\ValidConditionalValueInput.js
