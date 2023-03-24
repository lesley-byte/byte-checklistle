import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { QUERY_CHECKLISTS } from "../utils/queries";

const ListOfLists = () => {
  const { loading, data } = useQuery(QUERY_CHECKLISTS);
  console.log("data: ", data);

  const checklists = data?.checklists || [];
  console.log("checklists: ", checklists);

  return (
    <>
      <h2>Checklists</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {checklists.map((checklist) => (
            <li key={checklist._id}>
              <Link to={`/checklist/${checklist._id}`}>{checklist.title}</Link>
              <Link to={`/editor/${checklist._id}`}> Edit</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ListOfLists;
