import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import api from "../../configs/axiosConfig";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion"; // Сохраняем для анимаций, если нужно; иначе можно убрать

const stripHtml = (html) => html.replace(/<[^>]+>/g, "");

export default function ReturnPolicy() {
  const [content, setContent] = useState({
    "page-title": "Политика возврата - СД-МЕД",
    "meta-description":
      "Узнайте о нашей политике возврата товаров и условиях возврата.",
    "meta-keywords": "возврат, политика возврата, товары, магазин",
    "canonical-link": "https://www.yourwebsite.com/return-policy",
    "main-heading": "<h1>Политика возврата</h1>",
    intro:
      "<p>Если по каким-либо причинам Вы решили отказаться от приобретенного товара...</p>",
    "sub-heading": "<h2>Изделия надлежащего качества</h2>",
    paragraph:
      "<p>Для возврата товара надлежащего качества необходимо уточнить...</p>",
    "accordion-1-title": "Условия возврата товара надлежащего качества",
    "accordion-1-content-1":
      "<p>Возврат товара возможен при сохранении товарного вида...</p>",
    "accordion-2-title": "Возврат товара ненадлежащего качества",
    "accordion-2-content-1":
      "<p>Под товаром ненадлежащего качества понимается...</p>",
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get("/page/returnpolicy");
        const newContent = {};
        const elements = Array.isArray(response.data?.data?.elements)
          ? response.data.data.elements
          : Array.isArray(response.data?.elements)
          ? response.data.elements
          : [];
        elements.forEach((item) => {
          newContent[item.element_id] = item.value;
        });
        setContent((prev) => ({ ...prev, ...newContent }));
      } catch (error) {
        console.error("Error fetching page content:", error);
      }
    };
    fetchContent();
  }, []);

  const accordionItems = [
    {
      title: content["accordion-1-title"],
      contents: [
        "accordion-1-content-1",
        "accordion-1-content-2",
        "accordion-1-content-3",
        "accordion-1-content-4",
        "accordion-1-content-5",
      ],
    },
    {
      title: content["accordion-2-title"],
      contents: [
        "accordion-2-content-1",
        "accordion-2-content-2",
        "accordion-2-content-3",
        "accordion-2-content-4",
        "accordion-2-content-5",
      ],
    },
  ];

  return (
    <Box sx={{ bgcolor: "grey.50", py: { xs: 4, md: 6 } }}>
      <Helmet>
        <title>{content["page-title"]}</title>
        <meta name="description" content={content["meta-description"]} />
        <meta name="keywords" content={content["meta-keywords"]} />
        <link rel="canonical" href={content["canonical-link"]} />
      </Helmet>

      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
        {/* Заголовок */}
        <Box
          sx={{
            background: "linear-gradient(to right, #D3D3FF, #B3B3FA)",
            color: "text.primary",
            borderRadius: { xs: 2, md: 3 },
            p: { xs: 3, md: 5 },
            boxShadow: 4,
            textAlign: "center",
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "1.875rem", md: "2.5rem" },
              fontWeight: "bold",
              color: "white",
            }}
            dangerouslySetInnerHTML={{ __html: content["main-heading"] }}
          />
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              maxWidth: "36rem",
              mx: "auto",
              fontSize: "1.125rem",
              color: "text.secondary",
            }}
          >
            {stripHtml(content["meta-description"])}
          </Typography>
        </Box>

        {/* Интро */}
        <Grid
          container
          spacing={4}
          sx={{ mb: { xs: 6, md: 8 }, alignItems: "center" }}
        >
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Box
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  lineHeight: 1.7,
                }}
                dangerouslySetInnerHTML={{ __html: content["intro"] }}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/return-policy.png"
              alt="Политика возврата"
              sx={{
                width: "100%",
                borderRadius: 3,
              }}
            />
          </Grid>
        </Grid>

        {/* Подраздел */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: 600,
              background: "linear-gradient(90deg, #9333EA, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            dangerouslySetInnerHTML={{ __html: content["sub-heading"] }}
          />
          <Box
            sx={{
              mt: 2,
              maxWidth: "48rem",
              mx: "auto",
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.125rem" },
              lineHeight: 1.7,
            }}
            dangerouslySetInnerHTML={{ __html: content["paragraph"] }}
          />
        </Box>

        {/* Аккордеоны */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {accordionItems.map((item, index) => (
            <Card key={index} sx={{ boxShadow: 2, borderRadius: 2 }}>
              <Accordion
                defaultExpanded={index === 0}
                sx={{
                  "&:before": { display: "none" },
                  boxShadow: "none",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#EC4899" }} />}
                  sx={{
                    px: 3,
                    py: 2,
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  {stripHtml(item.title)}
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <Box sx={{ px: 3, py: 2, bgcolor: "grey.50" }}>
                    <Box
                      component="ul"
                      sx={{
                        listStyle: "none",
                        p: 0,
                        m: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                      }}
                    >
                      {item.contents.map((contentId) => (
                        <Box
                          key={contentId}
                          component="li"
                          sx={{
                            color: "text.secondary",
                            fontSize: "1rem",
                            lineHeight: 1.7,
                            "&:not(:last-child)": {
                              pb: 1,
                              borderBottom: "1px solid",
                              borderColor: "divider",
                            },
                          }}
                          dangerouslySetInnerHTML={{
                            __html: content[contentId] || "<p>Нет данных</p>",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
