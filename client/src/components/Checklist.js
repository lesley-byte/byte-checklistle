import React, { useState, useEffect } from "react";

const Checklist = ({ title, steps }) => {
  const [checkboxStates, setCheckboxStates] = useState({});

  useEffect(() => {
    const initialCheckboxStates = steps.reduce(
      (states, step) => ({ ...states, [step.position]: false }),
      {}
    );
    setCheckboxStates(initialCheckboxStates);
  }, [steps]);

  const handleCheckboxChange = (e, step) => {
    setCheckboxStates({
      ...checkboxStates,
      [step.position]: e.target.checked,
    });
  };

  const shouldDisplayStep = (step) => {
    if (!step.conditionType || step.conditionType === "") return true;

    const stepConditionValues = step.conditionValue.map((value) =>
      parseInt(value)
    );
    const conditionTypeUpper = step.conditionType.toUpperCase();

    switch (conditionTypeUpper) {
      case "AND":
        // Check if all referenced steps are checked
        return stepConditionValues.every(
          (value) => checkboxStates[value] === true
        );

      case "OR":
        // Check if any referenced steps are checked
        return stepConditionValues.some(
          (value) => checkboxStates[value] === true
        );

      case "IF":
        // If the first referenced step is checked, display the step
        return checkboxStates[stepConditionValues[0]] === true;

      case "NOT":
        // If the first referenced step is not checked, display the step
        return checkboxStates[stepConditionValues[0]] !== true;

      case "NOR":
        // Check if none of the referenced steps are checked
        return stepConditionValues.every(
          (value) => checkboxStates[value] !== true
        );

      case "NAND":
        // Check if not all referenced steps are checked
        return stepConditionValues.some(
          (value) => checkboxStates[value] !== true
        );
      case "XOR":
        return (
          stepConditionValues.filter((value) => checkboxStates[value] === true)
            .length %
            2 ===
          1
        );
      case "XNOR":
        return (
          stepConditionValues.filter((value) => checkboxStates[value] === true)
            .length %
            2 ===
          0
        );

      default:
        return false;
    }
  };

  const resetCheckboxes = () => {
    const initialCheckboxStates = steps.reduce(
      (states, step) => ({ ...states, [step.position]: false }),
      {}
    );
    setCheckboxStates(initialCheckboxStates);
  };

  return (
    <div>
      <h2>ChecklistTitle is : {title}</h2>
      {steps ? (
        <div>
          {steps.map((step) => (
            <div key={step.text}>
              {shouldDisplayStep(step) && (
                <>
                  <input
                    type="checkbox"
                    id={`checkbox-${step.position}`}
                    checked={checkboxStates[step.position] || false}
                    onChange={(e) => handleCheckboxChange(e, step)}
                  />
                  <label htmlFor={`checkbox-${step.position}`}>
                    Step text is:<strong> {step.text} </strong> Step is in
                    position: <strong> {step.position} </strong>
                  </label>
                </>
              )}
            </div>
          ))}
          <button onClick={resetCheckboxes}>Reset</button>
        </div>
      ) : (
        <h3>No Steps Yet</h3>
      )}
    </div>
  );
};

export default Checklist;
