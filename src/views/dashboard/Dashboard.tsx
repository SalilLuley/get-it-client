import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Box, List, ListItem } from "@mui/material";
import ActionAreaCard from "../../components/card/Card";
import { MapComponent } from "../../components/map/GoogleMaps";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        ml: { sm: "240px", xs: 0 },
        mt: { sm: "80px", xs: "80px", lg: "80px", md: "80px" },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Item>
            <List>
              {[1, 2, 3, 4, 5].map((text) => (
                <ListItem key={text} disablePadding>
                  <ActionAreaCard />
                </ListItem>
              ))}
            </List>
          </Item>
        </Grid>
        <Grid item xs={0} sm={6} md={6} lg={6} xl={6}>
          <Item>
            <MapComponent></MapComponent>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
