import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import BitPostActions from "./BitPostActions";
import axios from "axios";
import { BitContext } from "../../context/bitsContext";
import { useContext } from "react";

function BitPost({ Bit }) {
  const { bit, setBit } = useContext(BitContext);
  const dateFormat = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("pt-br");
  };
  const nameInitialsFormat = (name) => {
    return name.split("")[0].toUpperCase();
  };
  const handleDelete = async (id) => {
    await axios.delete(
      `${import.meta.env.API_URL}/bits/${id}`
    );
    setBit(bit.filter((Bit) => Bit.id !== id));
  };

  return (
    <Card variant="elevation" sx={{ maxWidth: 400, width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {nameInitialsFormat(Bit.user)}
          </Avatar>
        }
        action={
          <BitPostActions
            handleDelete={() => {
              handleDelete(Bit.id);
            }}
            handleEdit
          />
        }
        title={Bit.user}
        subheader={dateFormat(Bit.timestamp)}
      />
      <CardContent>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {Bit.text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export { BitPost };
