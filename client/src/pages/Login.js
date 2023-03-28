import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

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

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Card>
          <CardHeader title="Login" />
          <CardContent>
            {data ? (
              <Typography>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </Typography>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <TextField
                  fullWidth
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
                  color="primary"
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

export default Login;
