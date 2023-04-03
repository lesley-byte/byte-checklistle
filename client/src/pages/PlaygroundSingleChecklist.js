import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TestPlayground from "../components/TestPlayground";
import { CircularProgress, Typography, Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

import { getChecklistsFromLocalStorage } from "../utils/localStorageUtils";

const StyledPlaygroundSingleChecklist = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "80vh",
});

const PlaygroundSingleChecklist = () => {
  const { checklistId } = useParams();

  const [checklist, setChecklist] = useState(null); // Rename checklistData to checklist

  useEffect(() => {
    const fetchData = async () => {
      const storedChecklists = getChecklistsFromLocalStorage(
        "playgroundChecklists"
      );

      // Log the storedChecklists and checklistId
      console.log("Stored Checklists:", storedChecklists);
      console.log("Current checklistId:", checklistId);

      const currentChecklist = storedChecklists.find(
        (cl) => cl._id === parseInt(checklistId)
      );

      // Log the found currentChecklist
      console.log("currentChecklist:", currentChecklist);

      setChecklist(currentChecklist);
    };

    fetchData();
  }, [checklistId]);

  if (!checklist) {
    console.log("Checklist is not found, trying to load {checklistId}...");
    return (
      <Typography variant="h6">
        PlaygroundSingleChecklist.js - Checklist Trying to load {checklistId}...
      </Typography>
    );
  }

  return (
    <StyledPlaygroundSingleChecklist>
      {checklist ? (
        <TestPlayground
          checklistId={checklist._id}
          title={checklist.title}
          steps={checklist.steps}
        />
      ) : (
        <CircularProgress />
      )}
    </StyledPlaygroundSingleChecklist>
  );
};

export default PlaygroundSingleChecklist;
