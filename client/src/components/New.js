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
    awaitRefetchQueries: true, // Wait for refetch to complete before navigating
    onCompleted: () => {
      navigate("/checklistmanagement"); // Change this to the correct route for ChecklistManagement
    },
  });

  const [formState, setFormState] = useState({
    title: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addChecklist({
        variables: { ...formState, userId: AuthService.getProfile().id },
      });

      setFormState({ title: "" });
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
            backgroundColor: colors.dark,
            color: colors.gray,
            "&:hover": {
              // Add this block for the hover effect
              backgroundColor: colors.gray,
              color: colors.dark,
            },
          }}
          type="submit"
          variant="contained"
          size="large"
          mt={4}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default New;
