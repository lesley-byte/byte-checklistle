import React from "react";

const Checklist = ({ title, steps }) => {
  if (!title && !steps) {
    return <h3>No Checklist Selected</h3>;
  }

  const handleCheckboxChange = (e, step) => {
    console.log(
      `Checkbox for step ${step.position} changed to ${e.target.checked}`
    );
  };

  return (
    <div>
      <h2>ChecklistTitle is : {title}</h2>
      {steps ? (
        <div>
          {steps.map((step) => (
            <div key={step.text}>
              <input
                type="checkbox"
                id={`checkbox-${step.position}`}
                onChange={(e) => handleCheckboxChange(e, step)}
              />
              <label htmlFor={`checkbox-${step.position}`}>
                Step text is:<strong> {step.text} </strong> Step is in position:{" "}
                <strong> {step.position} </strong>
              </label>
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
