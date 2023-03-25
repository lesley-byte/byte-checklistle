import React from "react";
import { Link } from "react-router-dom";
import { Box, Tabs, Tab } from "@mui/material";

const NavTabs = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Tabs value={false} indicatorColor="primary" textColor="primary" centered>
        <Tab
          label="Home"
          component={Link}
          to="/"
          sx={{ textDecoration: "none" }}
        />
        <Tab
          label="ChecklistManagement"
          component={Link}
          to="/checklistManagement"
          sx={{ textDecoration: "none" }}
        />
      </Tabs>
    </Box>
  );
};

export default NavTabs;
