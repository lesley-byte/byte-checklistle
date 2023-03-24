import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CHECKLIST } from "../utils/mutations";
import { QUERY_CHECKLIST, QUERY_CHECKLISTS } from "../utils/queries";
import { useNavigate } from "react-router-dom";

const ChecklistForm = ({ checklistId, checklist }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(checklist.title);
  const [steps, setSteps] = useState(checklist.steps);
  const [updateChecklist, { data, loading, error }] =
    useMutation(UPDATE_CHECKLIST);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  
  const handleStepsChange = (e, index) => {
    const newSteps = [...steps];
    newSteps[index] = {
      ...newSteps[index],
      [e.target.name]: e.target.value,
      position: index + 1,
    };
    setSteps(newSteps);
  };
  

  const addStep = () => {
    setSteps([...steps, { text: "", position: steps.length + 1 }]);
  };

  const deleteStep = (indexToDelete) => {
    const newSteps = steps.filter((_, index) => index !== indexToDelete);
    setSteps(newSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Remove the __typename field from each step object
      const cleanedSteps = steps.map(({ __typename, ...step }) => step);

      await updateChecklist({
        variables: { checklistId, title, steps: cleanedSteps },
        refetchQueries: [
          { query: QUERY_CHECKLISTS },
          { query: QUERY_CHECKLIST, variables: { checklistId } },
        ],
      });
      setTitle("");
      setSteps([]);

      // Navigate back to the ChecklistManagement component
      navigate("/checklistManagement");
    } catch (err) {
      console.error("Error submitting mutation:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
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
          <button type="button" onClick={() => deleteStep(index)}>
            Delete
          </button>
          <label htmlFor={`conditionType-${index}`}>Condition Type:</label>
          <input
            type="text"
            id={`conditionType-${index}`}
            name="conditionType"
            value={step.conditionType}
            onChange={(e) => handleStepsChange(e, index)}
          />
          <label htmlFor={`conditionValue-${index}`}>Condition Value:</label>
          <input
            type="text"
            id={`conditionValue-${index}`}
            name="conditionValue"
            value={step.conditionValue}
            onChange={(e) => handleStepsChange(e, index)}
          />
        </div>
      ))}

      <button type="button" onClick={addStep}>
        Add Step
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ChecklistForm;
