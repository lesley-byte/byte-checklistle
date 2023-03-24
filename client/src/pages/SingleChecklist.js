import React from "react";

// Import the `useParams()` hook from React Router
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// Import the 'Checklist' component from the 'components' folder
import Checklist from "../components/Checklist";

// Import the 'QUERY_CHECKLIST' query from the 'utils/queries.js' file
import { QUERY_CHECKLIST } from "../utils/queries";

const SingleChecklist = () => {
  // Use the 'useParams()' hook to get the 'checklistId' value from the URL
  const { checklistId } = useParams();

  const { loading, data } = useQuery(QUERY_CHECKLIST, {
    variables: { checklistId: checklistId },
  });

  const checklist = data?.checklist || [];

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
