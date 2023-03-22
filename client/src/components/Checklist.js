import React from "react";

const Checklist = (props) => {
  console.log("checklist: ", props);
  if (!props) {
    return <h3>No Checklist Selected</h3>;
  }

  return (
    <div>
      <h2>ChecklistTitle is : {props.title}</h2>
      {props.steps && props.steps.map((step) => (
        <div key={step.text} className="flex-row justify-space-between my-2">
          <div className="col-12 col-lg-3">
            <span className="step-header">Step {step.position}</span>
          </div>
          <div className="col-12 col-lg-9">
            <span className="step-text">{step.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Checklist;
