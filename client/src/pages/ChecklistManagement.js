// Path: client\src\pages\ChecklistManagement.js
import React, { useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import New from "../components/New";
import ListOfLists from "../components/ListOfLists";
import introJs from "intro.js";
import "intro.js/minified/introjs.min.css";
// Path: client\src\pages\ChecklistManagement.js
import tutorialSteps from "../tutorials/tutorialSteps";

const ChecklistManagement = () => {
  // useEffect(() => {
  //   const tutorialShown = sessionStorage.getItem("tutorialShown");

  //   if (!tutorialShown) {
  //     const intro = introJs();

  //     intro.setOptions({
  //       steps: tutorialSteps,
  //     });

  //     intro.start();

  //     sessionStorage.setItem("tutorialShown", "true");
  //   }
  // }, []);

  return (
    <Container maxWidth="md" sx={{ minHeight: "80vh" }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Checklist Management
      </Typography>
      <Box mt={4} id="new-checklist">
        <New />
      </Box>
      <Box mt={4} id="list-of-lists">
        <ListOfLists />
      </Box>
    </Container>
  );
};

export default ChecklistManagement;
