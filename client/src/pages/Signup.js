import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

import {
  TextField,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  CardHeader,
  Box,
  Alert,
} from "@mui/material";
import colors from "../assets/styles/colors";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Card>
          <CardHeader title="Signup" />
          <CardContent>
            {data ? (
              <Typography>
                Success! You may now head{" "}
                <Link to="/login">to the login page.</Link>
              </Typography>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <TextField
                  fullWidth
                  sx={{
                    backgroundColor: colors.ice,
                    color: colors.teal,
                    "&:hover": {
                      backgroundColor: colors.lightBlue,
                      color: colors.dark,
                    },
                  }}
                  margin="normal"
                  label="Username"
                  variant="outlined"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  sx={{
                    backgroundColor: colors.ice,
                    color: colors.teal,
                    "&:hover": {
                      backgroundColor: colors.lightBlue,
                      color: colors.dark,
                    },
                  }}
                  margin="normal"
                  label="Email"
                  variant="outlined"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  sx={{
                    backgroundColor: colors.ice,
                    color: colors.teal,
                    "&:hover": {
                      backgroundColor: colors.lightBlue,
                      color: colors.dark,
                    },
                  }}
                  margin="normal"
                  label="Password"
                  variant="outlined"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: colors.teal,
                    color: colors.ice,
                    "&:hover": {
                      backgroundColor: colors.lightBlue,
                      color: colors.dark,
                    },
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            )}

            {error && (
              <Box mt={2}>
                <Alert severity="error">{error.message}</Alert>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Signup;
