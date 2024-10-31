import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useContext } from "react";
import axios from "axios";
import { NoteContext } from "../../context/noteContext.jsx";
import { db } from "../../database/db.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 345,
  bgcolor: "background.paper",
  boxShadow: 10,
  px: 3,
  py: 2,
};

const fetchID = async () => {
  const id = await db.user.where({ id: 1 }).first();
  return id.userID;
};

function NewNoteModal({ open, handleClose }) {
  const { note, setNote } = useContext(NoteContext);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [mood, setMood] = useState("");

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleTextChange = (event) => setText(event.target.value);
  const handleMoodChange = (event) => setMood(event.target.value);

  const handleSaveNote = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(
      "https://api-blissfields-997949264503.southamerica-east1.run.app/notes",
      {
        title,
        text,
        mood,
        user_id: await fetchID(),
      }
    );
    setNote([...note, data.note]);
    handleClose();
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
          component="form"
          sx={{ "& > :not(style)": { mb: 2, width: "100%", height: "100%" } }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h5" component="h2">
            Nova nota
          </Typography>
          <TextField
            id="standard-basic"
            label="Titulo"
            variant="outlined"
            onChange={handleTitleChange}
          />

          <TextField
            id="outlined-textarea"
            label="Como você se sente hoje?"
            multiline
            rows={4}
            onChange={handleTextChange}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Mood</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mood}
              label="mood"
              onChange={handleMoodChange}
            >
              <MenuItem value="Alegre">Alegria 😄</MenuItem>
              <MenuItem value="Raiva">Raiva 😠</MenuItem>
              <MenuItem value="Triste">Tristeza 😢</MenuItem>
              <MenuItem value="Medo">Medo 😢</MenuItem>
              <MenuItem value="Nojo">Nojo 🤢</MenuItem>
              <MenuItem value="Surpresa">Surpresa 😧</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleSaveNote}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export { NewNoteModal };
