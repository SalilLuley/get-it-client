import { Box } from "@mui/material";

export default function Settings() {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        ml: { sm: "240px", xs: 0 },
        mt: { sm: "80px", xs: "80px", lg: "80px", md: "80px" },
        backgroundColor: "red",
      }}
    >
      Settings
    </Box>
  );
}
