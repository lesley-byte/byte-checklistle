import React from "react";
import New from "../components/New";
import ListOfLists from "../components/ListOfLists";

const ChecklistManagement = () => {
  return (
    <div>
      <h1>Checklist Management page</h1>
      <New />
      <ListOfLists />
    </div>
  );
};

export default ChecklistManagement;
