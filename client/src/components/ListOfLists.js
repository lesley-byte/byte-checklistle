import React, { useState } from "react";

import { useQuery } from "@apollo/client";

import { QUERY_CHECKLISTS } from "../utils/queries";

const ListOfLists = () => {
  const { loading, data } = useQuery(QUERY_CHECKLISTS);

  const checklists = data?.checklists || [];

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>This is ListOfLists</h2>
          {checklists &&
            checklists.map((checklist) => (
              <div>{checklist.title}</div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ListOfLists;
