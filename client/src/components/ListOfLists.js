import React, { useState } from "react";

import { useQuery } from "@apollo/client";

import { QUERY_CHECKLISTS } from "../utils/queries";

const ListOfLists = () => {
  const { loading, data } = useQuery(QUERY_CHECKLISTS);
  console.log("data: ", data);

  const checklists = data?.checklists || [];
  console.log("checklists: ", checklists);

  return (
    <div>
      <h2>Checklists</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {checklists.map((checklist) => (
            <li key={checklist._id}>
              <a href={`/checklist/${checklist._id}`}>{checklist.title}</a>
              <a href={`/editor/${checklist._id}`}>Edit</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListOfLists;
