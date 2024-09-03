import { Outlet } from "react-router-dom";

import { Header } from "./Header";
import { Box } from "@mui/material";

function MainLayout() {
  return (
    <Box height="100%">
      <Header />
      <Box
        component="main"
        maxWidth="xl"
        height="100%"
        sx={{ display: "flex", flexDirection: "column", mx: "auto" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
