import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableStep from "./DraggableStep";

// Add steps to the destructured props list
const StepsList = ({
  steps,
  checklist,
  handleStepsChange,
  deleteStep,
  moveStep,
}) => {
  console.log(steps);

  return (
    <div id="step">
      {steps.map((step, index) => (
        <DraggableStep
          key={index}
          step={step}
          steps={steps}
          index={index}
          handleStepsChange={handleStepsChange}
          deleteStep={deleteStep}
          moveStep={moveStep}
          checklist={checklist}
        />
      ))}
    </div>
  );
};

export default StepsList;

// Path: client\src\components\ChecklistForm\StepsList.js
