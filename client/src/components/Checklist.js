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
    const { conditions } = step;
    console.log("conditions:", conditions);

    if (!conditions || Object.keys(conditions).length === 0) return true;

    const checkedConditions = Object.entries(conditions)
      .filter(([conditionType, _]) => conditionType !== "__typename")
      .map(([conditionType, conditionValues]) => {
        // If the conditionValues array is empty, return true
        if (conditionValues.length === 0) return true;

        let conditionResult;

        switch (conditionType) {
          case "AND":
            conditionResult = conditionValues.every(
              (value) => checkboxStates[value] === true
            );
            break;
          case "OR":
            conditionResult = conditionValues.some(
              (value) => checkboxStates[value] === true
            );
            break;
          case "IF":
            conditionResult = checkboxStates[conditionValues[0]] === true;
            break;
          case "NOT":
            conditionResult = checkboxStates[conditionValues[0]] !== true;
            break;
          case "NAND":
            conditionResult = conditionValues.some(
              (value) => checkboxStates[value] !== true
            );
            break;
          case "NOR":
            conditionResult = conditionValues.every(
              (value) => checkboxStates[value] !== true
            );
            break;
          case "XOR":
            conditionResult =
              conditionValues.filter((value) => checkboxStates[value] === true)
                .length === 1;
            break;
          case "XNOR":
            conditionResult =
              conditionValues.filter((value) => checkboxStates[value] === true)
                .length %
                2 ===
              0;
            console.log("conditionResult:", conditionType, conditionResult); // Add this line
            break;
          default:
            return true;
        }

        console.log("conditionResult:", conditionType, conditionResult);
        return conditionResult;
      });

    console.log("checkedConditions:", checkedConditions);
    return checkedConditions.every((condition) => condition === true);
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
                <div key={step._id || step.tempId}>
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
