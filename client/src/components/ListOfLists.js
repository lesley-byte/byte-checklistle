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
