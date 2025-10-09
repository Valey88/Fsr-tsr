import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import api from "../../configs/axiosConfig";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";

const stripHtml = (html) =>
  typeof html === "string" ? html.replace(/<[^>]+>/g, "") : "";

export default function ElectronicCertificate() {
  const [content, setContent] = useState({});

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get("/page/certificate");
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

  const accordionItems = [
    { title: "accordion-1-title", content: "accordion-1-content" },
    { title: "accordion-2-title", content: "accordion-2-content" },
    { title: "accordion-3-title", content: "accordion-3-content" },
    { title: "accordion-4-title", content: "accordion-4-content" },
  ];

  const listItems = [
    { title: "list-1-title", content: ["list-1-content"] },
    { title: "list-2-title", content: ["list-2-content"] },
    { title: "list-3-title", content: ["list-3-content"] },
    { title: "list-4-title", content: ["list-4-content"] },
    {
      title: "list-5-title",
      content: ["list-5-content-1", "list-5-content-2"],
    },
    { title: "list-6-title", content: ["list-6-content"] },
  ];

  const pageTitle =
    content["page-title"] ||
    "Электронные сертификаты — государственная поддержка от СФР-ТСР";
  const pageDescription =
    stripHtml(content["meta-description"]) ||
    "Информация о получении электронных сертификатов СФР-ТСР для приобретения технических средств реабилитации. Подробные условия, порядок использования и ответы на частые вопросы.";
  const pageKeywords =
    "СФР-ТСР, электронный сертификат, ТСР, сертификат на технические средства реабилитации, sfrtcr.ru, государственная программа, получение сертификата, инвалиды, поддержка государства, СФР";

  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    url: "https://sfrtcr.ru/certificate",
    description: pageDescription,
    publisher: {
      "@type": "Organization",
      name: "ООО «СФР-ТСР»",
      url: "https://sfrtcr.ru",
      logo: "https://sfrtcr.ru/logo.png",
      sameAs: ["https://vk.com/sfrtcr", "https://ok.ru/sfrtcr"],
    },
  };

  return (
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://sfrtcr.ru/certificate" />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sfrtcr.ru/certificate" />
        <meta
          property="og:image"
          content="https://sfrtcr.ru/og-image-certificate.jpg"
        />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="СФР-ТСР" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content="https://sfrtcr.ru/og-image-certificate.jpg"
        />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(to right, #D3D3FF, #B3B3FA)",
          color: "white",
          textAlign: "center",
          py: { xs: 6, md: 8 },
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
                fontSize: { xs: "2rem", md: "3rem" },
                mb: 2,
              }}
              dangerouslySetInnerHTML={{
                __html:
                  content["main-heading"] ||
                  "Электронные сертификаты для получения ТСР",
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
              {pageDescription}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ mt: { xs: 4, md: 6 }, mb: 8 }}>
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {[1, 2].map((n) => (
            <Card
              key={n}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 4,
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                mb: 3,
                "&:hover": { boxShadow: "0 6px 25px rgba(0,0,0,0.1)" },
              }}
            >
              <CardContent>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: { xs: "1rem", md: "1.125rem" },
                    lineHeight: 1.8,
                  }}
                  dangerouslySetInnerHTML={{ __html: content[`intro-${n}`] }}
                />
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Accordion Section */}
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

        {accordionItems.map((item, i) => (
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
                expandIcon={<ExpandMoreIcon sx={{ color: "#9333EA" }} />}
                sx={{
                  backgroundColor: "#fff",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#f9f5ff",
                  },
                }}
              >
                {stripHtml(content[item.title])}
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
        ))}

        {/* Lists */}
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
          Полезная информация
        </Typography>

        {listItems.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <Card
              sx={{
                p: { xs: 2, md: 3 },
                mb: 3,
                borderRadius: 4,
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                "&:hover": { boxShadow: "0 6px 20px rgba(0,0,0,0.08)" },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#9333EA",
                  mb: 1.5,
                }}
                dangerouslySetInnerHTML={{
                  __html: content[section.title] || `<p>Раздел ${i + 1}</p>`,
                }}
              />
              <Box component="ul" sx={{ pl: 3, m: 0 }}>
                {section.content.map((cId) => (
                  <Box
                    component="li"
                    key={cId}
                    sx={{
                      mb: 1,
                      color: "text.secondary",
                      lineHeight: 1.7,
                      fontSize: "1rem",
                    }}
                  >
                    <Typography
                      component="div"
                      dangerouslySetInnerHTML={{
                        __html: content[cId] || "<p>Нет данных</p>",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Card>
          </motion.div>
        ))}
      </Container>
    </Box>
  );
}
