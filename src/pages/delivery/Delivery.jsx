import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import api from "../../configs/axiosConfig";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";

const stripHtml = (html) =>
  typeof html === "string" ? html.replace(/<[^>]+>/g, "") : "";

export default function Delivery() {
  const [content, setContent] = useState({});

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get("/page/delivery");
        const elements =
          response.data?.data?.elements || response.data?.elements || [];
        const newContent = {};
        elements.forEach((item) => {
          newContent[item.element_id] = item.value;
        });
        setContent(newContent);
      } catch (error) {
        console.error("Ошибка при загрузке контента:", error);
      }
    };
    fetchContent();
  }, []);

  const deliveryConditions = [
    "condition-1",
    "condition-2",
    "condition-3",
    "condition-4",
  ];

  const faqItems = [
    { title: "faq-1-title", content: "faq-1-content" },
    { title: "faq-2-title", content: "faq-2-content" },
  ];

  return (
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
      <Helmet>
        <title>{content["page-title"] || "Доставка - СФР-ТСР"}</title>
        <meta
          name="description"
          content={
            content["meta-description"] ||
            "Информация о доставке по России и Оренбургу"
          }
        />
      </Helmet>

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(to right, #D3D3FF, #B3B3FA)",
          color: "white",
          textAlign: "center",
          py: { xs: 3, md: 2 },
          borderBottomLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "2rem" },
                mb: 2,
              }}
              dangerouslySetInnerHTML={{
                __html: content["main-heading"] || "<h1>Доставка</h1>",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                fontWeight: 400,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              {stripHtml(content["meta-description"]) ||
                "Доставка по всей России и бесплатная доставка по Оренбургу."}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ mt: { xs: 4, md: 6 }, mb: 8 }}>
        {/* Информативный блок в стиле Wildberries */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: 5,
              overflow: "hidden",
              mb: 8,
              background:
                "linear-gradient(135deg, rgba(192, 128, 252, 0.85), rgba(217, 72, 236, 0.85))",
              boxShadow: "0 10px 35px rgba(147,51,234,0.25)",
            }}
          >
            {/* Фоновое изображение */}
            <Box
              component="img"
              src="/delivery.png"
              alt="Доставка"
              sx={{
                width: "100%",
                height: { xs: 300, md: 420 },
                objectFit: "cover",
                opacity: 0.25,
                position: "absolute",
                inset: 0,
                zIndex: 0,
              }}
            />

            {/* Контент поверх фона */}
            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                p: { xs: 4, md: 6 },
                color: "#fff",
              }}
            >
              {/* Левая часть — текст */}
              <Box sx={{ flex: 1, pr: { md: 4 } }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: "1.8rem", md: "2.5rem" },
                    lineHeight: 1.2,
                  }}
                >
                  Быстрая и удобная доставка <br /> по всей России 🚚
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    lineHeight: 1.8,
                    opacity: 0.95,
                    mb: 3,
                    maxWidth: 550,
                  }}
                >
                  Мы доставляем товары в любой регион России: от Москвы до
                  Владивостока. Бесплатная доставка при заказе от <b>5000 ₽</b>{" "}
                  и удобный выбор способов получения — курьером, в пункте выдачи
                  или через СДЭК.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    mt: 3,
                  }}
                >
                  {[
                    { icon: "🚀", text: "Доставка за 1–10 дней" },
                    { icon: "📦", text: "Бесплатно от 5000 ₽" },
                    { icon: "🏪", text: "Самовывоз без очередей" },
                  ].map((item, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.2,
                        backgroundColor: "rgba(255,255,255,0.1)",
                        borderRadius: 3,
                        px: 2.2,
                        py: 1,
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      <Typography sx={{ fontSize: "1.5rem" }}>
                        {item.icon}
                      </Typography>
                      <Typography sx={{ fontWeight: 500 }}>
                        {item.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Правая часть — карточка условий */}
              <Card
                sx={{
                  flexShrink: 0,
                  width: { xs: "100%", md: "38%" },
                  mt: { xs: 4, md: 0 },
                  borderRadius: 4,
                  backgroundColor: "#fff",
                  color: "#333",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      background: "linear-gradient(90deg, #CB11AB, #9333EA)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    dangerouslySetInnerHTML={{
                      __html:
                        content["section-heading"] ||
                        "<h5>Условия доставки</h5>",
                    }}
                  />

                  <Box
                    component="ul"
                    sx={{ pl: 2, m: 0, color: "text.secondary" }}
                  >
                    {deliveryConditions.map((id, i) => (
                      <Box
                        component="li"
                        key={id}
                        sx={{
                          mb: 1.8,
                          lineHeight: 1.8,
                          fontSize: "1rem",
                          "&::marker": {
                            color: "#CB11AB",
                            fontSize: "1.2rem",
                          },
                        }}
                      >
                        <Typography
                          component="div"
                          dangerouslySetInnerHTML={{
                            __html: content[id] || "<p>Нет данных</p>",
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </motion.section>

        {/* FAQ Section
        <Divider sx={{ my: 6, borderColor: "#E5E7EB" }} />
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 700,
            background: "linear-gradient(90deg, #9333EA, #EC4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Часто задаваемые вопросы
        </Typography>

        {faqItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <Accordion
              sx={{
                mb: 2,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#CB11AB" }} />}
                sx={{
                  backgroundColor: "#fff",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#fdf3ff" },
                }}
              >
                {stripHtml(content[item.title]) || `Вопрос ${i + 1}`}
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "#fafafa" }}>
                <Typography
                  sx={{ lineHeight: 1.7, color: "text.secondary" }}
                  dangerouslySetInnerHTML={{
                    __html: content[item.content] || "<p>Нет данных</p>",
                  }}
                />
              </AccordionDetails>
            </Accordion>
          </motion.div>
        ))} */}
      </Container>
    </Box>
  );
}
