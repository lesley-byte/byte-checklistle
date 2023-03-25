import React from "react";
import { MenuItem, Select, OutlinedInput, FormControl } from "@mui/material";

const ValidConditionValueInput = ({
  steps,
  currentStepIndex,
  value,
  onChange,
}) => {
  const validValues = steps
    .filter((_, index) => index !== currentStepIndex)
    .map((step) => step.position.toString());

  const handleChange = (event) => {
    const newSelectedValues = event.target.value;

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

    onChange({
      ...event,
      target: { ...event.target, value: newSelectedValues },
    });
  };

  return (
    <FormControl fullWidth variant="outlined">
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

export default ValidConditionValueInput;
