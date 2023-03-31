import { useState } from "react";

const useSteps = (initialSteps, setIsModalOpen, setModalText) => {
  const [steps, setSteps] = useState(initialSteps);

  const handleStepsChange = (e, index) => {
    console.log("handleStepsChange event:", e);
    console.log("handleStepsChange index:", index);
    console.log("handleStepsChange event:", steps);
    console.log("handleStepsChange index:", index);
    console.log(e.target);
    console.log("handleStepsChange event:", e);
    console.log("handleStepsChange index:", index);
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
    console.log("handleStepsChange new steps:", newSteps);

    setSteps(newSteps);
  };

  const addStep = () => {
    console.log("In addStep (useSteps.js) steps:", steps);
    console.log("In addStep (useSteps.js) steps.length:", steps.length);
    console.log("Adding a new step...");
    const newStep = {
      text: "",
      position: steps.length + 1,
      conditionType: null,
      conditionValue: [],
    };
    console.log("Steps length before adding new step:", steps.length);

    console.log("New step:", newStep);
    setSteps([...steps, newStep]); // Replace the handleStepsChange call with setSteps
    console.log("Steps after adding new step:", steps);
    console.log("Steps length after adding new step:", steps.length);
  };

  const deleteStep = (indexToDelete) => {
    console.log("Deleting step at index:", indexToDelete);

    const newSteps = steps.filter((_, index) => index !== indexToDelete);
    setSteps(newSteps);
  };

  const moveStep = (dragIndex, dropIndex) => {
    if (dragIndex === dropIndex) return;

    const updatedSteps = [...steps];
    const draggedStep = updatedSteps.splice(dragIndex, 1)[0];

    updatedSteps.splice(dropIndex, 0, draggedStep);

    setSteps(updatedSteps);
  };

  const validateCondition = (steps) => {
    for (const step of steps) {
      const { conditionType, conditionValue } = step;

      if (
        (conditionType === "IF" || conditionType === "NOT") &&
        conditionValue.length !== 1
      ) {
        setModalText(
          "Please use exactly one value for conditionValue with IF or NOT operators."
        );
        setIsModalOpen(true);
        return false;
      }

      if (
        (conditionType === "XOR" || conditionType === "XNOR") &&
        conditionValue.length !== 2
      ) {
        setModalText(
          "Please use exactly two values for conditionValue with XOR or XNOR operators."
        );
        setIsModalOpen(true);
        return false;
      }
    }

    return true;
  };

  return {
    steps,
    handleStepsChange,
    addStep,
    deleteStep,
    validateCondition,
    moveStep,
  };
};

export default useSteps;

// Path: client\src\components\ChecklistForm\useSteps.js
