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
    if (
      step.conditionType &&
      checkboxStates[parseInt(step.conditionValue)] === true
    )
      return true;

    return false;
  };

  if (!title && !steps) {
    return <h3>No Checklist Selected</h3>;
  }

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
        </div>
      ) : (
        <h3>No Steps Yet</h3>
      )}
    </div>
  );
};

export default Checklist;
