import React, { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_CHECKLIST } from "../utils/mutations";
import { QUERY_CHECKLIST } from "../utils/queries";

import { useParams } from "react-router-dom";

const Editor = () => {
  const { checklistId } = useParams();
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState([]);
  const [updateChecklist, { data, loading, error }] = useMutation(UPDATE_CHECKLIST);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleStepsChange = (e, index) => {
    const newSteps = [...steps];
    newSteps[index][e.target.name] = e.target.value;
    setSteps(newSteps);
  };

  const addStep = () => {
    setSteps([...steps, { text: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateChecklist({ variables: { checklistId, title, steps } });
      setTitle('');
      setSteps([]);
    } catch (err) {
      console.error('Error submitting mutation:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Update Checklist</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />

        {steps.map((step, index) => (
          <div key={index}>
            <h3>Step {index + 1}</h3>
            <label htmlFor={`text-${index}`}>Text:</label>
            <input
              type="text"
              id={`text-${index}`}
              name="text"
              value={step.text}
              onChange={(e) => handleStepsChange(e, index)}
            />
          </div>
        ))}

        <button type="button" onClick={addStep}>Add Step</button>
        <button type="submit">Submit</button>
      </form>

      {data && (
        <div>
          <h3>Mutation Result:</h3>
          <pre>{JSON.stringify(data.updateChecklist, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Editor;
