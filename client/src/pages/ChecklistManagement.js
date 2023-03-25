import React from "react";
import { Container, Typography, Box } from "@mui/material";
import New from "../components/New";
import ListOfLists from "../components/ListOfLists";

const ChecklistManagement = () => {
  return (
    <Container maxWidth="md" sx={{ minHeight: "80vh" }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Checklist Management
      </Typography>
      <Box mt={4}>
        <New />
      </Box>
      <Box mt={4}>
        <ListOfLists />
      </Box>
    </Container>
  );
};

export default ChecklistManagement;
