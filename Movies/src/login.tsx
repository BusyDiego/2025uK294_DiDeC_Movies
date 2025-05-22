import { useState } from "react";
import axios from "axios";
import "./login.css";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MoviesProxy } from "./movies.tsx";
import { baseInstance } from "./Api";
import LoginService from "./loginService.tsx";

function Login() {
  const baseURL = "http://localhost:3030";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLog, setErrorLog] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);

    LoginService()
      .login(email, password)
      .then(() => {
        console.log("Login successful");
        navigate("/homepage", { replace: true });
      })
      .catch((error) => {
        console.error("Login failed", error);
        setErrorLog("Login failed, please check your Mail and Password.");
      });
  };

  return (
    <>
      <Box>
        <h1>Login</h1>
      </Box>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" onSubmit={handleLogin}>
          Login
        </Button>
        <Button onClick={() => navigate("/register")}>
          Noch kein Account? Jetzt registrieren
        </Button>
        {errorLog && <Typography color="error">{errorLog}</Typography>}
      </Box>
    </>
  );
}

export default Login;
