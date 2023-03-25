import React from "react";
import { Typography, Box } from "@mui/material";

const Landing = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Checklistle
        </Typography>
        <Typography variant="h5" gutterBottom>
          The smart way to manage your checklists
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ maxWidth: "500px", mx: "auto" }}
        >
          Create conditional procedural checklists for complex workflows with
          Checklistle. Streamline your processes and increase efficiency.
        </Typography>
      </Box>
    </Box>
  );
};

export default Landing;
