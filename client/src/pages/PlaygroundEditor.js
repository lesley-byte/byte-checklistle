import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import PlayGroundChecklistForm from "../components/PlayGroundChecklistForm";
import {
  saveChecklistsToLocalStorage,
  getChecklistsFromLocalStorage,
  getChecklistFromLocalStorage,
} from "../utils/localStorageUtils";

const PlaygroundEditor = () => {
  const { checklistId } = useParams();
  const [checklist, setChecklist] = useState(null);

  useEffect(() => {
    if (!checklist) {
      console.log(`Trying to fetch checklist with id: ${checklistId}`);
      const storedChecklists = getChecklistsFromLocalStorage(
        "playgroundChecklists"
      );
      console.log("Stored checklists:", storedChecklists);

      const foundChecklist = storedChecklists.find(
        (checklist) => checklist._id === parseInt(checklistId)
      );

      if (foundChecklist) {
        const checklistData = getChecklistFromLocalStorage(foundChecklist._id);
        setChecklist(checklistData);
      } else {
        console.log(`Checklist is not found for ${checklistId}`);
      }
    }
  }, [checklistId, checklist]);

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Update Checklist
      </Typography>
      {checklist !== null ? (
        <PlayGroundChecklistForm
          checklistId={checklistId}
          checklist={checklist}
        />
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
};

export default PlaygroundEditor;
