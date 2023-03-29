import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../utils/auth";
import colors from "../assets/styles/colors";

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
        <AppBar position="static" sx={{ backgroundColor: colors.ice }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontSize: "36px",
                color: colors.gray,
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: colors.gray,
                }}
              >
                Checklistle
              </Link>
            </Typography>
            <Button
              sx={{
                backgroundColor: colors.teal,
                color: colors.ice,
                "&:hover": {
                  // Add this block for the hover effect
                  backgroundColor: colors.lightBlue,
                  color: colors.dark,
                },
              }}
              onClick={toggleAuthentication}
            >
              {isAuthenticated ? "Logout" : "Login"}
            </Button>
            {!isAuthenticated && (
              <Button
                sx={{
                  backgroundColor: colors.teal,
                  color: colors.ice,
                  "&:hover": {
                    // Add this block for the hover effect
                    backgroundColor: colors.lightBlue,
                    color: colors.dark,
                  },
                }}
                onClick={handleSignUp}
              >
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
