import { useState } from "react";

const useSteps = (initialSteps, setIsModalOpen, setModalText) => {
  const [steps, setSteps] = useState(initialSteps);

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
    if (index === 0) return;

    const newSteps = [...steps];
    const temp = newSteps[index - 1];
    newSteps[index - 1] = { ...newSteps[index], position: index };
    newSteps[index] = { ...temp, position: index + 1 };

    setSteps(newSteps);
  };

  const moveStepDown = (index) => {
    if (index === steps.length - 1) return;

    const newSteps = [...steps];
    const temp = newSteps[index + 1];
    newSteps[index + 1] = { ...newSteps[index], position: index + 2 };
    newSteps[index] = { ...temp, position: index + 1 };

    setSteps(newSteps);
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
    moveStepUp,
    moveStepDown,
    validateCondition,
  };
};

export default useSteps;
