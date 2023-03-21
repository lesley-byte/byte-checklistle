import React from "react";
import Add from "../components/Add";
import Delete from "../components/Delete";
import ConditionEditor from "../components/ConditionEditor";
import StepEditor from "../components/StepEditor";

const Editor = () => {
  return (
    <div>
      <h1>Editor page</h1>
      <Add />
      <Delete />
      <ConditionEditor />
      <StepEditor />
    </div>
  );
};

export default Editor;
