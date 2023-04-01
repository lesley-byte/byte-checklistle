import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
    console.log(steps);

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
      tempId: uuidv4(),
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

  const moveStep = (dragId, dropId) => {
    if (dragId === dropId) return;

    const dragIndex = steps.findIndex(
      (step) => step._id === dragId || step.tempId === dragId
    );
    const dropIndex = steps.findIndex(
      (step) => step._id === dropId || step.tempId === dropId
    );

    if (dragIndex === -1 || dropIndex === -1) return;

    const updatedSteps = [...steps];
    const draggedStep = updatedSteps.splice(dragIndex, 1)[0];

    updatedSteps.splice(dropIndex, 0, draggedStep);

    setSteps(updatedSteps);
  };

  const validateCondition = (steps) => {
    for (const [index, step] of steps.entries()) {
      const { conditionType, conditionValue } = step;

      if (
        (conditionType === "IF" || conditionType === "NOT") &&
        conditionValue.length !== 1
      ) {
        setModalText(
          `In Step ${
            index + 1
          }, you selected the ${conditionType} operator but provided ${
            conditionValue.length
          } value(s). Please use exactly one value for conditionValue with the IF or NOT operators.`
        );
        setIsModalOpen(true);
        return false;
      }

      if (
        (conditionType === "XOR" || conditionType === "XNOR") &&
        conditionValue.length !== 2
      ) {
        setModalText(
          `In Step ${
            index + 1
          }, you selected the ${conditionType} operator but provided ${
            conditionValue.length
          } value(s). Please use exactly two values for conditionValue with the XOR or XNOR operators.`
        );
        setIsModalOpen(true);
        return false;
      }

      if (
        (conditionType === "AND" ||
          conditionType === "NAND" ||
          conditionType === "OR" ||
          conditionType === "NOR") &&
        conditionValue.length < 2
      ) {
        setModalText(
          `In Step ${
            index + 1
          }, you selected the ${conditionType} operator but provided ${
            conditionValue.length
          } value(s). Please use at least two values for conditionValue with the AND, NAND, OR, or NOR operators.`
        );
        setIsModalOpen(true);
        return false;
      }

      if (conditionType && !conditionValue.length) {
        setModalText(
          `In Step ${
            index + 1
          }, you selected the ${conditionType} operator but didn't provide any values for conditionValue. Please use at least one value for conditionValue with any operator.`
        );
        setIsModalOpen(true);
        return false;
      }
      if (conditionValue.length && !conditionType) {
        setModalText(
          `In Step ${index + 1}, you provided ${
            conditionValue.length
          } value(s) for conditionValue but didn't select an operator. Please use an operator with at least one value for conditionValue.`
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
