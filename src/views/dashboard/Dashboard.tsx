import { Box, List, ListItem } from "@mui/material";
import ResponsiveDrawer from "../sidebar/Sidebar";
import ActionAreaCard from "../../components/card/Card";
export default function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <ResponsiveDrawer></ResponsiveDrawer>
      <Box
        component="main"
        sx={{
          display: "flex",
          // flexGrow: 2,
          width: { sm: `calc(100% - ${240}px)` },
        }}
      >
        <List sx={{ m: 2, mt: 10 }}>
          {[1, 2, 3, 4, 5].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ActionAreaCard color={"white"} index={index} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        component="main"
        sx={{
          bgcolor: "red",
          width: { sm: `calc(100% - ${240}px)` },
          display: { sm: "flex", md: "flex", xs: "none" },
        }}
      >
        Content A
      </Box>
    </Box>
  );
}
