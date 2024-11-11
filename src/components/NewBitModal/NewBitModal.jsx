import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import { useContext, useState } from "react";
import { BitContext } from "../../context/bitsContext";
import { db } from "../../database/db.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 10,
  px: 3,
  py: 2,
};

const fetchID = async () => {
  const id = await db.user.where({ id: 1 }).first();
  return id.userID;
};

function NewBitModal({ open, handleClose }) {
  const { bit, setBit } = useContext(BitContext);
  const [text, setText] = useState("");
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmitBit = async () => {
    const { data } = await axios.post(
      "https://api-blissfields-997949264503.southamerica-east1.run.app/bits",
      {
        text,
        user_id: await fetchID(),
      }
    );
    setBit([...bit, data.bits]);
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
          <Typography sx={{ fontSize: "h5.fontSize" }}>Novo Bit</Typography>

          <TextField
            id="outlined-textarea"
            label="Como você se sente hoje?"
            multiline
            rows={4}
            onChange={handleTextChange}
          />
          <Button variant="contained" onClick={handleSubmitBit}>
            Plantar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export { NewBitModal };
