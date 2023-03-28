import React from "react";
import { Typography, Box } from "@mui/material";
import backgroundImage from "../assets/images/backgroundImage.png";
const Landing = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "contain",
        backgroundPosition: "right center", // Change this to move the image to the right side
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          position: "absolute", // Add position absolute to this Box
          top: "10%", // Adjust the percentage to move the content vertically
          left: "18%", // Adjust the percentage to move the content horizontally
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust the color and opacity to your preference
          borderRadius: "1rem", // Optional: add some border radius to the overlay box
          padding: "2rem", // Add some padding to the overlay box
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Checklistle
        </Typography>
        <Typography variant="h5" gutterBottom>
          The smart way to manage your checklists
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ maxWidth: "500px", mx: "auto" }}
        >
          Create conditional procedural checklists for complex workflows with
          Checklistle. Streamline your processes and increase efficiency.
        </Typography>
      </Box>
    </Box>
  );
};

export default Landing;
