import React from "react";
import { TextField, Typography, Box } from "@mui/material";

const ChecklistTitle = ({ value, onChange }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6">Title</Typography>
      <TextField
        id="title"
        name="title"
        value={value}
        onChange={onChange}
        fullWidth
      />
    </Box>
  );
};

export default ChecklistTitle;
