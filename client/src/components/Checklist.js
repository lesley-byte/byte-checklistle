import React, { useState, useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import colors from "../assets/styles/colors";

const Checklist = ({ title, steps }) => {
  const [checkboxStates, setCheckboxStates] = useState({});

  useEffect(() => {
    if (Array.isArray(steps)) {
      const initialCheckboxStates = steps.reduce(
        (states, step) => ({ ...states, [step._id]: false }),
        {}
      );

      setCheckboxStates(initialCheckboxStates);
    }
  }, [steps]);

  const handleCheckboxChange = (e, step) => {
    setCheckboxStates({
      ...checkboxStates,
      [step._id]: e.target.checked,
    });
  };

  const shouldDisplayStep = (step) => {
    if (!step.conditionType || step.conditionType === "") return true;

    const stepConditionValues = step.conditionValue;
    const conditionTypeUpper = step.conditionType.toUpperCase();

    switch (conditionTypeUpper) {
      case "AND":
        return stepConditionValues.every(
          (value) => checkboxStates[value] === true
        );

      case "OR":
        return stepConditionValues.some(
          (value) => checkboxStates[value] === true
        );

      case "IF":
        return checkboxStates[stepConditionValues[0]] === true;

      case "NOT":
        return checkboxStates[stepConditionValues[0]] !== true;

      case "NAND":
        return stepConditionValues.some(
          (value) => checkboxStates[value] !== true
        );

      case "NOR":
        // Check if none of the referenced steps are checked
        return stepConditionValues.every(
          (value) => checkboxStates[value] !== true
        );
      case "XOR":
        return (
          stepConditionValues.filter((value) => checkboxStates[value] === true)
            .length === 1
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
      (states, step) => ({ ...states, [step._id]: false }),
      {}
    );
    setCheckboxStates(initialCheckboxStates);
  };

  return (
    <Container maxWidth="sm">
      <div>
        <Typography variant="h4" component="h2" gutterBottom>
          {title}
        </Typography>
        <Box
          sx={{
            maxHeight: "400px",
            width: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            padding: "0 16px",
          }}
        >
          {steps ? (
            <div>
              {steps.map((step) => (
                <div key={step.text}>
                  {shouldDisplayStep(step) && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          id={`checkbox-${step._id}`}
                          checked={checkboxStates[step._id] || false}
                          onChange={(e) => handleCheckboxChange(e, step)}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              transform: "scale(2)",
                              color: colors.dark, // default color
                            },
                            "& .Mui-checked": {
                              color: colors.dark, // Checked color
                            },
                            "&:hover": {
                              "& .MuiSvgIcon-root": {
                                color: colors.dark, // Hover color
                              },
                            },
                          }}
                        />
                      }
                      label={
                        <Typography
                          variant="subtitle1"
                          sx={{ fontSize: "1.5rem" }}
                        >
                          {` ${step.text}`}
                        </Typography>
                      }
                    />
                  )}
                </div>
              ))}
              <Button
                variant="outlined"
                onClick={resetCheckboxes}
                sx={{
                  backgroundColor: colors.teal,
                  color: colors.ice,
                  "&:hover": {
                    // Add this block for the hover effect
                    backgroundColor: colors.lightBlue,
                    color: colors.dark,
                  },
                }}
              >
                Reset
              </Button>
            </div>
          ) : (
            <Typography variant="h6" component="p">
              No Steps Yet
            </Typography>
          )}
        </Box>
      </div>
    </Container>
  );
};

export default Checklist;
