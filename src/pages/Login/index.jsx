import React from "react";
import { Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import bgLogin from "../../assets/images/bgLogin.jpg";
import "./Login.scss";
import { auth, googleAuthProvider } from "../../firebase/config";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { addCollection } from "../../firebase/service";
const Login = () => {
  const handelLoginGoogle = async () => {
    const user = await signInWithPopup(auth, googleAuthProvider);
    const userDetail = await getAdditionalUserInfo(user);
    console.log(userDetail);
    if (userDetail?.isNewUser) {
      console.log("add new user");
      addCollection("users", {
        displayName: userDetail.profile.name || "name",
        email: userDetail.profile.email,
        photoUrl: userDetail.profile.picture || "init value",
        uid: user.user.uid,
        providerId: userDetail.providerId,
      });
    } else {
      console.log(`old user`);
    }
  };

  return (
    <div
      className="login-wapper"
      style={{ backgroundImage: `url(${bgLogin})` }}
    >
      <div className="login-space">
        <Typography
          style={{ fontWeight: "bold" }}
          variant="h2"
          component="h2"
          className="login-title"
        >
          Login
        </Typography>
        <Typography
          variant="h4"
          component="h4"
          className="login-subTitle"
          style={{ fontWeight: "bold" }}
        >
          Wellcome back!
        </Typography>

        <div className="login-option">
          <Button
            variant="contained"
            color="error"
            startIcon={<GoogleIcon />}
            onClick={handelLoginGoogle}
          >
            Login with Google
          </Button>
          <Button variant="contained" startIcon={<FacebookIcon />}>
            Login with Facebook
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
