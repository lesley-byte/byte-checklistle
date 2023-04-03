import React from "react";
import { Link } from "react-router-dom";
import { Box, Tabs, Tab } from "@mui/material";
import authService from "../utils/auth";

const NavTabs = () => {
  const loggedIn = authService.loggedIn();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Tabs value={false} indicatorColor="primary" textColor="primary" centered>
        {loggedIn && (
          <Tab
            label="Home"
            component={Link}
            to="/"
            sx={{ textDecoration: "none" }}
          />
        )}
        {loggedIn && (
          <Tab
            label="Checklist Management"
            component={Link}
            to="/checklistManagement"
            sx={{ textDecoration: "none" }}
          />
        )}
        {loggedIn && (
          <Tab
            label="Help"
            component={Link}
            to="/help"
            sx={{ textDecoration: "none" }}
          />
        )}
        {!loggedIn && (
          <Tab
            label="Test Playground"
            component={Link}
            to="/playground/checklistManagement"
            sx={{ textDecoration: "none" }}
          />
        )}
      </Tabs>
    </Box>
  );
};

export default NavTabs;
