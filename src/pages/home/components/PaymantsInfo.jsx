import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function PaymantsInfo() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", pb: 8 }}>
      {/* 🔹 SEO-оптимизация */}
      <Helmet>
        <title>Оплата электронным сертификатом | СФР-ТСР</title>
        <meta
          name="description"
          content="Узнайте, как оплатить покупки электронным сертификатом СФР-ТСР. Быстро, удобно и безопасно — используйте подарочные сертификаты онлайн."
        />
        <meta
          name="keywords"
          content="оплата электронным сертификатом, сертификат на оплату покупок, электронный подарочный сертификат, оплатить покупки онлайн, СФР-ТСР"
        />
        <meta
          property="og:title"
          content="Оплата электронным сертификатом | СФР-ТСР"
        />
        <meta
          property="og:description"
          content="Теперь вы можете оплачивать покупки с помощью электронного сертификата СФР-ТСР. Удобно и безопасно онлайн."
        />
        <meta property="og:image" content="/img/og-image-sfr-tsr.jpg" />
        <meta property="og:url" content="https://sfr-tsr.ru/payments-info" />
        <link rel="canonical" href="https://sfr-tsr.ru/payments-info" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* 🔹 Основной блок */}
      <Box
        sx={{
          background: "linear-gradient(to right, #b3b3fa, #e3e3ff)",
          borderRadius: 3,
          boxShadow: 2,
          p: { xs: 3, sm: 5 },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 4,
          alignItems: "center",
          mt: 3,
        }}
      >
        {/* Изображение */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "100%", sm: "50%" },
            maxWidth: "384px",
          }}
        >
          <Box
            component="img"
            src="/Group31.png"
            alt="Электронный сертификат СФР-ТСР"
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Box>

        {/* Текст */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            color: "text.primary",
            flex: 1,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "1.75rem", sm: "2rem" },
              fontWeight: "bold",
              letterSpacing: "0.025em",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CardGiftcardIcon
              sx={{
                fontSize: { xs: "1.75rem", sm: "1.75rem" },
                color: "secondary.main",
              }}
            />
            Оплата покупок электронным сертификатом СФР-ТСР
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", sm: "1.125rem" },
              color: "text.secondary",
              lineHeight: 1.6,
            }}
          >
            Теперь оплачивать покупки на сайте СФР-ТСР можно с помощью{" "}
            <strong>электронного сертификата</strong>. Это удобно, безопасно и
            современно. Просто введите код сертификата при оформлении заказа — и
            сумма будет списана автоматически.
          </Typography>

          <Button
            onClick={() => navigate("/certificate")}
            sx={{
              alignSelf: "flex-start",
              px: 3,
              py: 1.25,
              borderRadius: 2,
              background: "linear-gradient(to right, #9333ea, #ec4899)",
              color: "white",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              fontWeight: 500,
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
                transform: "scale(1.05)",
              },
              transition: "transform 0.2s ease-in-out",
            }}
          >
            Подробнее о сертификате СФР-ТСР
          </Button>
        </Box>
      </Box>

      {/* 🔹 Дополнительный SEO-раздел */}
      <Box sx={{ mt: 6, px: { xs: 2, sm: 6 } }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.375rem", sm: "1.75rem" },
            fontWeight: 600,
            mb: 3,
          }}
        >
          Как использовать электронный сертификат для оплаты
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            color: "text.secondary",
            fontSize: { xs: "0.95rem", sm: "1.05rem" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CheckCircleOutlineIcon color="success" />
            <Typography>
              Выберите товары на сайте СФР-ТСР и добавьте их в корзину.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CheckCircleOutlineIcon color="success" />
            <Typography>
              При оформлении заказа выберите «Оплата сертификатом».
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CheckCircleOutlineIcon color="success" />
            <Typography>
              Введите код электронного сертификата в соответствующее поле.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CheckCircleOutlineIcon color="success" />
            <Typography>
              Подтвердите оплату — покупка будет успешно завершена!
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PaymantsInfo;
