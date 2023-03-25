import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, Typography, Button } from "@mui/material";

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
      <Typography variant="h5" component="h2" gutterBottom>
        ChecklistTitle is : {title}
      </Typography>
      {steps ? (
        <div>
          {steps.map((step) => (
            <div key={step.text}>
              {shouldDisplayStep(step) && (
                <FormControlLabel
                  control={
                    <Checkbox
                      id={`checkbox-${step.position}`}
                      checked={checkboxStates[step.position] || false}
                      onChange={(e) => handleCheckboxChange(e, step)}
                    />
                  }
                  label={`Step text is: ${step.text}. Step is in position: ${step.position}`}
                />
              )}
            </div>
          ))}
          <Button
            variant="outlined"
            color="secondary"
            onClick={resetCheckboxes}
            sx={{ mt: 2 }}
          >
            Reset
          </Button>
        </div>
      ) : (
        <Typography variant="h6" component="p">
          No Steps Yet
        </Typography>
      )}
    </div>
  );
};

export default Checklist;
