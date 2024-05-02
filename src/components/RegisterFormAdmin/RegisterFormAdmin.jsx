import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// install sweetalerts
import Swal from "sweetalert2";

import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { primaryTheme } from "../App/App";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function RegisterFormAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
    Swal.fire({
      title: "Admin registered successfully",
      icon: "success",
    });
  }; // end registerUser

  return (
    <ThemeProvider theme={primaryTheme}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "25ch" },
        }}
        autoComplete="on"
        onSubmit={registerUser}
      >
        <center>
          <h2>Admin Registration</h2>
          {errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {errors.registrationMessage}
            </h3>
          )}
          <div>
            <TextField
              required
              label="Username"
              variant="outlined"
              type="username"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <Button
              variant="contained"
              size="large"
              color="pinot"
              type="submit"
              name="submit"
              value="Register"
            >
              Register
            </Button>
          </div>
        </center>
      </Box>
    </ThemeProvider>
  );
}

export default RegisterFormAdmin;
