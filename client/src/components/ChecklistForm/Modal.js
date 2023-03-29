import React from "react";
import { Dialog, Typography, Box, Button } from "@mui/material";
import colors from "../../assets/styles/colors";

const Modal = ({ isModalOpen, setIsModalOpen, modalText }) => {
  return (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">{modalText}</Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Button
          sx={{
            backgroundColor: colors.teal,
            color: colors.ice,
            "&:hover": {
              backgroundColor: colors.lightBlue,
              color: colors.dark,
            },
          }}
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </Button>
      </Box>
    </Dialog>
  );
};

export default Modal;
