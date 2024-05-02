import React from "react";

import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";
function RegisterClientPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />
      <center>
        Back
      </center>
    </div>
  );
}

export default RegisterClientPage;