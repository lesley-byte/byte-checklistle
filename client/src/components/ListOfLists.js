import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";

import AuthService from "../utils/auth";

import { QUERY_CHECKLISTS } from "../utils/queries";
import { DELETE_CHECKLIST } from "../utils/mutations";

const ListOfLists = () => {
  const user = AuthService.getProfile();
  const userId = user._id;
  console.log("UserId:", userId);

  const { loading, error, data, refetch } = useQuery(QUERY_CHECKLISTS, {
    variables: { userId },
    notifyOnNetworkStatusChange: true,
  });

  const checklists = data?.checklists || [];
  console.log("Checklists:", checklists || "No checklists found to display");
  console.log("Error:", error || "No error found");

  const navigate = useNavigate();

  const [deleteChecklist] = useMutation(DELETE_CHECKLIST, {
    update(cache, { data: { deleteChecklist } }) {
      const userId = AuthService.getUser()._id;
      const data = cache.readQuery({
        query: QUERY_CHECKLISTS,
        variables: { userId },
      });

      const updatedChecklists = data.checklists.filter(
        (checklist) => checklist._id !== deleteChecklist._id
      );

      cache.writeQuery({
        query: QUERY_CHECKLISTS,
        variables: { userId },
        data: { checklists: updatedChecklists },
      });
    },
    onCompleted: () => refetch(),
  });

  const handleDelete = async (checklistId) => {
    console.log(
      "Delete checklist:",
      checklistId || "No checklist ID found to delete"
    );
    try {
      await deleteChecklist({
        variables: { checklistId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (checklistId) => {
    console.log(
      "Edit checklist:",
      checklistId || "No checklist ID found to edit"
    );
    navigate(`/editor/${checklistId}`);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Checklists
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {checklists.map((checklist) => (
            <ListItem key={checklist._id}>
              <Link
                to={`/checklist/${checklist._id}`}
                style={{ textDecoration: "none" }}
              >
                <ListItemText primary={checklist.title} />
              </Link>
              <ListItemSecondaryAction>
                <Button
                  color="secondary"
                  onClick={() => handleEdit(checklist._id)}
                >
                  Edit
                </Button>
                <Button
                  color="error"
                  onClick={() => handleDelete(checklist._id)}
                >
                  Delete
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ListOfLists;
