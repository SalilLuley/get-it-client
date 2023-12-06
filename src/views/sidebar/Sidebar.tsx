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
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NETWORKING_CONTSTANTS } from "../../network/Common.tsx";
import { ROUTES } from "../../route/Constants";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
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
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handlePageChange = (text: string) => {
    const userRole = localStorage.getItem("role");
    console.log(userRole);
    const restrictedPages = ["Owners"];
    // Check if the user has access to the page
    if (restrictedPages.includes(text) && userRole !== "owner") {
      // If the user does not have access, show an error message and return
      alert(
        "Only users with role Owners can add parking spots, please contact admin to change your role."
      );
      return;
    }
    navigate(text);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [parkingSpots, setParkingSpots] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        NETWORKING_CONTSTANTS.BASE_URL + NETWORKING_CONTSTANTS.PARKING.GET_ALL,
        config
      )
      .then((data: any) => {
        const parkingSpots: any[] = data.data.data;
        const spots: any = parkingSpots.map((item: any) => {
          console.log("item", item.title);
          return {
            label: item.title,
            id: item.id,
          };
        });
        setParkingSpots(spots);
      })
      .catch((error) => {
        console.log("Error me", error);
        if (error.code === "ERR_BAD_REQUEST") {
          navigate(ROUTES.SIGN_IN, { replace: true });
        }
      });
  }, []);

  const drawer = (
    <Box sx={{ height: "100vh" }}>
      <Box
        component="img"
        src="https://parko.in/assets/img/parko_logo.png"
        sx={{ width: drawerWidth, p: 3 }}
      ></Box>

      <List>
        {["Dashboard", "Profile"].map((text, index) => (
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
                  <PersonIcon />
                ) : (
                  <SettingsApplicationsIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: "white" }} />
      <List>
        {["Owners"].map((text, index) => (
          <ListItem
            sx={{ color: "black" }}
            key={text}
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

      <ListItemButton>
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
          {/* <Autocomplete
            disablePortal
            onChange={(event: any, newValue: any) => {
              console.log("newValue", newValue);
              navigate(ROUTES.DETAIL, {
                state: { id: newValue.id },
                replace: true,
              });
            }}
            id="combo-box-demo"
            options={parkingSpots}
            sx={{ width: 300, mt: 1, ml: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Locations" />
            )}
          /> */}
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
      </Box>
    </Box>
  );
}
