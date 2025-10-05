import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Card,
  CardContent,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  Avatar,
  Chip,
  Drawer,
  IconButton,
  TextField,
  Paper,
} from "@mui/material";
import {
  ShoppingCart,
  Favorite,
  AccountCircle,
  LocalOffer,
  Settings,
  ExitToApp,
  Menu as MenuIcon,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import useUserStore from "../../store/userStore";
import useOrderStore from "../../store/orderStore";
import { useLocation } from "react-router-dom";

/**
 * Переписанный компонент UserAccount — стиль и UX в духе Wildberries.
 * Сохраняет исходную логику/stores, но полностью переработан UI/структура.
 */

export default function UserAccount() {
  const { getUserInfo, user, logout } = useUserStore();
  const { fetchUserOrders, userOrders } = useOrderStore();
  const [currentTab, setCurrentTab] = useState(0); // 0: Заказы, 1: Избранное, 2: Бонусы, 3: Настройки
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Placeholder favorites если store отсутствует
  const placeholderFavorites = [
    { id: 1, name: "Кроссовки спортивные", price: 3499 },
    { id: 2, name: "Платье летнее", price: 1999 },
    { id: 3, name: "Рюкзак городской", price: 2599 },
    { id: 4, name: "Наушники Bluetooth", price: 1299 },
  ];

  // Цвета WB (как в задании)
  const COLORS = {
    primary: "#cb48ecff",
    secondary: "#b001dbff",
    bgPage: "#F8F9FA",
    cardBg: "#FFFFFF",
    text: "#000000",
    textSecondary: "#666666",
    success: "#00A651",
    warning: "#FF8C00",
    error: "#E31E24",
    border: "#E0E0E0",
  };

  useEffect(() => {
    // Очищаем историю — как в оригинале
    window.history.replaceState({}, document.title, location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    // Сохраняем поведение: вызываем getUserInfo и fetchUserOrders
    const fetchData = async () => {
      try {
        // возможно эти функции синхронные; await не вреден
        await getUserInfo();
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getUserInfo]);
  useEffect(() => {
    fetchUserOrders();
  }, []);

  const handleTabChange = (newTab) => {
    setCurrentTab(newTab);
    setMobileOpen(false); // закрываем drawer на мобильных
  };

  const toggleMobileMenu = () => {
    setMobileOpen((v) => !v);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
        sx={{ backgroundColor: COLORS.bgPage, p: 4 }}
      >
        <CircularProgress sx={{ color: COLORS.primary }} />
      </Box>
    );
  }

  // Статусы, перевод и цвета для Chip
  const statusMap = {
    pending: { label: "В ожидании", color: COLORS.warning, bg: "#FFF4E6" },
    processing: { label: "В обработке", color: COLORS.primary, bg: "#E8F4FF" },
    completed: { label: "Завершен", color: COLORS.success, bg: "#E9FBF0" },
    canceled: { label: "Отменен", color: COLORS.error, bg: "#FFF0F0" },
  };

  const orders = Array.isArray(userOrders?.data) ? userOrders.data : [];

  // UX: если нет заказов
  const noOrders = orders.length === 0;

  return (
    <Box sx={{ backgroundColor: COLORS.bgPage, minHeight: "100vh", pb: 6 }}>
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        {/* Header for mobile: hamburger + title */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: { xs: 2, md: 4 } }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              aria-label="open menu"
              onClick={toggleMobileMenu}
              sx={{ display: { xs: "inline-flex", md: "none" } }}
            >
              <MenuIcon sx={{ color: COLORS.primary }} />
            </IconButton>
            <Typography
              variant="h5"
              sx={{ fontWeight: "700", color: COLORS.text }}
            >
              Личный кабинет
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: COLORS.textSecondary,
                display: { xs: "none", sm: "inline-block" },
                ml: 1,
              }}
            >
              Добро пожаловать, {user?.data?.fio || "пользователь"}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              alt={user?.data?.fio || "User"}
              sx={{
                width: 46,
                height: 46,
                bgcolor: COLORS.primary,
                fontWeight: "700",
              }}
            >
              {user?.data?.fio ? (
                user.data.fio
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
              ) : (
                <AccountCircle sx={{ fontSize: 28, color: "#fff" }} />
              )}
            </Avatar>
            <Button
              variant="contained"
              onClick={() => logout()}
              startIcon={<ExitToApp />}
              sx={{
                backgroundColor: COLORS.primary,
                "&:hover": { backgroundColor: COLORS.secondary },
                borderRadius: 2,
                textTransform: "none",
              }}
              aria-label="logout"
            >
              Выйти
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "flex-start",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Sidebar (desktop) - увеличено до 350px и добавлена больше информации о пользователе */}
          <Box
            sx={{
              width: { xs: "100%", md: 350 },
              flexShrink: 0,
              display: { xs: "none", md: "block" },
            }}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                backgroundColor: COLORS.cardBg,
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                overflow: "hidden",
              }}
            >
              <Box p={3}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: COLORS.primary,
                      fontWeight: 700,
                    }}
                    aria-label="user-avatar"
                  >
                    {user?.data?.fio ? (
                      user.data.fio
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                    ) : (
                      <AccountCircle sx={{ fontSize: 36, color: "#fff" }} />
                    )}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {user?.data?.fio || "Пользователь"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: COLORS.textSecondary }}
                    >
                      {user?.data?.email || "Не указан"}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Расширенная секция с дополнительной информацией о пользователе */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1.5, color: COLORS.text }}
                  >
                    Основная информация
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccountCircle
                        sx={{ fontSize: 16, color: COLORS.primary }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: COLORS.textSecondary }}
                      >
                        Телефон: {user?.data?.phone_number || "Не указан"}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ShoppingBagOutlined
                        sx={{ fontSize: 16, color: COLORS.primary }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: COLORS.textSecondary }}
                      >
                        Всего заказов: {orders.length || 0}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <List disablePadding>
                  <ListItem
                    button
                    onClick={() => handleTabChange(0)}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      bgcolor: currentTab === 0 ? "#F0F8FF" : "transparent",
                    }}
                    aria-label="Мои заказы"
                  >
                    <ListItemIcon>
                      <ShoppingCart
                        sx={{
                          color: currentTab === 0 ? COLORS.primary : "inherit",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Мои заказы" />
                    <Chip
                      label={orders.length}
                      size="small"
                      sx={{
                        bgcolor:
                          currentTab === 0 ? COLORS.primary : COLORS.border,
                        color: currentTab === 0 ? "#fff" : COLORS.text,
                        ml: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    />
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Box>

          {/* Drawer for mobile */}
          <Drawer
            open={mobileOpen}
            onClose={toggleMobileMenu}
            ModalProps={{ keepMounted: true }}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <Box sx={{ width: 260, p: 2 }}>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Avatar sx={{ bgcolor: COLORS.primary, width: 48, height: 48 }}>
                  {user?.data?.fio ? (
                    user.data.fio
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                  ) : (
                    <AccountCircle sx={{ fontSize: 28, color: "#fff" }} />
                  )}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {user?.data?.fio || "Пользователь"}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: COLORS.textSecondary }}
                  >
                    {user?.data?.email}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <List>
                <ListItem button onClick={() => handleTabChange(0)}>
                  <ListItemIcon>
                    <ShoppingCart />
                  </ListItemIcon>
                  <ListItemText primary="Мои заказы" />
                </ListItem>
                <Divider sx={{ my: 1 }} />
                <ListItem button onClick={() => logout()}>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary="Выйти" />
                </ListItem>
              </List>
            </Box>
          </Drawer>

          {/* Main content area */}
          <Box sx={{ flexGrow: 1 }}>
            {/* Section Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {currentTab === 0 && "Мои заказы"}
                {/* {currentTab === 1 && "Избранное"}
                {currentTab === 2 && "Бонусы и скидки"} */}
                {/* {currentTab === 3 && "Настройки"} */}
              </Typography>
            </Box>

            {/* Content by tab */}
            <Box>
              {/* --- TAB 0: Orders --- */}
              {currentTab === 0 && (
                <Box>
                  {noOrders ? (
                    <Paper
                      elevation={0}
                      sx={{
                        p: 6,
                        textAlign: "center",
                        borderRadius: 2,
                        border: `1px dashed ${COLORS.border}`,
                        bgcolor: COLORS.cardBg,
                      }}
                    >
                      <ShoppingCart
                        sx={{ fontSize: 48, color: COLORS.textSecondary }}
                      />
                      <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
                        У вас нет заказов
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: COLORS.textSecondary, mb: 2 }}
                      >
                        Оформите первый заказ — и он появится здесь.
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: COLORS.primary,
                          "&:hover": { backgroundColor: COLORS.secondary },
                          borderRadius: 1,
                          textTransform: "none",
                        }}
                        onClick={() => {
                          window.location.href = "/catalog";
                        }}
                      >
                        Перейти к покупкам
                      </Button>
                    </Paper>
                  ) : (
                    <Grid container spacing={3}>
                      {orders.map((order) => (
                        <Grid item xs={12} key={order.id}>
                          <Card
                            sx={{
                              borderRadius: 2,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                              backgroundColor: COLORS.cardBg,
                              border: `1px solid ${COLORS.border}`,
                              transition: "all 0.3s ease",
                            }}
                          >
                            <CardContent>
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                flexDirection={{ xs: "column", sm: "row" }}
                                gap={2}
                              >
                                <Box>
                                  <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 700 }}
                                  >
                                    Заказ №{order.id}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: COLORS.textSecondary }}
                                  >
                                    Дата:{" "}
                                    {order.created_at
                                      ? new Date(
                                          order.created_at
                                        ).toLocaleString()
                                      : "-"}
                                  </Typography>
                                </Box>

                                <Box display="flex" alignItems="center" gap={2}>
                                  <Chip
                                    label={
                                      statusMap[order.status]?.label ||
                                      "Неизвестный статус"
                                    }
                                    sx={{
                                      borderRadius: 1,
                                      fontWeight: 700,
                                      backgroundColor:
                                        statusMap[order.status]?.bg ||
                                        "#F3F4F6",
                                      color:
                                        statusMap[order.status]?.color ||
                                        COLORS.text,
                                      border: `1px solid ${COLORS.border}`,
                                    }}
                                    aria-label={`status-${order.id}`}
                                  />

                                  {/* Action buttons per status */}
                                </Box>
                              </Box>

                              <Divider sx={{ my: 2 }} />

                              <Box>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ fontWeight: 700, mb: 1 }}
                                >
                                  Товары в заказе
                                </Typography>
                                <List>
                                  {Array.isArray(order.items) &&
                                  order.items.length > 0 ? (
                                    order.items.map((it) => (
                                      <ListItem
                                        key={it.id || `${order.id}-${it.name}`}
                                        sx={{ px: 0 }}
                                      >
                                        <ListItemIcon>
                                          {/* Placeholder avatar for product */}
                                          <Avatar
                                            sx={{
                                              bgcolor: COLORS.border,
                                              width: 48,
                                              height: 48,
                                            }}
                                          >
                                            {it.name ? it.name.charAt(0) : "P"}
                                          </Avatar>
                                        </ListItemIcon>
                                        <ListItemText
                                          primary={
                                            <Typography
                                              variant="body1"
                                              sx={{ fontWeight: 700 }}
                                            >
                                              {it.name}
                                            </Typography>
                                          }
                                          secondary={
                                            <Typography
                                              variant="body2"
                                              sx={{
                                                color: COLORS.textSecondary,
                                              }}
                                            >
                                              Количество: {it.quantity ?? 1} •
                                              Цена: {it.price ?? "-"} руб
                                            </Typography>
                                          }
                                        />
                                      </ListItem>
                                    ))
                                  ) : (
                                    <Typography
                                      variant="body2"
                                      sx={{ color: COLORS.textSecondary }}
                                    >
                                      Список товаров недоступен
                                    </Typography>
                                  )}
                                </List>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              )}

              {/* --- TAB 3: Settings --- */}
              {/* {currentTab === 3 && (
                <Box>
                  <Card
                    sx={{
                      borderRadius: 2,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      backgroundColor: COLORS.cardBg,
                      border: `1px solid ${COLORS.border}`,
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                        Настройки профиля
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="ФИО"
                            defaultValue={user?.data?.fio || ""}
                            variant="outlined"
                            InputProps={{ "aria-label": "fio" }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Email"
                            value={user?.data?.email || ""}
                            variant="outlined"
                            InputProps={{
                              readOnly: true,
                              "aria-label": "email",
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Телефон"
                            defaultValue={user?.data?.phone || ""}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Город"
                            defaultValue={user?.data?.city || ""}
                          />
                        </Grid>
                      </Grid>

                      <Box display="flex" gap={2} mt={3}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: COLORS.primary,
                            "&:hover": { backgroundColor: COLORS.secondary },
                            borderRadius: 1,
                            textTransform: "none",
                          }}
                          aria-label="save-settings"
                          disabled
                        >
                          Сохранить
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            borderRadius: 1,
                            textTransform: "none",
                          }}
                          aria-label="cancel-settings"
                        >
                          Отмена
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              )} */}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
