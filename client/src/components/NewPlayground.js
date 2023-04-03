import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import colors from "../assets/styles/colors";
import {
  saveChecklistsToLocalStorage,
  getChecklistsFromLocalStorage,
} from "../utils/localStorageUtils";

const NewPlayground = ({ onUpdate }) => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    title: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const key = "playgroundChecklists";
      const savedChecklists = getChecklistsFromLocalStorage();
      const newChecklist = {
        _id: Math.floor(Math.random() * 100000),
        title: formState.title,
        steps: [], // Add this line to store steps in the checklist object
      };

      saveChecklistsToLocalStorage([...savedChecklists, newChecklist]);
      onUpdate(); // Call the onUpdate function to update the checklists in the parent component
      setFormState({
        title: "",
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

export default NewPlayground;
