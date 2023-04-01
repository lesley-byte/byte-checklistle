import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CHECKLIST } from "../utils/mutations";
import { QUERY_CHECKLISTS } from "../utils/queries";
import { Box, Button, TextField, Typography } from "@mui/material";
import AuthService from "../utils/auth"; // import AuthService
import { useNavigate } from "react-router-dom"; // import useNavigate
import colors from "../assets/styles/colors";

const New = () => {
  const navigate = useNavigate();
  const [addChecklist] = useMutation(ADD_CHECKLIST, {
    refetchQueries: [
      {
        query: QUERY_CHECKLISTS,
        variables: { userId: AuthService.getProfile().id },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      navigate("/checklistmanagement");
    },
  });

  const [formState, setFormState] = useState({
    title: "",
    steps: [{ text: "", position: 0, conditionType: "", conditionValue: [] }],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // map over the steps array and add the _id field for each step
      const variables = {
        title: formState.title,
        steps: formState.steps.map((step) => ({
          ...step,
          _id: Math.floor(Math.random() * 100000), // generate a unique _id for the step
        })),
        userId: AuthService.getProfile().id,
      };

      await addChecklist({ variables });

      setFormState({
        title: "",
        steps: [
          { text: "", position: 0, conditionType: "", conditionValue: [] },
        ],
      });
    } catch (e) {
      console.error("Error:", e || "No error found");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleStepChange = (event, index) => {
    const { name, value } = event.target;

    const newSteps = [...formState.steps];
    newSteps[index] = {
      ...newSteps[index],
      [name]: value,
    };

    setFormState({
      ...formState,
      steps: newSteps,
    });
  };

  const handleAddStep = () => {
    setFormState({
      ...formState,
      steps: [
        ...formState.steps,
        {
          text: "",
          position: formState.steps.length,
          conditionType: "",
          conditionValue: [],
        },
      ],
    });
  };

  const handleRemoveStep = (index) => {
    const newSteps = [...formState.steps];
    newSteps.splice(index, 1);

    setFormState({
      ...formState,
      steps: newSteps.map((step, i) => ({ ...step, position: i })),
    });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
      <Typography variant="h4" gutterBottom>
        New Checklist
      </Typography>
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="50%"
        mt={4}
      >
        <TextField
          label="Title"
          name="title"
          id="title"
          value={formState.title}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button
          sx={{
            backgroundColor: colors.teal,
            color: colors.ice,
            "&:hover": {
              // Add this block for the hover effect
              backgroundColor: colors.lightBlue,
              color: colors.dark,
            },
          }}
          type="submit"
          variant="contained"
          size="large"
          mt={4}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default New;
