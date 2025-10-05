import {
  Drawer,
  Box,
  List,
  ListItem,
  IconButton,
  Badge,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import useBascketStore from "../../store/bascketStore";

const BurgerMenu = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUserStore();
  const { fetchUserBasket, basket } = useBascketStore();

  useEffect(() => {
    fetchUserBasket();
  }, []);

  const handleLinkClick = () => {
    toggleDrawer(false);
  };

  // const handleBasketClick = (e) => {
  //   e.preventDefault();
  //   navigate("/basket");
  // };

  return (
    <Box sx={{ width: 300 }} role="presentation">
      <List>
        <ListItem>
          <Link
            style={{ color: "#cb48ecff", marginLeft: 2 }}
            to="/delivery"
            onClick={toggleDrawer(false)}
          >
            Доставка
          </Link>
        </ListItem>
        <ListItem>
          <Link
            style={{ color: "#cb48ecff", marginLeft: 2 }}
            to="/deteils"
            onClick={toggleDrawer(false)}
          >
            Реквизиты
          </Link>
        </ListItem>
        <ListItem>
          <Link
            style={{ color: "#cb48ecff", marginLeft: 2 }}
            to="/returnpolicy"
            onClick={toggleDrawer(false)}
          >
            Возврат
          </Link>
        </ListItem>
        {/* <ListItem>
          <Link
            style={{ color: "#cb48ecff", marginLeft: 2 }}
            to="/blog-list"
            onClick={toggleDrawer(false)}
          >
            Блог
          </Link>
        </ListItem> */}
        <ListItem>
          <Link
            style={{ color: "#cb48ecff", marginLeft: 2 }}
            to="/certificate"
            onClick={toggleDrawer(false)}
          >
            Электронный сертификат
          </Link>
        </ListItem>
        {/* <ListItem>
          <Link
            style={{ color: "#cb48ecff", marginLeft: 2 }}
            to="/about"
            onClick={toggleDrawer(false)}
          >
            О нас
          </Link>
        </ListItem> */}
        <ListItem>
          <Link
            style={{ color: "#cb48ecff", marginLeft: 2 }}
            to="/contacts"
            onClick={toggleDrawer(false)}
          >
            Контакты
          </Link>
        </ListItem>
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
          <Link
            style={{
              fontSize: "18px",
              marginLeft: "16px",
              marginTop: "16px",
              marginBottom: "12px",
              textDecoration: "none",
              color: "#cb48ecff",
            }}
            to="/catalog/certificate"
            onClick={toggleDrawer(false)}
          >
            Каталог по сертификату
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: 4,
            mt: 2,
          }}
        >
          {isAuthenticated ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gridGap: 10,
              }}
            >
              <Link
                style={{ color: "#cb48ecff" }}
                to="/profile"
                onClick={handleLinkClick}
              >
                Личный кабинет
              </Link>
              <Link style={{ color: "#cb48ecff" }} to="/basket">
                Корзина
                <Badge
                  badgeContent={basket?.data?.quantity}
                  color="primary"
                  overlap="circular"
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#cb48ecff",
                      color: "white",
                      top: -10,
                      right: -10,
                    },
                  }}
                ></Badge>
              </Link>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gridGap: 10,
              }}
            >
              <Link
                style={{ color: "#cb48ecff" }}
                to="/auth"
                onClick={toggleDrawer(false)}
              >
                Войти
              </Link>
              <Link
                style={{ color: "#cb48ecff" }}
                to="/register"
                onClick={toggleDrawer(false)}
              >
                Регистрация
              </Link>
              <Link style={{ color: "#cb48ecff" }} to="/basket">
                <Badge
                  badgeContent={basket?.data?.quantity}
                  color="primary"
                  overlap="circular"
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#cb48ecff",
                      color: "white",
                      top: -10,
                      right: -10,
                    },
                  }}
                >
                  Корзина
                </Badge>
              </Link>
            </Box>
          )}
        </Box>
      </List>
    </Box>
  );
};

export default BurgerMenu;
