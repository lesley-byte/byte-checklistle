import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import ValidConditionalValueInput from "./ValidConditionalValueInput";
import ValidConditionTypeSelect from "./ValidConditionTypeSelect";

const DraggableStep = ({
  step,
  steps,
  index,
  handleStepsChange,
  deleteStep,
  moveStep,
  checklist, // add checklist prop here
}) => {
  console.log("In src/components/index DraggableStep.checklist:", checklist);
  console.log("In src/components/index DraggableStep.step:", step);
  console.log("In src/components/index DraggableStep.index:", index);
  console.log(
    "In src/components/index DraggableStep.handleStepsChange:",
    handleStepsChange
  );
  console.log("In src/components/index DraggableStep.deleteStep:", deleteStep);
  console.log("In src/components/index DraggableStep.moveStep:", moveStep);

  const [, drag] = useDrag(() => ({
    type: "step",
    item: { index },
  }));

  const [, drop] = useDrop(() => ({
    accept: "step",
    hover: (item) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveStep(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  }));

  return (
    <div ref={(node) => drag(drop(node))}>
      <Grid item xs={12} key={index}>
        <Box sx={{ mb: 2, marginLeft: 2 }}>
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

          <Button onClick={() => deleteStep(index)}>Delete</Button>
        </Box>
      </Grid>
    </div>
  );
};

export default DraggableStep;
