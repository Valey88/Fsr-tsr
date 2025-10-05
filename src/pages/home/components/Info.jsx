import React from "react";
import { Helmet } from "react-helmet";
import { Box, Typography, Chip } from "@mui/material";
import { AlertTriangle, Info as InfoIcon } from "lucide-react";


export default function Info() {
  return (
    <Box sx={{ py: { xs: 3, sm: 4 } }}>
      <Helmet>
        <title>График работы в праздничные дни - Samedik.ru</title>
        <meta
          name="description"
          content="Узнайте график работы Samedik.ru в праздничные дни, важные уведомления и поздравление от коллектива."
        />
        <meta
          name="keywords"
          content="Samedik, график работы, праздничные дни, интернет-магазин, медицинские товары"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Блок 1: Мед. предупреждение */}
      <section aria-labelledby="med-warning-title">
        <Box
          sx={{
            position: "relative",
            overflow: "visible",
          }}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: 3,
              border: "1px solid #E8E8FB",
              boxShadow: 2,
              p: 3,
              display: "flex",
              gap: 2,
              alignItems: "flex-start",
              background: "linear-gradient(to right, #2E2E7F, #1C5796)",
            }}
          >
            <Box
              sx={{
                flexShrink: 0,
                width: 48,
                height: 48,
                borderRadius: 1.5,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertTriangle className="text-white" size={22} />
            </Box>
            <Box>
              <Typography
                id="med-warning-title"
                variant="h6"
                sx={{
                  fontSize: { xs: "1.125rem", sm: "1.25rem" },
                  fontWeight: 600,
                  color: "white",
                }}
              >
                Важно! Медицинское предупреждение
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  color: "rgba(255, 255, 255, 0.9)",
                  lineHeight: 1.6,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    borderLeft: "4px solid rgba(255, 255, 255, 0.6)",
                    pl: 1.5,
                  }}
                >
                  Имеются медицинские противопоказания. Перед использованием
                  продукции обязательно проконсультируйтесь со специалистом.
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>
      </section>

      {/* Блок 2: Уведомление о продукции */}
      <section aria-labelledby="product-notice-title">
        <Box
          sx={{
            position: "relative",
            overflow: "visible",
            mt: 3,
          }}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: 3,
              border: "1px solid #E8E8FB",
              boxShadow: 1,
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              background: "linear-gradient(to right, #B3B3FA, #D3D3FF)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Chip
                label="Уведомление"
                size="small"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  borderRadius: "9999px",
                  px: 1.5,
                  py: 0.5,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  color: "text.primary",
                }}
              />
              <Typography
                id="product-notice-title"
                variant="h6"
                sx={{
                  fontSize: { xs: "1.125rem", sm: "1.25rem" },
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                Уведомление о продукции и ценах
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "0.875rem", sm: "1rem" },
                color: "text.secondary",
                lineHeight: 1.6,
              }}
            >
              Информация и цены, указанные на сайте, не являются публичной
              офертой, определяемой положениями статьи 437 Гражданского кодекса
              Российской Федерации. Товар на фото может отличаться от оригинала.
              Для получения подробной информации о модели, характеристиках,
              комплектации, стоимости, сроках и условиях поставки просьба
              уточнять через форму обратной связи или по телефону.
            </Typography>
            {/* <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1.5 }}>
              <InfoIcon sx={{ color: "text.primary", fontSize: "1.125rem" }} />
              <a
                href="/contacts"
                style={{ fontSize: "0.875rem", fontWeight: 500, color: "text.primary", textDecoration: "underline" }}
              >
                Связаться с менеджером
              </a>
            </Box> */}
          </Box>
        </Box>
      </section>
    </Box>
  );
}
