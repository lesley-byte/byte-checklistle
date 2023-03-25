import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CHECKLIST } from "../utils/queries";
import { useParams } from "react-router-dom";
import ChecklistForm from "../components/ChecklistForm";

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
    return <p>Loading...</p>;
  }

  return (
    <div className="editor">
      <h2>Update Checklist</h2>
      <ChecklistForm checklistId={checklistId} checklist={checklist} />
    </div>
  );
};

export default Editor;
