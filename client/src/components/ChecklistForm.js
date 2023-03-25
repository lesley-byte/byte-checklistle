import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CHECKLIST } from "../utils/mutations";
import { QUERY_CHECKLIST, QUERY_CHECKLISTS } from "../utils/queries";
import { useNavigate } from "react-router-dom";
import { FormControl } from "@mui/material";
import { Button, Dialog } from "@mui/material";

import ValidConditionValueInput from "./ValidConditionalValueInput";
import ValidConditionTypeSelect from "./ValidConditionTypeSelect";

const ChecklistForm = ({ checklistId, checklist }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const [title, setTitle] = useState(checklist.title);
  const [steps, setSteps] = useState(
    checklist.steps.map((step) => ({
      ...step,
      conditionValue: step.conditionValue || [],
    }))
  );

  const openModal = (text) => {
    setModalText(text);
    setIsModalOpen(true);
  };

  const validateCondition = (steps) => {
    for (const step of steps) {
      const { conditionType, conditionValue } = step;

      if (
        (conditionType === "IF" || conditionType === "NOT") &&
        conditionValue.length !== 1
      ) {
        openModal(
          "Please use exactly one value for conditionValue with IF or NOT operators."
        );
        return false;
      }

      if (
        (conditionType === "XOR" || conditionType === "XNOR") &&
        conditionValue.length !== 2
      ) {
        openModal(
          "Please use exactly two values for conditionValue with XOR or XNOR operators."
        );
        return false;
      }
    }

    return true;
  };

  const [updateChecklist, { data, loading, error }] =
    useMutation(UPDATE_CHECKLIST);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleStepsChange = (e, index) => {
    const newSteps = [...steps];

    if (e.target.name === "conditionValue") {
      newSteps[index] = {
        ...newSteps[index],
        conditionValue: e.target.value,
      };
    } else {
      newSteps[index] = {
        ...newSteps[index],
        [e.target.name]: e.target.value,
        position: index + 1,
      };
    }

    setSteps(newSteps);
  };

  const addStep = () => {
    setSteps([...steps, { text: "", position: steps.length + 1 }]);
  };

  const deleteStep = (indexToDelete) => {
    const newSteps = steps.filter((_, index) => index !== indexToDelete);
    setSteps(newSteps);
  };

  const moveStepUp = (index) => {
    if (index === 0) return; // Already at the top

    const newSteps = [...steps];
    const temp = newSteps[index - 1];
    newSteps[index - 1] = { ...newSteps[index], position: index };
    newSteps[index] = { ...temp, position: index + 1 };

    setSteps(newSteps);
  };

  const moveStepDown = (index) => {
    if (index === steps.length - 1) return; // Already at the bottom

    const newSteps = [...steps];
    const temp = newSteps[index + 1];
    newSteps[index + 1] = { ...newSteps[index], position: index + 2 };
    newSteps[index] = { ...temp, position: index + 1 };

    setSteps(newSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCondition(steps)) {
      return;
    }
    try {
      // Remove the __typename field from each step object and set the correct position
      const cleanedSteps = steps.map(({ __typename, ...step }, index) => ({
        ...step,
        position: index + 1,
      }));

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
    <div className="checklist-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title || ""}
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
              value={step.text || ""}
              onChange={(e) => handleStepsChange(e, index)}
            />
            <label htmlFor={`conditionType-${index}`}>Condition Type:</label>
            <ValidConditionTypeSelect
              steps={steps}
              currentStepIndex={index}
              value={step.conditionType || ""}
              onChange={handleStepsChange}
            />

            <label htmlFor={`conditionValue-${index}`}>Condition Value:</label>
            <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
              <ValidConditionValueInput
                steps={steps}
                currentStepIndex={index}
                value={step.conditionValue || []}
                onChange={(e) => handleStepsChange(e, index)}
              />
            </FormControl>

            <button type="button" onClick={() => moveStepUp(index)}>
              Move Up
            </button>
            <button type="button" onClick={() => moveStepDown(index)}>
              Move Down
            </button>

            <button type="button" onClick={() => deleteStep(index)}>
              Delete
            </button>
          </div>
        ))}

        <button type="button" onClick={addStep}>
          Add Step
        </button>
        <button type="submit">Save Changes</button>
      </form>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>{modalText}</div>
        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
      </Dialog>
    </div>
  );
};

export default ChecklistForm;
