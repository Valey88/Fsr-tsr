import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import api from "../../configs/axiosConfig";

export default function Details() {
  const [content, setContent] = useState({
    "page-title":
      "Реквизиты компании СФР-ТСР — Полная информация, ИНН, КПП, контакты",
    "meta-description":
      "Официальные реквизиты ООО «СФР-ТСР»: ИНН, КПП, ОГРН, юридический адрес, банковские реквизиты и контактная информация. СФР-ТСР — надёжный поставщик и партнёр.",
    "meta-keywords":
      "СФР-ТСР, реквизиты СФР-ТСР, ИНН СФР-ТСР, КПП СФР-ТСР, ОГРН СФР-ТСР, контакты СФР-ТСР, sfr-tcr.ru, поставщик, оборудование, компания, реквизиты организации",
    "main-heading": "<h1>Реквизиты компании ООО «СФР-ТСР»</h1>",
    "section-heading":
      "<h2>ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ «СФР-ТСР»</h2>",
    "detail-1":
      "<p>ИНН 5609200001, КПП 560901002, ОГРН 1225600000456</p><p>460005, Оренбургская область, г. Оренбург, ул. Шевченко д. 20В, офис 1</p>",
    "detail-2": "<p>БИК 042202824</p>",
    "detail-3": "<p>К/с 30101810200000000824</p>",
    "detail-4": "<p>Р/с 40702810229250005622</p>",
    "detail-5":
      "<p>E-mail: info@sfr-tcr.ru | Сайт: <a href='https://sfr-tcr.ru'>https://sfr-tcr.ru</a></p>",
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get("/page/deteils");
        const elements = response.data?.data?.elements || [];
        const newContent = {};
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

  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ООО «СФР-ТСР»",
    url: "https://sfr-tcr.ru",
    logo: "https://sfr-tcr.ru/logo.png",
    description:
      "ООО «СФР-ТСР» — надёжный поставщик оборудования и товаров. Работаем по всей России. ИНН 5609200001, КПП 560901002, ОГРН 1225600000456.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Шевченко, д. 20В, офис 1",
      addressLocality: "Оренбург",
      postalCode: "460005",
      addressCountry: "RU",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+7 (000) 000-00-00",
      contactType: "customer service",
      email: "info@sfr-tcr.ru",
    },
    sameAs: ["https://vk.com/sfr-tcr", "https://ok.ru/sfr-tcr"],
  };

  return (
    <Box
      sx={{
        py: 2,
        background: "linear-gradient(180deg, #FAF5FF 0%, #F3E8FF 100%)",
      }}
    >
      <Helmet>
        <title>{content["page-title"]}</title>
        <meta name="description" content={content["meta-description"]} />
        <meta name="keywords" content={content["meta-keywords"]} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={content["page-title"]} />
        <meta property="og:description" content={content["meta-description"]} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sfr-tcr.ru/details" />
        <meta property="og:site_name" content="СФР-ТСР" />
        <meta property="og:locale" content="ru_RU" />
        <meta
          property="og:image"
          content="https://sfr-tcr.ru/og-image-sfr-tcr.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content["page-title"]} />
        <meta
          name="twitter:description"
          content={content["meta-description"]}
        />
        <meta
          name="twitter:image"
          content="https://sfr-tcr.ru/og-image-sfr-tcr.jpg"
        />
        <link rel="canonical" href="https://sfr-tcr.ru/details" />
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>
      </Helmet>

      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            component="h1"
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: 800,
              color: "#7E22CE",
              mb: 1,
              fontSize: { xs: "1.5rem", md: "1.8rem" },
            }}
            dangerouslySetInnerHTML={{
              __html: content["main-heading"],
            }}
          />
          <Divider
            sx={{
              width: 100,
              mx: "auto",
              my: 2,
              borderColor: "#A855F7",
              borderBottomWidth: 3,
              borderRadius: 2,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Card
            sx={{
              borderRadius: 5,
              overflow: "hidden",
              boxShadow: "0 6px 25px rgba(147,51,234,0.15)",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(250,245,255,0.95))",
              backdropFilter: "blur(6px)",
              mt: 4,
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Typography
                component="h2"
                variant="h5"
                sx={{
                  textAlign: "center",
                  fontWeight: 700,
                  color: "#9333EA",
                  mb: 3,
                  fontSize: { xs: "1.3rem", md: "1.6rem" },
                }}
                dangerouslySetInnerHTML={{
                  __html: content["section-heading"],
                }}
              />

              <List sx={{ px: { xs: 1, md: 3 } }}>
                {[
                  "detail-1",
                  "detail-2",
                  "detail-3",
                  "detail-4",
                  "detail-5",
                ].map((id, index) => (
                  <ListItem
                    key={id}
                    sx={{
                      display: "block",
                      borderBottom:
                        index < 4 ? "1px solid rgba(147,51,234,0.1)" : "none",
                      py: 2,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#4B0082",
                        fontSize: { xs: "1rem", md: "1.05rem" },
                        lineHeight: 1.8,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: content[id] || "<p>Нет данных</p>",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Box
            sx={{
              textAlign: "center",
              mt: 5,
              color: "#7E22CE",
              fontSize: "0.95rem",
              opacity: 0.8,
            }}
          >
            <Typography>
              © {new Date().getFullYear()} ООО «СФР-ТСР». Все права защищены.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
