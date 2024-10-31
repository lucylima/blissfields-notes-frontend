import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useColorScheme } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: 0,
};

const fetchID = async () => {
  const id = await db.user.where({ id: 1 }).first();
  return id.userID;
};

function SettingsModal({ onClose, selectedValue, open }) {
  const { mode, setMode } = useColorScheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (!mode) {
    return null;
  }

  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handleSaveAccount = async () => {
    const { status } = await axios.put(
      `https://api-blissfields-997949264503.southamerica-east1.run.app/${await fetchID()}`,
      {
        username,
        password,
      }
    );
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Configurações
          </Typography>
          <FormControl
            sx={{
              gap: 3,
            }}
          >
            <Typography variant="h7" component="p">
              Conta
            </Typography>

            <TextField
              id="outlined-username-input"
              label="Nome de usuário"
              type="text"
              onChange={handleUsernameChange}
            />

            <TextField
              id="outlined-password-input"
              label="Senha"
              type="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
          </FormControl>

          <FormControl>
            <Typography variant="h7" component="p">
              Modo escuro
            </Typography>
            <RadioGroup
              aria-labelledby="theme-toggle"
              name="theme-toggle"
              value={mode}
              onChange={(event) => setMode(event.target.value)}
            >
              <FormControlLabel
                value="system"
                control={<Radio />}
                label="Sistema"
              />
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Claro"
              />
              <FormControlLabel
                value="dark"
                control={<Radio />}
                label="Escuro"
              />
            </RadioGroup>
          </FormControl>
          <Button variant="contained" onClick={handleSaveAccount}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export { SettingsModal };
