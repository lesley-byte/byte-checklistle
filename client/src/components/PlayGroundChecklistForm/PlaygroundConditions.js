import React from "react";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const PlaygroundConditions = ({
  steps,
  currentStepIndex,
  conditions,
  onChange,
}) => {
  const handleConditionChange = (e, conditionType) => {
    const newConditions = { ...conditions };
    newConditions[conditionType] = Array.isArray(e.target.value)
      ? e.target.value
      : [e.target.value];
    onChange(
      { target: { name: "conditions", value: newConditions } },
      currentStepIndex
    );
  };

  const renderConditionSelect = (conditionType) => {
    const otherSteps = steps.filter((_, index) => index !== currentStepIndex);

    return (
      <FormControl
        key={conditionType}
        fullWidth
        variant="outlined"
        margin="normal"
      >
        <InputLabel
          id={`${steps[currentStepIndex]._id}-${conditionType}-select-label`}
        >
          {conditionType}
        </InputLabel>
        <Select
          labelId={`${steps[currentStepIndex]._id}-${conditionType}-select-label`}
          id={`${steps[currentStepIndex]._id}-${conditionType}-select`}
          multiple
          value={
            Array.isArray(conditions[conditionType])
              ? conditions[conditionType]
              : []
          }
          onChange={(e) => handleConditionChange(e, conditionType)}
          label={conditionType}
        >
          {otherSteps.map((otherStep) => (
            <MenuItem key={otherStep._id} value={otherStep._id}>
              {`Step ${otherStep.text}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <div>
      {Object.keys(conditions).map((conditionType) =>
        renderConditionSelect(conditionType)
      )}
    </div>
  );
};

export default PlaygroundConditions;
