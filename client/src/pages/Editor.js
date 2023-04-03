import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import ChecklistForm from "../components/ChecklistForm";
import { QUERY_CHECKLIST } from "../utils/queries";

const Editor = () => {
  const { checklistId } = useParams();
  const { data: queryData } = useQuery(QUERY_CHECKLIST, {
    variables: { checklistId },
  });
  console.log("queryData value in Editor.js:", queryData);
  const [checklist, setChecklist] = useState(null);

  useEffect(() => {
    if (queryData) {
      setChecklist(queryData.checklist);
    }
  }, [queryData]);

  if (!checklist) {
    console.log("loading...");
    return <Typography variant="h6">loading ...</Typography>;
  }
  console.log("checklist value in Editor.js:", checklist);
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Update Checklist
      </Typography>
      <ChecklistForm checklistId={checklistId} checklist={checklist} />
    </Box>
  );
};

export default Editor;

// Path: client\src\pages\Editor.js
