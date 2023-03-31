import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useDrag, useDrop } from "react-dnd";

import ValidConditionalValueInput from "./ValidConditionalValueInput";
import ValidConditionTypeSelect from "./ValidConditionTypeSelect";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const DraggableStep = ({
  step,
  steps,
  index,
  handleStepsChange,
  deleteStep,
  moveStep,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [, drag] = useDrag(() => ({
    type: "step",
    item: { index },
  }));

  const [, drop] = useDrop(() => ({
    accept: "step",
    drop(item) {
      const dragIndex = item.index;
      const dropIndex = index;
      moveStep(dragIndex, dropIndex);
    },
  }));

  return (
    <div ref={(node) => drag(drop(node))}>
      <Grid item xs={12} key={index}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
          sx={{ mb: 1, marginLeft: 2, marginBottom: "16px" }}
        >
          {step.text || `Step ${index + 1}`}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby={`step-dialog-title-${index}`}
        >
          <DialogTitle id={`step-dialog-title-${index}`}>
            Step {index + 1}
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6">Step {index + 1}</Typography>
            <TextField
              id={`text-${index}`}
              name="text"
              value={step.text || ""}
              onChange={(e) => handleStepsChange(e, index)}
              fullWidth
              size="small"
            />
            <ValidConditionTypeSelect
              id="condition-type"
              steps={steps}
              currentStepIndex={index}
              value={step.conditionType || ""}
              onChange={handleStepsChange}
              size="small"
            />
            <ValidConditionalValueInput
              id="condition-value"
              steps={steps}
              currentStepIndex={index}
              value={step.conditionValue || []}
              onChange={(e) => handleStepsChange(e, index)}
              size="small"
            />
            <Box mt={2}>
              <Button onClick={() => deleteStep(index)} size="small">
                Delete
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
};

export default DraggableStep;
