import React from "react";
import { Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import "./Login.scss";
const Login = () => {
  return (
    <div className="login-wapper">
      <div className="login-space">
        <Typography variant="h2" component="h2" className="login-title">
          Login
        </Typography>
        <Typography
          variant="subtitle2"
          component="h2"
          className="login-subTitle"
        >
          Wellcome back!
        </Typography>

        <div className="login-option">
          <Button variant="contained" color="error">
            Login with Google
          </Button>
          <Button variant="contained">Login with Facebook</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
