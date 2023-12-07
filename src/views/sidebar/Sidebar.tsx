import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../route/Constants";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import { Modal, Typography, Button } from "@mui/material";

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleErrorOpen = () => setOpenError(true);
  const handleErrorClose = () => setOpenError(false);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handlePageChange = (text: string) => {
    const userRole = localStorage.getItem("role");
    const restrictedPagesOwners = ["Owners", "Owner Orders"];
    const restrictedPagesUsers = ["My Orders"];

    if (restrictedPagesOwners.includes(text) && userRole !== "owner") {
      handleErrorOpen();
      return;
    }

    if (restrictedPagesUsers.includes(text) && userRole !== "user") {
      handleErrorOpen();
      return;
    }
    navigate(text);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(ROUTES.SIGN_IN);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: "100vh" }}>
      <Box
        component="img"
        src="https://parko.in/assets/img/parko_logo.png"
        sx={{ width: drawerWidth, p: 3 }}
      ></Box>

      <List>
        {["Dashboard", "My Orders", "Profile"].map((text, index) => (
          <ListItem
            sx={{ color: "black" }}
            key={text}
            onClick={() => handlePageChange(text)}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? (
                  <DashboardIcon />
                ) : index === 1 ? (
                  <DriveEtaIcon />
                ) : (
                  <PersonIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: "white" }} />
      <List>
        {["Owners", "Owner Orders"].map((text, index) => (
          <ListItem
            sx={{ color: "black" }}
            key={index}
            onClick={() => handlePageChange(text)}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: "white" }} />

      <ListItemButton onClick={handleOpen}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary={"Logout"} />
      </ListItemButton>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{ bgcolor: "#F6F6F6", display: { xs: "flex", sm: "none" } }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "grey" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            position: "sticky",
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            position: "sticky",
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "80%", sm: "40%" },
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirm Logout
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to logout?
            </Typography>
            <Box sx={{ mt: 2 }}></Box>
            <Button variant="outlined" onClick={handleLogout}>
              Yes
            </Button>

            <Button sx={{ ml: 2 }} variant="outlined" onClick={handleClose}>
              No
            </Button>
          </Box>
        </Modal>

        <Modal
          open={openError}
          onClose={handleErrorClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "80%", sm: "40%" },
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Unauthorised Access
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              You do not have access to this page, please contact admin to know
              more about your roles.
            </Typography>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
