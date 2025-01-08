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
  outline: 0,
};

const fetchID = async () => {
  const id = await db.user.where({ id: 1 }).first();
  return id.userID;
};

function EditNoteModal({ open, handleClose, fields }) {
  const { note, setNote } = useContext(NoteContext);

  const [title, setTitle] = useState(fields.title);
  const [text, setText] = useState(fields.text);
  const [mood, setMood] = useState(fields.mood);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleTextChange = (event) => setText(event.target.value);
  const handleMoodChange = (event) => setMood(event.target.value);

  const handleSaveNote = async (event) => {
    event.preventDefault();
    await axios.put(
      `${import.meta.env.API_URL}/notes/${fields.id}`,
      {
        title,
        text,
        mood,
      }
    );
    const { data } = await axios.get(
      `${import.meta.env.API_URL}/notes/${fetchID()}`
    );
    setNote([...data.notes]);
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
            Editar nota
          </Typography>
          <TextField
            id="standard-basic"
            label="Titulo"
            variant="outlined"
            onChange={handleTitleChange}
            value={title}
          />

          <TextField
            id="outlined-textarea"
            label="Como você se sente hoje?"
            multiline
            rows={4}
            onChange={handleTextChange}
            value={text}
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

export { EditNoteModal };
