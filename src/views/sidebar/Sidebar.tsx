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
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FaceIcon from "@mui/icons-material/Face";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F6F6F6", //alpha(theme.palette.common.white, 0.15), bgcolor:
  "&:hover": {
    backgroundColor: "#F6F6F6", //alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "40%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: "100vh", bgcolor: "#232b2b" }}>
      <Box
        component="img"
        src="https://parko.in/assets/img/parko_logo.png"
        sx={{ width: drawerWidth, p: 3 }}
      ></Box>

      {/* <Divider /> */}
      <List>
        {["Dashboard", "Profile", "Settings"].map((text, index) => (
          <ListItem sx={{ color: "white" }} key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? (
                  <DashboardIcon sx={{ color: "white" }} />
                ) : index === 1 ? (
                  <FaceIcon sx={{ color: "white" }} />
                ) : (
                  <SettingsApplicationsIcon sx={{ color: "white" }} />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: "white" }} />
      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon sx={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText sx={{ color: "white" }} primary={"Logout"} />
      </ListItemButton>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ bgcolor: "white" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "grey" }}
          >
            <MenuIcon />
          </IconButton>
          <Search sx={{ m: 2 }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "grey" }} />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{ color: "grey" }}
              placeholder="Location"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
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
      </Box>
    </Box>
  );
}
