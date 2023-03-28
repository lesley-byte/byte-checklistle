import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CHECKLIST } from "../utils/mutations";
import { QUERY_CHECKLIST, QUERY_CHECKLISTS } from "../utils/queries";
import { useNavigate } from "react-router-dom";
import { FormControl, Button, Dialog } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import ValidConditionValueInput from "./ValidConditionalValueInput";
import ValidConditionTypeSelect from "./ValidConditionTypeSelect";
import AuthService from "../utils/auth";
import introJs from "intro.js";
import "intro.js/minified/introjs.min.css";

const ChecklistForm = ({ checklistId, checklist }) => {
  useEffect(() => {
    const editorTutorialShown = sessionStorage.getItem("editorTutorialShown");

    if (!editorTutorialShown) {
      const intro = introJs();

      intro.setOptions({
        steps: [
          {
            element: "#title",
            intro: "Here you can edit the title of the checklist.",
            position: "bottom",
          },
          {
            element: "#step",
            intro: "Here you can edit the steps of the checklist.",
            position: "bottom",
          },
          {
            element: "#condition-type",
            intro: "Here you can edit the condition type of the step.",
            position: "bottom",
          },
          {
            element: "#condition-value",
            intro: "Here you can edit the condition value of the step.",
            position: "bottom",
          },
          {
            element: "#save",
            intro: "Here you can save the checklist.",
            position: "bottom",
          },
        ],
      });

      intro.start();

      sessionStorage.setItem("editorTutorialShown", "true");
    }
  }, []);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const [title, setTitle] = useState(checklist.title);
  const [steps, setSteps] = useState(
    checklist.steps.map((step) => ({
      ...step,
      conditionValue: step.conditionValue || [],
    }))
  );

  const openModal = (text) => {
    setModalText(text);
    setIsModalOpen(true);
  };

  const validateCondition = (steps) => {
    for (const step of steps) {
      const { conditionType, conditionValue } = step;

      if (
        (conditionType === "IF" || conditionType === "NOT") &&
        conditionValue.length !== 1
      ) {
        openModal(
          "Please use exactly one value for conditionValue with IF or NOT operators."
        );
        return false;
      }

      if (
        (conditionType === "XOR" || conditionType === "XNOR") &&
        conditionValue.length !== 2
      ) {
        openModal(
          "Please use exactly two values for conditionValue with XOR or XNOR operators."
        );
        return false;
      }
    }

    return true;
  };

  const [updateChecklist, { data, loading, error }] =
    useMutation(UPDATE_CHECKLIST);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleStepsChange = (e, index) => {
    const newSteps = [...steps];

    if (e.target.name === "conditionValue") {
      newSteps[index] = {
        ...newSteps[index],
        conditionValue: e.target.value,
      };
    } else {
      newSteps[index] = {
        ...newSteps[index],
        [e.target.name]: e.target.value,
        position: index + 1,
      };
    }

    setSteps(newSteps);
  };

  const addStep = () => {
    setSteps([...steps, { text: "", position: steps.length + 1 }]);
  };

  const deleteStep = (indexToDelete) => {
    const newSteps = steps.filter((_, index) => index !== indexToDelete);
    setSteps(newSteps);
  };

  const moveStepUp = (index) => {
    if (index === 0) return; // Already at the top

    const newSteps = [...steps];
    const temp = newSteps[index - 1];
    newSteps[index - 1] = { ...newSteps[index], position: index };
    newSteps[index] = { ...temp, position: index + 1 };

    setSteps(newSteps);
  };

  const moveStepDown = (index) => {
    if (index === steps.length - 1) return; // Already at the bottom

    const newSteps = [...steps];
    const temp = newSteps[index + 1];
    newSteps[index + 1] = { ...newSteps[index], position: index + 2 };
    newSteps[index] = { ...temp, position: index + 1 };

    setSteps(newSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCondition(steps)) {
      return;
    }

    try {
      // Remove the __typename field from each step object and set the correct position
      const cleanedSteps = steps.map(({ __typename, ...step }, index) => ({
        ...step,
        position: index + 1,
      }));

      const user = AuthService.getProfile();
      const userId = user.id;

      await updateChecklist({
        variables: { checklistId, title, steps: cleanedSteps, userId },
        refetchQueries: [
          { query: QUERY_CHECKLISTS },
          { query: QUERY_CHECKLIST, variables: { checklistId } },
        ],
      });
      setTitle("");
      setSteps([]);

      // Navigate back to the ChecklistManagement component
      navigate("/checklistManagement");
    } catch (err) {
      console.error("Error submitting mutation:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="checklist-form">
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
                    id="conditionType"
                    steps={steps}
                    currentStepIndex={index}
                    value={step.conditionType || ""}
                    onChange={handleStepsChange}
                  />
                  <ValidConditionValueInput
                    id="conditionValue"
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
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Button variant="contained" type="button" onClick={addStep}>
                Add Step
              </Button>
              <Button
                id="save"
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginLeft: "10px" }}
              >
                Save Changes
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{ p: 2 }}>
          <Typography variant="body1">{modalText}</Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </Box>
      </Dialog>
    </div>
  );
};

export default ChecklistForm;
