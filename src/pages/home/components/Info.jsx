import React from "react";
import { Helmet } from "react-helmet";
import { Box, Typography, Chip } from "@mui/material";
import { AlertTriangle } from "lucide-react";

export default function Info() {
  return (
    <Box sx={{ py: { xs: 3, sm: 4 } }}>
      {/* 🔹 SEO-оптимизация */}
      <Helmet>
        <title>График работы и уведомления | sfr-tcr.ru</title>
        <meta
          name="description"
          content="График работы sfr-tcr.ru в праздничные дни, медицинские предупреждения и уведомления о продукции. Ознакомьтесь с актуальной информацией перед покупкой."
        />
        <meta
          name="keywords"
          content="СФР-ТСР, график работы, праздничные дни, медицинские товары, уведомления, интернет-магазин, медтехника"
        />
        <meta
          property="og:title"
          content="График работы и уведомления | sfr-tcr.ru"
        />
        <meta
          property="og:description"
          content="Узнайте актуальный график работы sfr-tcr.ru, медицинские предупреждения и важные уведомления о товарах."
        />
        <meta property="og:image" content="/img/og-image-sfr-tcr.jpg" />
        <meta property="og:url" content="https://sfr-tcr.ru/info" />
        <link rel="canonical" href="https://sfr-tcr.ru/info" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* 🔹 H1-заголовок страницы */}
      <Typography
        component="h1"
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.75rem", sm: "2rem" },
          mb: 3,
          color: "text.primary",
        }}
      >
        Уведомления sfr-tcr.ru
      </Typography>

      {/* 🔹 Блок 1: Медицинское предупреждение */}
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
                variant="h2"
                sx={{
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
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
                  Имеются медицинские противопоказания. Перед применением
                  продукции проконсультируйтесь со специалистом. Компания{" "}
                  <strong>СФР-ТСР</strong> рекомендует строго соблюдать
                  инструкции и условия хранения медицинских товаров.
                </Box>
              </Typography>
            </Box>
          </Box>
        </Box>
      </section>

      {/* 🔹 Блок 2: Уведомление о продукции и графике */}
      <section aria-labelledby="product-notice-title">
        <Box
          sx={{
            position: "relative",
            overflow: "visible",
            mt: 4,
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
                variant="h2"
                sx={{
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                Уведомление о продукции и графике работы
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "0.875rem", sm: "1rem" },
                color: "text.secondary",
                lineHeight: 1.6,
              }}
            >
              Информация о товарах и ценах, представленная на сайте{" "}
              <strong>СФР-ТСР</strong>, носит справочный характер и не является
              публичной офертой (ст. 437 ГК РФ). Актуальный график работы в
              праздничные дни публикуется заранее. Перед посещением офиса или
              оформлением заказа рекомендуем уточнить время работы по телефону
              или через форму обратной связи.
            </Typography>
          </Box>
        </Box>
      </section>
    </Box>
  );
}
