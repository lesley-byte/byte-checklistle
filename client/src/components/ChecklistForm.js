import React, { useState } from "react";
import { useMutation } from "@apollo/client";
// Import the 'useQuery()' hook from the 'react-query' package
import { useQuery } from "@apollo/client";

// Import the 'UPDATE_CHECKLIST' mutation from the 'utils/mutations.js' file
import { UPDATE_CHECKLIST } from "../utils/mutations";

// Import the 'QUERY_CHECKLIST' query from the 'utils/queries.js' file
import { QUERY_CHECKLIST } from "../utils/queries";

const ChecklistForm = () => {
  // Create a 'checklistData' object with the 'useState()' hook
  const [checklistData, setChecklistData] = useState({
    title: "",
    steps: [],
  });

  // Use the 'useQuery()' hook to execute the 'QUERY_CHECKLIST' query
  const { data } = useQuery(QUERY_CHECKLIST);

  // Use the 'useMutation()' hook to execute the 'UPDATE_CHECKLIST' mutation
  const [updateChecklist, { error }] = useMutation(UPDATE_CHECKLIST);

  // Create a function to handle the 'onChange' event
  const handleChange = (event) => {
    const { name, value } = event.target;

    setChecklistData({
      ...checklistData,
      [name]: value,
    });
  };

  // Create a function to handle the 'onSubmit' event
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateChecklist({
        variables: { ...checklistData },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {data ? (
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="checklist-title">Checklist Title:</label>
            <input
              placeholder={data.checklist.title}
              name="title"
              type="text"
              id="checklist-title"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="checklist-steps">Checklist Steps:</label>
            <textarea
              placeholder={data.checklist.steps}
              name="steps"
              type="text"
              id="checklist-steps"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row flex-end">
            <button type="submit">Submit</button>
          </div>
        </form>
      ) : null}
      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default ChecklistForm;
