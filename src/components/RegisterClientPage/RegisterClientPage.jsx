import React from "react";

import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { primaryTheme } from "../App/App";

function RegisterClientPage() {
  const history = useHistory();

  return (
    <div>
      <ThemeProvider theme={primaryTheme}>
        <RegisterForm />
        <center>
          <Button color="pinot" onClick={() => {
            history.push("/admin_user");
          }}>Back</Button>
        </center>
      </ThemeProvider>
    </div>
  );
}

export default RegisterClientPage;
