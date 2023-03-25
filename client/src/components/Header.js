import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Iceland', sans-serif",
  },
});

const Header = () => {
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
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default Header;
