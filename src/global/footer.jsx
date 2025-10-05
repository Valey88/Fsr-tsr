import { Box, Container, Link, Typography, Grid } from "@mui/material";
import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const menuItems = [
  { text: "Доставка", href: "/delivery" },
  { text: "Реквизиты", href: "/deteils" },
  { text: "Возврат", href: "/returnpolicy" },
  // { text: "О нас", href: "/about" },
  { text: "Контакты", href: "/contacts" },
];

const addresses = [
  {
    text: "г. Оренбург, ул. Шевченко д. 20 «В» Магазин - Склад",
    phone: "+7 3532 93-52-41",
  },
  {
    text: "г. Орск, проспект Мира. 15 «Д», ТД Яшма, магазин «Памперсы»",
    phone: "+7 905 896-23-23",
  },
  {
    text: "г. Уфа, ул. Степана Кувыкина, 41, Магазин-Склад",
    phone: "+7 961 366-82-46",
  },
  {
    text: "г. Екатеринбург, пр-т. Ленина 79 «Б», Центр обучения",
    phone: "+7 903 086-34-11",
  },
];

export default function Footer() {
  return (
    <Box sx={{ background: "#F6F5FF", pt: 4 }}>
      <Container>
        <Grid container spacing={3}>
          {/* Меню */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link href="/">
               Лого
              </Link>
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  underline="none"
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#7200FF",
                    transition: "color 0.2s",
                    "&:hover": { color: "#9A4DFF" },
                  }}
                >
                  {item.text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Контакты */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                sx={{ fontWeight: 600, fontSize: 15, color: "#1A1A1A" }}
              >
                Контакты
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 18, color: "#7200FF" }} />
                <Typography sx={{ fontSize: 14 }}>
                  +7 (903) 086-30-91
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 18, color: "#7200FF" }} />
                <Typography sx={{ fontSize: 14 }}>
                  +7 (353) 293-52-41
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon sx={{ fontSize: 18, color: "#7200FF" }} />
                <Typography sx={{ fontSize: 14 }}>
                  olimp1-info@yandex.ru
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Адреса */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                sx={{ fontWeight: 600, fontSize: 15, color: "#1A1A1A" }}
              >
                Адреса магазинов
              </Typography>
              {addresses.map((address, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
                >
                  <LocationOnIcon
                    sx={{ fontSize: 18, color: "#7200FF", mt: "2px" }}
                  />
                  <Box>
                    <Typography sx={{ fontSize: 13 }}>
                      {address.text}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: "#7200FF" }}>
                      {address.phone}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Нижний футер */}
       
      <Box sx={{ background: "linear-gradient(to bottom left, #D3D3FF, #B3B3FA)", mt: 4, py: 2 }}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography sx={{ color: "#FFF", fontSize: 12 }}>
            ©️ 2024 ООО “Sdmedik”. Все права защищены.
          </Typography>
          <Link
            href="/privacy"
            underline="hover"
            sx={{ color: "#FFF", fontSize: 12 }}
          >
            Политика конфиденциальных данных
          </Link>
        </Container>
      </Box>
    </Box>
  );
}
