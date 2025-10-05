import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";

const Navigation = () => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const navItems = [
    { text: "Реквизиты", href: "/deteils" },
    { text: "Возврат", href: "/returnpolicy" },
    { text: "Сертификат", href: "/certificate" },
    { text: "Доставка", href: "/delivery" },
    { text: "Контакты", href: "/contacts" },
    // { text: "Блог", href: "/blog-list" },
    // { text: "О нас", href: "/about" },
  ];

  if (!isLgUp) return null;

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      {navItems.map((item, index) => (
        <Button
          key={index}
          component={Link}
          to={item.href}
          sx={{
            px: 1.5,
            py: 1,
            background: " #cb48ecff",
            borderRadius: 1.5,
            color: "white",
            fontWeight: "bold",
            fontSize: "1.125rem",
            textTransform: "none",
            backdropFilter: "blur(4px)",
            "&:hover": {
              background: "#b001dbff",
            },
            transition: "background 0.3s",
          }}
        >
          {item.text}
        </Button>
      ))}
    </Box>
  );
};

export default Navigation;
