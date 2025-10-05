import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Badge,
  Box,
  Container,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./components/Logo";
import ContactMenu from "./components/ContactMenu";
import CatalogButtons from "./components/CatalogButtons";
import UserMenu from "./components/UserMenu";
import Search from "./components/Search";
import BurgerMenu from "./components/BurgerMenu";
import Navigation from "./components/Navigation";
import useUserStore from "../store/userStore";
import useBascketStore from "../store/bascketStore";
import {
  DeleteOutline,
  Add,
  Remove,
  ShoppingCartOutlined,
} from "@mui/icons-material";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { checkAuthStatus, getUserInfo, user } = useUserStore();
  const { fetchUserBasket, basket } = useBascketStore();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    checkAuthStatus();
    const intervalId = setInterval(checkAuthStatus, 300000);
    return () => clearInterval(intervalId);
  }, [checkAuthStatus]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);
  useEffect(() => {
    fetchUserBasket();
    if (user?.data) {
      setIsAdmin(user.data.role_id === 1);
    }
  }, [user]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (anchor) => (
    <Box
      sx={{ width: anchor === "left" ? 256 : "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <BurgerMenu toggleDrawer={toggleDrawer} />
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        zIndex: 50,
        boxShadow: 3,
        background: "linear-gradient(to bottom left, #D3D3FF, #B3B3FA)",
      }}
    >
      <Container maxWidth="xl">
        {isLgUp ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1.5,
              }}
            >
              <Logo />
              <Search />
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <ContactMenu />
                <UserMenu />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pb: 0.25,
              }}
            >
              <CatalogButtons />
              <Navigation />
            </Box>
          </>
        ) : isSmUp ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1.5,
            }}
          >
            <Logo />
            <Search />
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                navigate("/basket");
              }}
            >
              <Badge
                badgeContent={basket?.data?.quantity}
                color="primary"
                overlap="circular"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#cb48ecff",
                    color: "white",
                  },
                }}
              >
                <ShoppingCartOutlined
                  sx={{ width: 35, height: 35, color: "#cb48ecff" }}
                />
              </Badge>
            </IconButton>
            <IconButton
              onClick={toggleDrawer(true)}
              sx={{
                color: "#cb48ecff",
                "&:hover": { opacity: 0.8 },
                width: 50,
                height: 50,
              }}
              aria-label="menu"
            >
              <MenuIcon fontSize={"large"} />
            </IconButton>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1.5,
            }}
          >
            <Box>
              <Logo />
            </Box>
            <Box>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/basket");
                }}
              >
                <Badge
                  badgeContent={basket?.data?.quantity}
                  color="primary"
                  overlap="circular"
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#cb48ecff",
                      color: "white",
                    },
                  }}
                >
                  <ShoppingCartOutlined
                    sx={{ width: 35, height: 35, color: "#cb48ecff" }}
                  />
                </Badge>
              </IconButton>
              <IconButton
                onClick={toggleDrawer(true)}
                sx={{ color: "#cb48ecff", "&:hover": { opacity: 0.8 } }}
                aria-label="menu"
              >
                <MenuIcon fontSize={"large"} />
              </IconButton>
            </Box>
          </Box>
        )}
      </Container>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        {drawerContent("left")}
      </Drawer>
    </AppBar>
  );
};

export default Header;
