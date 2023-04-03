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
        backgroundSize: { xs: "55%", sm: "contain" }, // Shrink the image to 70% of its original size on small screens
        backgroundPosition: { xs: "center 80%", sm: "right center" }, // Move the image down on small screens
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          position: "absolute", // Add position absolute to this Box
          top: { xs: "0%", sm: "10%" }, // Adjust the percentage to move the content vertically
          left: { xs: "50%", sm: "2%" }, // Adjust the percentage to move the content horizontally
          transform: { xs: "translateX(-50%)", sm: "none" }, // Center the content horizontally on small screens
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust the color and opacity to your preference
          borderRadius: "1rem", // Optional: add some border radius to the overlay box
          padding: "2rem", // Add some padding to the overlay box
          maxWidth: { xs: "90%", sm: "none" }, // Limit the width of the content on small screens
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
