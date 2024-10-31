import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { SettingsModal } from "../SettingsModal/SettingsModal.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../database/db.js";

const pages = ["Notas", "BlissBits"];
const settings = ["Configurações", "Logout"];

function Header() {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClose = (value) => {
    setDialogOpen(false);
    setSelectedValue(value);
  };

  const handlePageClick = (event) => {
    const menu = event.currentTarget.innerText;
    switch (menu) {
      case "NOTAS":
        navigate("/notes");
        break;
      case "BLISSBITS":
        navigate("/blissfields");
        break;
    }
  };

  const handleCloseUserMenu = async (event) => {
    const menu = event.currentTarget.innerText;
    switch (menu) {
      case "Conta":
        break;
      case "Configurações":
        setDialogOpen(true);
        break;
      case "Logout":
        await db.user.clear();
        navigate("/");
        break;
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="h2"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "BlissFieldsLogo",
              color: "inherit",
              pointerEvents: "none",
            }}
          >
            BlissFields
          </Typography>

          <Typography
            variant="h4"
            noWrap
            component="h2"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "BlissFieldsLogo",
              color: "inherit",
              pointerEvents: "none",
            }}
          >
            BlissFields
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handlePageClick}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Configurações">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user initials"></Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        <SettingsModal
          selectedValue={selectedValue}
          open={dialogOpen}
          onClose={handleClose}
        />
      </Container>
    </AppBar>
  );
}
export { Header };
