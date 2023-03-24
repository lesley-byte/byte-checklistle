import React from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Checklist from "../components/Checklist";
import { QUERY_CHECKLIST } from "../utils/queries";

const SingleChecklist = () => {
  const { checklistId } = useParams();

  const { loading, data } = useQuery(QUERY_CHECKLIST, {
    variables: { checklistId: checklistId },
    refetchQueries: [{ query: QUERY_CHECKLIST, variables: { checklistId } }],
  });

  const checklist = data?.checklist || [];

  console.log("Checklist data in SingleChecklist:", checklist); // Add this line to log the checklist data

  return (
    <div>
      <h2>Checklist</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Checklist
          checklistId={checklist._id}
          title={checklist.title}
          steps={checklist.steps}
        />
      )}
    </div>
  );
};

export default SingleChecklist;
