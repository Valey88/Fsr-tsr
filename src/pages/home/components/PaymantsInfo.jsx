import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

function PaymantsInfo() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <Helmet>
        <title>Оплата электронным сертификатом</title>
        <meta
          name="description"
          content="Теперь оплачивать покупки на нашем сайте вы можете и электронным сертификатом."
        />
        <meta
          name="keywords"
          content="оплата, электронный сертификат, покупки"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

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
            alt="Электронный сертификат"
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
            variant="h4"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.875rem" },
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
            Оплата электронным сертификатом
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", sm: "1.125rem" },
              color: "text.secondary",
              lineHeight: 1.6,
            }}
          >
            Теперь оплачивать покупки на нашем сайте вы можете и электронным
            сертификатом. Это быстро, удобно и современно.
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
            Подробнее
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default PaymantsInfo;
