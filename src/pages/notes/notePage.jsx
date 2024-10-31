import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import { Header } from "../../components/Header/Header.jsx";
import { useContext, useEffect, useState } from "react";
import { Navigation } from "../../components/Navigation/Navigation.jsx";
import { Note } from "../../components/Note/Note.jsx";
import { NewNoteModal } from "../../components/NewNoteModal/NewNoteModal.jsx";
import { NoteContext } from "../../context/noteContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const userID = sessionStorage.getItem("userId");

function NotePage() {
  const navigate = useNavigate();
  const { note, setNote } = useContext(NoteContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getNotes = async () => {
      const { data } = await axios.get(
        `https://api-blissfields-997949264503.southamerica-east1.run.app/notes/${userID}`
      );
      setNote([...data.notes]);
    };
    if (userID) {
      getNotes();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header />
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: { md: "flex-start", xs: "flex-start" },
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: 3,
          gap: 2,
          marginBottom: 8,
        }}
      >
        {note.map((note) => {
          return (
            <Note
              key={note.notes_id}
              Note={{
                id: note.notes_id,
                title: note.title,
                text: note.text,
                mood: note.mood,
                timestamp: note.createdAt,
              }}
            />
          );
        })}
      </Container>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        sx={{
          position: "fixed",
          bottom: 85,
          right: 50,
        }}
      >
        <AddIcon />
      </Fab>
      <NewNoteModal open={open} handleClose={handleClose} />
      <Navigation />
    </>
  );
}

export { NotePage };
