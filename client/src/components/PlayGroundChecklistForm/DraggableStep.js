import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useDrag, useDrop } from "react-dnd";

import PlaygroundConditions from "./PlaygroundConditions";
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

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "step",
      item: { id: step._id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [step._id, index]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "step",
      canDrop: (item) => item.id !== step._id,
      hover: (item) => {
        if (!item) {
          return;
        }

        const dragId = item.id;
        const dropId = step._id;

        if (dragId === dropId) {
          return;
        }

        moveStep(dragId, dropId);
        item.index = index;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [step._id, index, moveStep]
  );

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
            <PlaygroundConditions
              steps={steps}
              currentStepIndex={index}
              conditions={
                step.conditions || {
                  AND: [],
                  IF: [],
                  NAND: [],
                  NOR: [],
                  NOT: [],
                  OR: [],
                  XNOR: [],
                  XOR: [],
                }
              }
              onChange={handleStepsChange}
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
