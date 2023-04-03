import React from "react";
import { Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#f5f5f5", py: 2 }}>
      <Typography variant="body1" align="center">
        &copy; {new Date().getFullYear()} Checklistle made with{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>
        by <a href="https://github.com/lesley-byte">Lesley</a>
        
      </Typography>
    </Box>
  );
};

export default Footer;
