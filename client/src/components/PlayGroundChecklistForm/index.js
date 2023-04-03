import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import colors from "../../assets/styles/colors";

import useIntro from "../ChecklistForm/useIntro";
import StepsList from "./StepsList";
import Modal from "../ChecklistForm/Modal";
import useSteps from "./useSteps";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  getChecklistsFromLocalStorage,
  saveChecklistToLocalStorage,
  updateChecklistInLocalStorage,
  getChecklistFromLocalStorage,
  updateChecklistsInLocalStorage,
} from "../../utils/localStorageUtils";

const PlayGroundChecklistForm = ({
  checklistId,
  checklist: providedChecklist = { title: "", steps: [] },
}) => {
  useIntro();

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [title, setTitle] = useState(providedChecklist.title || "");

  const [isLoading, setIsLoading] = useState(!providedChecklist);

  const mappedSteps = providedChecklist.steps
    ? providedChecklist.steps.map((step) => ({
        ...step,
        conditions: step.conditions || {
          AND: [],
          IF: [],
          NAND: [],
          NOR: [],
          NOT: [],
          OR: [],
          XNOR: [],
          XOR: [],
        },
      }))
    : [];

  const {
    steps,
    handleStepsChange,
    addStep,
    deleteStep,
    validateCondition,
    moveStep,
  } = useSteps(mappedSteps, setIsModalOpen, setModalText);

  const handleTitleChange = (e) => {
    console.log("Title changed:", e.target.value);
    setTitle(e.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    console.log("Steps:", steps);

    if (!validateCondition(steps)) {
      return;
    }

    const cleanedSteps = steps.map(
      ({ __typename, _id, conditions, ...step }, index) => ({
        ...step,
        _id: _id,
        position: index + 1,
        conditions,
      })
    );

    console.log("Cleaned steps:", cleanedSteps);

    const savedChecklists = getChecklistsFromLocalStorage();

    const newChecklist = {
      id: checklistId,
      title,
      steps: cleanedSteps,
    };

    // Check if the checklist already exists in localStorage
    const existingChecklist = savedChecklists.find(
      (cl) => cl._id === parseInt(checklistId)
    );

    if (existingChecklist) {
      // Update the existing checklist
      existingChecklist.title = newChecklist.title;
      existingChecklist.steps = newChecklist.steps;
    } else {
      // Create a new checklist
      const newChecklistId = Math.floor(Math.random() * 100000);
      newChecklist._id = newChecklistId;
      savedChecklists.push(newChecklist);
    }

    // Save the updated list of checklists
    updateChecklistsInLocalStorage(savedChecklists);
    navigate("/playground/checklistManagement")
    console.log("Data saved to localStorage:", savedChecklists);
  };

  return (
    <div
      className="checklist-form"
      style={{
        height: "100%",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Title</Typography>
              <TextField
                id="title"
                name="title"
                value={title}
                onChange={handleTitleChange}
                fullWidth
              />
            </Box>
          </Grid>
          <DndProvider backend={HTML5Backend}>
            <StepsList
              steps={steps}
              handleStepsChange={handleStepsChange}
              deleteStep={deleteStep}
              moveStep={moveStep} // replace moveStepUp and moveStepDown with moveStep
            />
          </DndProvider>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Button
                id="add-step"
                variant="contained"
                type="button"
                onClick={addStep}
                sx={{
                  backgroundColor: colors.teal,
                  color: colors.ice,
                  "&:hover": {
                    backgroundColor: colors.lightBlue,
                    color: colors.dark,
                  },
                }}
              >
                Add Step
              </Button>
              <Button
                id="save"
                variant="contained"
                type="submit"
                style={{ marginLeft: "10px" }}
                sx={{
                  backgroundColor: colors.teal,
                  color: colors.ice,
                  "&:hover": {
                    backgroundColor: colors.lightBlue,
                    color: colors.dark,
                  },
                }}
              >
                Save Changes
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalText={modalText}
      />
    </div>
  );
};

export default PlayGroundChecklistForm;
