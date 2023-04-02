import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CHECKLIST } from "../../utils/mutations";

import { QUERY_CHECKLIST, QUERY_CHECKLISTS } from "../../utils/queries";

import { useNavigate } from "react-router-dom";
import { Grid, Typography, Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import colors from "../../assets/styles/colors";

import useIntro from "./useIntro";
import StepsList from "./StepsList";
import Modal from "./Modal";
import useSteps from "./useSteps";
import AuthService from "../../utils/auth";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ChecklistForm = ({ checklistId, checklist }) => {
  useIntro();
  console.log("In src/components/index checklist:", checklist);
  console.log("In src/components/index checklistId:", checklistId);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [title, setTitle] = useState(checklist.title);

  const {
    steps,
    handleStepsChange,
    addStep,
    deleteStep,
    validateCondition,
    moveStep,
  } = useSteps(
    checklist.steps.map((step) => ({
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
    })),
    setIsModalOpen,
    setModalText
  );
  
  console.log(steps);

  const [updateChecklist] = useMutation(UPDATE_CHECKLIST);

  const handleTitleChange = (e) => {
    console.log(
      "In src/components/index handleTitleChange.handleTitleChange e.target.value:",
      e.target.value
    );
    console.log("handleTitleChange value: ", e.target.value);

    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log(steps);

    e.preventDefault();

    if (!validateCondition(steps)) {
      return;
    }

    try {
      const removeTypename = (input) => {
        if (Array.isArray(input)) {
          return input.map(item => removeTypename(item));
        } else if (input !== null && typeof input === 'object') {
          const newInput = {};
          for (const key in input) {
            if (key !== '__typename') {
              newInput[key] = removeTypename(input[key]);
            }
          }
          return newInput;
        }
        return input;
      };
      
      console.log("steps before cleaning:", steps);
      const cleanedSteps = steps.map(({ __typename, tempId, _id, conditions, ...step }, index) => ({
        ...step,
        _id: _id,
        position: index + 1,
        conditions: removeTypename(conditions),
      }));

      console.log("cleanedSteps:", cleanedSteps);

      const user = AuthService.getProfile();
      const userId = user.id;

      console.log("mutation variables:", {
        checklistId,
        title,
        steps: cleanedSteps,
        userId,
      });

      console.log("steps: ", steps);
      console.log("cleanedSteps: ", cleanedSteps);

      await updateChecklist({
        variables: { checklistId, title, steps: cleanedSteps, userId },
        refetchQueries: [
          { query: QUERY_CHECKLISTS },
          { query: QUERY_CHECKLIST, variables: { checklistId } },
        ],
      });
      console.log("The mutation was successful!");
      setTitle("");

      navigate("/checklistManagement");
    } catch (err) {
      console.error("Error submitting mutation:", err);
    }
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

export default ChecklistForm;

// Path: client\src\components\ChecklistForm\index.js
