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

  const [checklist, setChecklist] = useState(null);

  useEffect(() => {
    if (queryData) {
      setChecklist(queryData.checklist);
    }
  }, [queryData]);

  if (!checklist) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Box sx={{ mt: 5, height: "80vh", overflowY: "scroll" }}>
      <Typography variant="h4" gutterBottom>
        Update Checklist
      </Typography>
      <ChecklistForm checklistId={checklistId} checklist={checklist} />
    </Box>
  );
};

export default Editor;
