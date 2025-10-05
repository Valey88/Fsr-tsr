import React from "react";
import { Link } from "react-router-dom";
import { Button, useMediaQuery, useTheme } from "@mui/material";

const CatalogButtons = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  if (!isMdUp) return null;

  return (
    <Button
      component={Link}
      to="/catalog/certificate"
      sx={{
        px: 2,
        py: 1,
        background: " #cb48ecff", // from-purple-500 to-fuchsia-500
        borderRadius: 2,
        color: "white",
        fontWeight: "bold",
        fontSize: "1.125rem", // text-lg
        textTransform: "none",
        backdropFilter: "blur(4px)",
        "&:hover": {
          background: "#b001dbff",
        },
        transition: "background 0.3s",
      }}
    >
      Каталог по сертификату ТСР
    </Button>
  );
};

export default CatalogButtons;
