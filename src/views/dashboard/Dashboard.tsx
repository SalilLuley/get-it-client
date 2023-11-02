import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import ActionAreaCard from "../../components/card/Card";
import { Box, List, ListItem } from "@mui/material";

export default function Dashboard() {
  let currentWindow = false;

  return (
    <Grid container display={"flex"} xs={12}>
      <Sidebar></Sidebar>

      <Container
        sx={{
          display: "flex",
          bgcolor: "#f6f6f6",
          justifyContent: "flex-start",
        }}
      >
        <List sx={{ m: 2, mt: 10, p: 2 }}>
          {[
            "Dashboard",
            "Profile",
            "About Us",
            "Dashboard1",
            "Profile1",
            "About Us1",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ActionAreaCard
                color={index === 0 ? "black" : "white"}
                index={index}
              />
            </ListItem>
          ))}
        </List>
        <List sx={{ m: 2, mt: 10, p: 2, display: currentWindow ? "none" : "" }}>
          {[
            "Dashboard",
            "Profile",
            "About Us",
            "Dashboard1",
            "Profile1",
            "About Us1",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ActionAreaCard
                color={index === 0 ? "black" : "white"}
                index={index}
              />
            </ListItem>
          ))}
        </List>
      </Container>
      <Container
        sx={{
          display: "flow",
          width: "100vh",
        }}
      >
        <CssBaseline />
        <Footer
          title="Footer"
          description="Parko - now park stress free and focus on your job"
        />
      </Container>
    </Grid>
  );
}
