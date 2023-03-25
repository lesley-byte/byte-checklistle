import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import Checklist from "../components/Checklist";
import { QUERY_CHECKLIST } from "../utils/queries";

const StyledSingleChecklist = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const SingleChecklist = () => {
  const { checklistId } = useParams();

  const { loading, data } = useQuery(QUERY_CHECKLIST, {
    variables: { checklistId: checklistId },
    refetchQueries: [{ query: QUERY_CHECKLIST, variables: { checklistId } }],
  });

  const checklist = data?.checklist || [];

  console.log("Checklist data in SingleChecklist:", checklist); // Add this line to log the checklist data

  return (
    <StyledSingleChecklist>
      <Typography variant="h4" gutterBottom>
        Checklist
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Checklist
          checklistId={checklist._id}
          title={checklist.title}
          steps={checklist.steps}
        />
      )}
    </StyledSingleChecklist>
  );
};

export default SingleChecklist;
