import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {ThemeProvider} from "@mui/material/styles";
import { primaryTheme } from "../App/App";


import { useHistory } from "react-router-dom";
import RegisterFormAdmin from "../RegisterFormAdmin/RegisterFormAdmin";
function RegisterPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div>
      <ThemeProvider theme={primaryTheme}>
      <RegisterFormAdmin />
      <Stack spacing={2}>
        <center>
          <h4>Already Registered?</h4>
          <Button variant="contained" color="pinot" onClick={onLogin}>
            Login
          </Button>
        </center>
      </Stack>
      </ThemeProvider>
    </div>
  );
}

export default RegisterPage;
