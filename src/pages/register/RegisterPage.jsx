import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

function RegisterPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status } = await axios.post(`${import.meta.env.API_URL}/user`, {
      username,
      email,
      password,
    });
  if(status == 201){
   navigate("/")
}
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Typography
          variant="h4"
          component="h3"
          sx={{ textAlign: "center", fontFamily: "BlissFieldsLogo" }}
        >
          BlissFields
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 1,
              width: "25ch",
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: 3,
            },
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h5" component="h2" sx={{ textAlign: "center" }}>
            Cadastre-se
          </Typography>

          <TextField
            id="username-field"
            label="Nome de usuário"
            variant="standard"
            type="text"
            onChange={handleUsernameChange}
          />

          <TextField
            id="email-field"
            label="Email"
            variant="standard"
            type="email"
            onChange={handleEmailChange}
          />

          <TextField
            id="password-field"
            label="Senha"
            variant="standard"
            type="password"
            onChange={handlePasswordChange}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Entrar
          </Button>
          <Button variant="text" component={Link} to="/">
            Já possui cadastro? Faça login
          </Button>
        </Box>
      </Container>
    </>
  );
}

export { RegisterPage };
