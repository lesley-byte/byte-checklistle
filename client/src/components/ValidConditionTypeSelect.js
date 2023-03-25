import React from "react";

const ValidConditionTypeSelect = ({
  steps,
  currentStepIndex,
  value,
  onChange,
}) => {
  const handleConditionTypeChange = (e) => {
    onChange(e, currentStepIndex);
  };

  return (
    <select
      id={`conditionType-${currentStepIndex}`}
      name="conditionType"
      value={value || ""}
      onChange={handleConditionTypeChange}
    >
      <option value="">N/A</option>
      <option value="AND">AND</option>
      <option value="OR">OR</option>
      <option value="IF">IF</option>
      <option value="NOT">NOT</option>
      <option value="NOR">NOR</option>
      <option value="NAND">NAND</option>
      <option value="XOR">XOR</option>
      <option value="XNOR">XNOR</option>
    </select>
  );
};

export default ValidConditionTypeSelect;
