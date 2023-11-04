import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import ActionAreaCard from "../../components/card/Card";
import { Box, List, ListItem } from "@mui/material";
import {
  GoogleMapsWrapper,
  MapComponent,
} from "../../components/map/GoogleMaps";

export default function Dashboard() {
  // let currentWindow = false;

  return (
    <Grid container xs={12}>
      <Grid item xs={12} sm={8} sx={{ bgcolor: "yellow" }}>
        <Box display={"flex"}>
          <Sidebar></Sidebar>
          <main>
            <Container> Content A</Container>
          </main>
        </Box>
      </Grid>
      {/* <Grid
        item
        sm={4}
        sx={{ bgcolor: "red", display: { xs: "none", sm: "block" } }}
      >
        Content B
      </Grid> */}
      {/* <Sidebar></Sidebar> */}
      {/* <Container
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
        <Container
          sx={{
            display: "flex",
            width: "100vh",
            mt: 13,
            borderRadius: 15,
          }}
        >
          <MapComponent></MapComponent>
        </Container>
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
      </Container> */}
    </Grid>
  );
}
