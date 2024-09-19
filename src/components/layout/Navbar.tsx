"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Image from "next/image";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuApp from "./MenuApp";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const router = useRouter();

  const open = Boolean(anchorEl);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onCLickLogout = () => {
    router.push("/auth/login");
    localStorage.removeItem("token");
    Cookies.remove("token");
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          zIndex: 100,
          position: "fixed",
          top: 0,
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/logo.svg"
              alt="Logo"
              width={140}
              height={100}
              priority
              className="w-auto h-auto"
            />
          </Box>
          <Box sx={{ flexGrow: 1, paddingLeft: 20 }}>
            <TextField
              autoComplete="off"
              placeholder="Press / to search"
              variant="outlined"
              sx={{
                "& .MuiInputBase-root": {
                  height: "32px",
                  width: "300px",
                  borderRadius: 200,
                  paddingLeft: 1,
                  backgroundColor: "#ECF0F4",
                },
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <div>
            <NotificationsNoneIcon
              sx={{
                color: "#475569",
              }}
            />
            <AccountCircleIcon
              sx={{
                color: "#475569",
                marginLeft: "16px",
              }}
            />
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleMenu}
              sx={{
                color: "#475569",
                textTransform: "none",
              }}
              endIcon={anchorEl ? <ExpandLess /> : <ExpandMore />}
            >
              Admintractor
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={onCLickLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <MenuApp toggleDrawer={toggleDrawer} openDrawer={openDrawer} />
    </Box>
  );
}
