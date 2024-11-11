import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";
import { db } from "../../database/db";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [erorrMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError(true);
      setErrorMessage("Senha e email são obrigatórios");
    }

    if (email || password) {
      try {
        const { data } = await axios.post(
          "https://api-blissfields-997949264503.southamerica-east1.run.app/login",
          {
            email,
            password,
          }
        );

        await db.user.add({
          id: 1,
          userID: data.user.user_id,
        });

        setTimeout(() => {
          navigate("/notes");
        }, 500);
        
      } catch (e) {

        if (e.status === 404 || e.status === 400) {
          setErrorMessage("Dados incorretos, usuário não encontrado");
          setError(true);
        }

        if (e.status === 500) {
          setErrorMessage("Erro no servidor");
        }
      }
    }
  };

  return (
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
        sx={{
          textAlign: "center",
          fontFamily: "BlissFieldsLogo",
          pointerEvents: "none",
        }}
      >
        BlissFields
      </Typography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "16rem",
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
          Login
        </Typography>
        <TextField
          id="email-field"
          label="Email"
          variant="standard"
          type="email"
          onChange={handleEmailChange}
          error={error}
        />

        <TextField
          id="password-field"
          label="Senha"
          variant="standard"
          type="password"
          onChange={handlePasswordChange}
          error={error}
        />
        <FormHelperText>{erorrMessage}</FormHelperText>
        <Button variant="contained" onClick={handleSubmit}>
          Entrar
        </Button>
        <Button variant="text" component={Link} to="/register">
          Não possui login? Cadastre-se
        </Button>
      </Box>
    </Container>
  );
}

export { LoginPage };
