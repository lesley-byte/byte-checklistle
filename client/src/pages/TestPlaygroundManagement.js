import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import NewPlayground from "../components/NewPlayground";
import ListOfPlaygroundLists from "../components/ListOfPlaygroundLists";
import introJs from "intro.js";
import "intro.js/minified/introjs.min.css";
import { getChecklistsFromLocalStorage } from "../utils/localStorageUtils";
import playgroundTutorialSteps from "../tutorials/playgroundTutorialSteps";
import listOfPlaygroundListsTutorialSteps from "../tutorials/listOfPlaygroundListsTutorialSteps";

const TestPlaygroundManagement = () => {
  const [checklists, setChecklists] = useState(getChecklistsFromLocalStorage());

  const handleChecklistUpdate = () => {
    console.log("Updating checklists..."); // Add this line for debugging
    setChecklists(getChecklistsFromLocalStorage());
  };

  useEffect(() => {
    const tutorialShown = sessionStorage.getItem("playgroundTutorialShown");

    if (!tutorialShown) {
      const intro = introJs();

      intro.setOptions({
        steps: [
          ...playgroundTutorialSteps,
          ...listOfPlaygroundListsTutorialSteps,
        ],
      });

      const startTutorial = () => {
        intro.start();
        sessionStorage.setItem("playgroundTutorialShown", "true");
      };

      // Wait for 500 milliseconds before starting the tutorial
      setTimeout(startTutorial, 500);
    }
  }, []);

  //...
  return (
    <Container maxWidth="md" sx={{ minHeight: "80vh" }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Checklist Management
      </Typography>
      <Box mt={4} id="new-playground-checklist">
        <NewPlayground onUpdate={handleChecklistUpdate} />
      </Box>
      <Box mt={4} id="list-of-playground-lists">
        <ListOfPlaygroundLists
          checklists={checklists}
          onUpdate={handleChecklistUpdate}
        />
      </Box>
    </Container>
  );
};

export default TestPlaygroundManagement;
