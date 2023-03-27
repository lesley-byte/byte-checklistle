import React, { useState } from "react";
import { Button, Grid, Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

import ValidConditionValueInput from "./ValidConditionalValueInput";
import ValidConditionTypeSelect from "./ValidConditionTypeSelect";

const ChecklistStep = ({
  step,
  index,
  onStepChange,
  onDeleteStep,
  onMoveStepUp,
  onMoveStepDown,
}) => {
  const handleStepChange = (e) => {
    const { name, value } = e.target;
    onStepChange(index, name, value);
  };

  return (
    <Grid item xs={12} key={index}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Step {index + 1}</Typography>
        <TextField
          id={`text-${index}`}
          name="text"
          value={step.text || ""}
          onChange={handleStepChange}
          fullWidth
        />
        <ValidConditionTypeSelect
          steps={step}
          currentStepIndex={index}
          value={step.conditionType || ""}
          onChange={handleStepChange}
        />
        <ValidConditionValueInput
          steps={step}
          currentStepIndex={index}
          value={step.conditionValue || []}
          onChange={(e) => handleStepChange(e, index)}
        />
        <Button onClick={() => onMoveStepUp(index)}>Move Up</Button>
        <Button onClick={() => onMoveStepDown(index)}>Move Down</Button>
        <Button onClick={() => onDeleteStep(index)}>Delete</Button>
      </Box>
    </Grid>
  );
};

export default ChecklistStep;
