import React from "react";

const Checklist = (props) => {
  console.log("checklist: ", props);
  if (!props) {
    return <h3>No Checklist Selected</h3>;
  }

  return (
    <div>
      <h2>ChecklistTitle is : {props.title}</h2>
      {props.steps ? (
        <div>
          {props.steps.map((step) => (
            
              <div key={step.text}>
              <p>
                Step text is:<strong> {step.text} </strong> Step is in position:{" "}
                <strong> {step.position} </strong>
              </p>
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
