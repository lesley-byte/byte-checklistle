import React from "react";
import { Dialog, Box, Typography, Button } from "@mui/material";

const ChecklistModal = ({ isOpen, onClose, text }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">{text}</Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Dialog>
  );
};

export default ChecklistModal;
