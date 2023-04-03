import React, { useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import NewPlayground from "../components/NewPlayground";
import ListOfPlaygroundLists from "../components/ListOfPlaygroundLists";
import introJs from "intro.js";
import "intro.js/minified/introjs.min.css";

const TestPlaygroundManagement = () => {
  useEffect(() => {
    const tutorialShown = sessionStorage.getItem("playgroundTutorialShown");

    if (!tutorialShown) {
      const intro = introJs();

      intro.setOptions({
        steps: [
          {
            element: "#new-playground-checklist",
            intro: "Here you can create a new checklist.",
            position: "bottom",
          },
          {
            element: "#list-of-playground-lists",
            intro:
              "This is the list of all your checklists. you can view, edit, or delete them here.",
            position: "top",
          },
        ],
      });

      intro.start();

      sessionStorage.setItem("playgroundTutorialShown", "true");
    }
  }, []);

  return (
    <Container maxWidth="md" sx={{ minHeight: "80vh" }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Checklist Management
      </Typography>
      <Box mt={4} id="new-checklist">
        <NewPlayground />
      </Box>
      <Box mt={4} id="list-of-lists">
        <ListOfPlaygroundLists />
      </Box>
    </Container>
  );
};

export default TestPlaygroundManagement;
