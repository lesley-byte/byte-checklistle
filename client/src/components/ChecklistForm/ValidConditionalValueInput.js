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
    .map((step) => ({ id: step._id || step.tempId, text: step.text }));

  const handleChange = (event) => {
    const newSelectedValues = event.target.value;

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

    onChange({
      ...event,
      target: { ...event.target, value: newSelectedValues },
    });
  };

  const renderSelectedText = (selected) => {
    if (selected.length === 0) {
      return <em>Select a value</em>;
    }

    return selected
      .map((selectedId) => {
        const step = validValues.find((step) => step.id === selectedId);
        return step ? step.text.substring(0, 15) : "";
      })
      .join(", ");
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
        renderValue={renderSelectedText}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem disabled value="">
          <em>Select a value</em>
        </MenuItem>
        <MenuItem value="none">None</MenuItem>
        {validValues.map((val) => (
          <MenuItem key={val.id} value={val.id}>
            {val.text.substring(0, 15)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ValidConditionalValueInput;
