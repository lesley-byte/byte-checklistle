import React from "react";
import New from "../components/New";
import ListOfLists from "../components/ListOfLists";

const ChecklistManagement = () => {
  return (
    <>
      <h1>Checklist Management page</h1>
      <New />
      <ListOfLists />
    </>
  );
};

export default ChecklistManagement;
