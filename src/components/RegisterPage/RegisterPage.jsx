import React from "react";

import { useHistory } from "react-router-dom";
import RegisterFormAdmin from "../RegisterFormAdmin/RegisterFormAdmin";
function RegisterPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div>
      <RegisterFormAdmin />
      <center>
        <h4>Already Registered?</h4> 
        <span className="btn btn_sizeSm" onClick={onLogin} >
          Login
        </span>
      </center>
    </div>
  );
}

export default RegisterPage;
