import React from "react";
import { Container, Box } from "@mui/material";
import Basket from "./components/Basket";
import RightBar from "./components/RightBar";

export default function BasketLayout() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: "flex-start",
          mt: 5,
          mb: 6,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Basket />
        </Box>
        <Box sx={{ width: { xs: "100%", md: 360 } }}>
          <RightBar />
        </Box>
      </Box>
    </Container>
  );
}
