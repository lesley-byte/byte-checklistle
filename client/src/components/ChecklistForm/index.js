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

const ChecklistForm = ({ checklistId, checklist }) => {
  useIntro();

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [title, setTitle] = useState(checklist.title);

  const {
    steps,
    handleStepsChange,
    addStep,
    deleteStep,
    moveStepUp,
    moveStepDown,
    validateCondition,
  } = useSteps(
    checklist.steps.map((step) => ({
      ...step,
      conditionValue: step.conditionValue || [],
    })),
    setIsModalOpen,
    setModalText
  );

  const [updateChecklist, { loading, error }] = useMutation(UPDATE_CHECKLIST);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCondition(steps)) {
      return;
    }

    try {
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

      navigate("/checklistManagement");
    } catch (err) {
      console.error("Error submitting mutation:", err);
    }
  };

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
          <StepsList
            steps={steps}
            handleStepsChange={handleStepsChange}
            deleteStep={deleteStep}
            moveStepUp={moveStepUp}
            moveStepDown={moveStepDown}
          />
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
