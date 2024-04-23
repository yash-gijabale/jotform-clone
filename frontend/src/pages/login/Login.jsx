import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import { login } from "../../action/userAction";

const LoginForm = () => {
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    let userData = Object.fromEntries(new FormData(e.target));
    console.log(userData);
    dispatch(login(userData));
  };

  return (
    <Fragment>
      <Typography
        component="h2"
        id="modal-title"
        level="h2"
        textColor="inherit"
        fontWeight="lg"
        mb={1}
      >
        Log In
      </Typography>
      <Stack spacing={2}>
        <form onSubmit={(e) => handleLogin(e)}>
          <Input
            size="md"
            placeholder="Email"
            name="email"
            type="email"
            sx={{ marginBottom: "10px" }}
          />
          <Input
            size="md"
            placeholder="Password"
            name="password"
            type="password"
            sx={{ marginBottom: "10px" }}
          />
          <Button
            variant="solid"
            type="submit"
            className="btn_dark"
            sx={{ width: "30%" }}
          >
            Login
          </Button>
        </form>
      </Stack>
    </Fragment>
  );
};

const SignupForm = () => {
  return (
    <Fragment>
      <Typography
        component="h2"
        id="modal-title"
        level="h2"
        textColor="inherit"
        fontWeight="lg"
        mb={1}
      >
        Sign Up
      </Typography>
      <Stack spacing={2}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <Input
            size="md"
            placeholder="First Name"
            name="firstName"
            type="text"
            sx={{ width: "50%" }}
          />
          <Input
            size="md"
            placeholder="Last Name"
            name="lastName"
            type="text"
            sx={{ width: "50%" }}
          />
        </div>
        <Input size="md" placeholder="Email" name="email" type="email" />
        <Input
          size="md"
          placeholder="Password"
          name="password"
          type="password"
        />
        <Button variant="solid" className="btn_primary" sx={{ width: "30%" }}>
          Sign up
        </Button>
      </Stack>
    </Fragment>
  );
};

const Login = () => {
  const [open, setOpen] = useState(false);
  const [modal, SetModal] = useState("login");
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      console.log(user);
      navigate("myforms");
    }
    if (error) {
      console.log(error);
    }
  }, [user, loading, error]);
  return (
    <div className="login_page">
      <div className="hero_container">
        <h5>Easiest Online Form Builder</h5>
        <h3>Create your own form and share</h3>
      </div>
      <div className="login_container">
        <button
          className="login_btn"
          onClick={() => {
            setOpen(true);
            SetModal("login");
          }}
        >
          Login
        </button>
        <button
          className="sign_btn"
          onClick={() => {
            setOpen(true);
            SetModal("signup");
          }}
        >
          Signin
        </button>
      </div>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            width: "30%",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          {modal === "login" ? <LoginForm /> : <SignupForm />}
        </Sheet>
      </Modal>
    </div>
  );
};

export default Login;
