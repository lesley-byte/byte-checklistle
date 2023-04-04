import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import colors from "../assets/styles/colors";
import {
  saveChecklistsToLocalStorage,
  getChecklistsFromLocalStorage,
} from "../utils/localStorageUtils";

const ListOfPlaygroundLists = ({ onUpdate, checklists, startTutorial }) => {
  const navigate = useNavigate();
  const key = "playgroundChecklists";
  // const [checklists, setChecklists] = useState(getChecklistsFromLocalStorage());

  if (!Array.isArray(checklists)) {
    console.error("Checklists is not an array:", checklists);
    return null;
  }

  const handleDelete = (checklistId) => {
    const updatedChecklists = checklists.filter(
      (checklist) => checklist._id !== checklistId
    );
    saveChecklistsToLocalStorage(updatedChecklists);
    // setChecklists(updatedChecklists); // Update the state to trigger a re-render
  onUpdate(); // Call the onUpdate function to update the checklists in the parent component
  };

  const handleEdit = (checklistId) => {
    console.log(
      "Edit checklist:",
      checklistId || "No checklistId found to edit"
    );
    console.log(
      "Checklist object:",
      checklistId || "No checklist found to edit"
    );
    navigate(`/playground/editor/${checklistId}`);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Checklists
      </Typography>
      <List>
        {checklists.map((checklist) => (
          <ListItem key={checklist._id}>
            <Link
              to={`/playground/checklist/${checklist._id}`} // Change the path here
              style={{ textDecoration: "none" }}
            >
              <ListItemText primary={checklist.title} />
            </Link>
            <ListItemSecondaryAction>
              <Button
              id="edit-button"
                sx={{
                  backgroundColor: colors.teal,
                  color: colors.ice,
                  "&:hover": {
                    backgroundColor: colors.lightBlue,
                    color: colors.dark,
                  },
                }}
                onClick={() => handleEdit(checklist._id)}
              >
                Edit
              </Button>
              <Button
              id="delete-button"
                sx={{
                  backgroundColor: colors.yellow,
                  color: colors.dark,
                  "&:hover": {
                    backgroundColor: colors.putty,
                    color: colors.brown,
                  },
                }}
                onClick={() => handleDelete(checklist._id)}
              >
                Delete
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ListOfPlaygroundLists;
