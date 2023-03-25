import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CHECKLIST } from "../utils/mutations";
import { QUERY_CHECKLISTS } from "../utils/queries";
import { Box, Button, TextField, Typography } from "@mui/material";

const New = () => {
  const [addChecklist] = useMutation(ADD_CHECKLIST, {
    refetchQueries: [{ query: QUERY_CHECKLISTS }],
  });

  const [formState, setFormState] = useState({
    title: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addChecklist({
        variables: { ...formState },
      });
      setFormState({ title: "" });
    } catch (e) {
      console.error(e);
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
          type="submit"
          variant="contained"
          color="primary"
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
