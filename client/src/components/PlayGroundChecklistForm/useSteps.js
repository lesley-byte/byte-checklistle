import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useSteps = (initialSteps, setIsModalOpen, setModalText) => {
  const [steps, setSteps] = useState(initialSteps);

  const handleStepsChange = (e, index) => {
    const newSteps = [...steps];
    const stepToUpdate = { ...newSteps[index] };

    stepToUpdate[e.target.name] = e.target.value;
    stepToUpdate.position = index + 1;

    newSteps[index] = stepToUpdate;
    setSteps(newSteps);
  };

  const addStep = () => {
    const newStep = {
      text: "",
      position: steps.length + 1,
      conditions: {
        AND: [],
        IF: [],
        NAND: [],
        NOR: [],
        NOT: [],
        OR: [],
        XNOR: [],
        XOR: [],
      },
      _id: uuidv4(),
    };
    setSteps([...steps, newStep]);
  };

  const deleteStep = (indexToDelete) => {
    console.log("Deleting step at index:", indexToDelete);

    const newSteps = steps.filter((_, index) => index !== indexToDelete);
    setSteps(newSteps);
  };

  const moveStep = (dragId, dropId) => {
    if (dragId === dropId) return;

    const dragIndex = steps.findIndex((step) => step._id === dragId);
    const dropIndex = steps.findIndex((step) => step._id === dropId);

    if (dragIndex === -1 || dropIndex === -1) return;

    const updatedSteps = [...steps];
    const draggedStep = updatedSteps.splice(dragIndex, 1)[0];

    updatedSteps.splice(dropIndex, 0, draggedStep);

    setSteps(updatedSteps);
  };

  const validateCondition = (steps) => {
    for (const [index, step] of steps.entries()) {
      const { conditions } = step;

      for (const [conditionType, conditionValue] of Object.entries(
        conditions
      )) {
        if (conditionValue.length === 0) continue;

        if (
          (conditionType === "IF" || conditionType === "NOT") &&
          conditionValue.length !== 1
        ) {
          setModalText(
            `In Step ${
              index + 1
            }, you selected the ${conditionType} operator but provided ${
              conditionValue.length
            } value(s). Please use exactly one value for the ${conditionType} operator.`
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
            } value(s). Please use exactly two values for the ${conditionType} operator.`
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
            } value(s). Please use at least two values for the ${conditionType} operator.`
          );
          setIsModalOpen(true);
          return false;
        }
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
