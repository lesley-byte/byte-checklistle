import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AuthService from "../utils/auth";

const theme = createTheme({
  typography: {
    fontFamily: "'Iceland', sans-serif",
  },
});

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const toggleAuthentication = () => {
    if (isAuthenticated) {
      AuthService.logout();
    } else {
      navigate("/login");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const checkAuthStatus = () => {
    const loggedIn = AuthService.loggedIn();
    setIsAuthenticated(loggedIn);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Iceland&display=swap');
      </style>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontSize: "36px" }}
            >
              Checklistle
            </Typography>
            <Button color="inherit" onClick={toggleAuthentication}>
              {isAuthenticated ? "Logout" : "Login"}
            </Button>
            {!isAuthenticated && (
              <Button color="inherit" onClick={handleSignUp}>
                Sign Up
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default Header;
