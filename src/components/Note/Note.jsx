import Paper from "@mui/material/Paper";
import NoteActions from "./NoteActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useContext, useState } from "react";
import { NoteContext } from "../../context/noteContext.jsx";
import { EditNoteModal } from "../EditNoteModal/EditNoteModal.jsx";

const dateFormat = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("pt-br");
};

function Note({ Note }) {
  const { note, setNote } = useContext(NoteContext);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpen = () => setOpenEditModal(true);
  const handleClose = () => setOpenEditModal(false);

  const handleDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/notes/${id}`);
    setNote(note.filter((n) => n.notes_id !== id));
  };

  return (
    <Paper
      elevation={4}
      sx={{
        width: { sm: "17rem", xs: "100%" },
        height: "auto",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: ".4rem",
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          fontWeight={500}
          sx={{ width: "100%" }}
        >
          {Note.title}
        </Typography>
        <NoteActions
          handleDelete={() => {
            handleDelete(Note.id);
          }}
          handleEdit={handleOpen}
        />
      </Box>
      <Typography
        variant="body1"
        sx={{
          textAlign: "left",
          width: "100%",
          marginBottom: "1rem",
          wordWrap: "break-word",
          height: "auto",
        }}
      >
        {Note.text}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="body2">{Note.mood}</Typography>
        <Typography variant="body2">{dateFormat(Note.timestamp)}</Typography>
      </Box>
      <EditNoteModal
        open={openEditModal}
        handleClose={handleClose}
        fields={{
          id: Note.id,
          title: Note.title,
          text: Note.text,
          mood: Note.mood,
        }}
      />
    </Paper>
  );
}

export { Note };
