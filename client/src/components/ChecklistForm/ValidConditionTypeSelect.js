import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ValidConditionTypeSelect = ({
  currentStepIndex,
  value,
  onChange,
}) => {
  const handleConditionTypeChange = (e) => {
    onChange(e, currentStepIndex);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={`conditionType-label-${currentStepIndex}`}>
        Condition Type
      </InputLabel>
      <Select
        labelId={`conditionType-label-${currentStepIndex}`}
        id={`conditionType-${currentStepIndex}`}
        name="conditionType"
        value={value || ""}
        onChange={handleConditionTypeChange}
      >
        <MenuItem value="">N/A</MenuItem>
        <MenuItem value="AND">AND</MenuItem>
        <MenuItem value="OR">OR</MenuItem>
        <MenuItem value="IF">IF</MenuItem>
        <MenuItem value="NOT">NOT</MenuItem>
        <MenuItem value="NOR">NOR</MenuItem>
        <MenuItem value="NAND">NAND</MenuItem>
        <MenuItem value="XOR">XOR</MenuItem>
        <MenuItem value="XNOR">XNOR</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ValidConditionTypeSelect;

// path: client\src\components\ChecklistForm\ValidConditionTypeSelect.js
