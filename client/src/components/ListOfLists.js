import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

import { QUERY_CHECKLISTS } from "../utils/queries";
import { DELETE_CHECKLIST } from "../utils/mutations";

const ListOfLists = () => {
  const { loading, data, refetch } = useQuery(QUERY_CHECKLISTS);
  const checklists = data?.checklists || [];
  const navigate = useNavigate();

  const [deleteChecklist] = useMutation(DELETE_CHECKLIST, {
    onCompleted: () => refetch(),
  });

  const handleDelete = async (checklistId) => {
    try {
      await deleteChecklist({
        variables: { checklistId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (checklistId) => {
    navigate(`/editor/${checklistId}`);
  };

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
              <button onClick={() => handleEdit(checklist._id)}>Edit</button>
              <button onClick={() => handleDelete(checklist._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ListOfLists;
