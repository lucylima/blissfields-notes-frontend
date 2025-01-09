import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { BitPost } from "../../components/BitPost/BitPost.jsx";
import { Header } from "../../components/Header/Header.jsx";
import { Navigation } from "../../components/Navigation/Navigation.jsx";
import { NewBitModal } from "../../components/NewBitModal/NewBitModal.jsx";
import { useState, useContext, useEffect } from "react";
import { BitContext } from "../../context/bitsContext.jsx";
import { useNavigate } from "react-router-dom";
import { db } from "../../database/db.js";

import axios from "axios";

function BlissFieldsPage() {
  const navigate = useNavigate();
  const { bit, setBit } = useContext(BitContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchID = async () => {
      const id = await db.user.where({ id: 1 }).first();
      return id.userID;
    };
    const fetchBits = async () => {
      const { data } = await axios.get(
       `${import.meta.env.VITE_API_URL}/bits` 
      );
      setBit([...data.bits]);
    };
    fetchID() == null ? navigate("/") : fetchBits();
  });

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 3,
          marginBottom: 10,
          gap: 3,
          width: "100%",
        }}
      >
        {bit.map((bit) => {
          return (
            <BitPost
              key={bit.bits_id}
              Bit={{
                id: bit.bits_id,
                initials: bit.initials,
                user: bit.User.username,
                text: bit.text,
                timestamp: bit.createdAt,
              }}
            />
          );
        })}
      </Box>
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
      <NewBitModal open={open} handleClose={handleClose}></NewBitModal>
      <Navigation />
    </>
  );
}

export { BlissFieldsPage };
