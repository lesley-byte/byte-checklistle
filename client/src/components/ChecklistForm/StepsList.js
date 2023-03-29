import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";

import ValidConditionalValueInput from "./ValidConditionalValueInput";

import ValidConditionTypeSelect from "./ValidConditionTypeSelect";

const StepsList = ({
  steps,
  handleStepsChange,
  deleteStep,
  moveStepUp,
  moveStepDown,
}) => {
  return (
    <div id="step">
      {steps.map((step, index) => (
        <Grid item xs={12} key={index}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Step {index + 1}</Typography>
            <TextField
              id={`text-${index}`}
              name="text"
              value={step.text || ""}
              onChange={(e) => handleStepsChange(e, index)}
              fullWidth
            />
            <ValidConditionTypeSelect
              id="condition-type"
              steps={steps}
              currentStepIndex={index}
              value={step.conditionType || ""}
              onChange={handleStepsChange}
            />
            <ValidConditionalValueInput

              id="condition-value"
              steps={steps}
              currentStepIndex={index}
              value={step.conditionValue || []}
              onChange={(e) => handleStepsChange(e, index)}
            />
            <Button onClick={() => moveStepUp(index)}>Move Up</Button>
            <Button onClick={() => moveStepDown(index)}>Move Down</Button>
            <Button onClick={() => deleteStep(index)}>Delete</Button>
          </Box>
        </Grid>
      ))}
    </div>
  );
};

export default StepsList;
