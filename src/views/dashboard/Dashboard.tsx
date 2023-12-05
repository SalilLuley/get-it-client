import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Box,
  Chip,
  CssBaseline,
  List,
  ListItem,
  Typography,
} from "@mui/material";
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
  const handleClick = () => {
    console.log("Clicked!");
  };
  return (
    <CssBaseline>
      <Box
        component="main"
        sx={{
          display: "flex",
          ml: { sm: "240px", xs: 0 },
          mt: { sm: "80px", xs: "80px", lg: "80px", md: "80px" },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} ml={5}>
            <Typography color="#3e4958" component="div" variant="body2">
              400+ Parking Locations
            </Typography>
            <Typography component="div" variant="h5">
              Live From Space
            </Typography>
          </Grid>
          <Grid item xs={12} ml={5}>
            <Chip
              sx={{ mr: 2 }}
              label="Clickable"
              variant="outlined"
              onClick={handleClick}
            />
            <Chip label="Clickable" variant="outlined" onClick={handleClick} />
          </Grid>
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
    </CssBaseline>
  );
}
