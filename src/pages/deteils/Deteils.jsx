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
    "page-title": "Реквизиты компании СД-МЕД - Полная информация о компании",
    "meta-description":
      "Узнайте полные реквизиты компании СД-МЕД, включая ИНН, КПП, адрес и контактные данные.",
    "meta-keywords": "реквизиты СД-МЕД, ИНН СД-МЕД, контактные данные",
    "main-heading": "<h1>Реквизиты</h1>",
    "section-heading":
      "<h2>ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ «СД-МЕД»</h2>",
    "detail-1":
      "<p>ИНН 5609198444, КПП 560901001, ОГРН 1225600000361</p><p>460005, Оренбургская область, г. Оренбург, ул. Шевченко д. 20В, офис 1</p>",
    "detail-2": "<p>БИК 042202824</p>",
    "detail-3": "<p>К/с 30101810200000000824</p>",
    "detail-4": "<p>Р/с 40702810529250005622</p>",
    "detail-5": "<p>E-mail: Sd2-info@yandex.ru | www.sdmedik.ru</p>",
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

  return (
    <Box
      sx={{
        py: 2,
        background: "linear-gradient(180deg, #FAF5FF 0%, #F3E8FF 100%)", // мягкий фиолетовый градиент WB
      }}
    >
      <Helmet>
        <title>{content["page-title"]}</title>
        <meta name="description" content={content["meta-description"]} />
        <meta name="keywords" content={content["meta-keywords"]} />
      </Helmet>

      <Container maxWidth="md">
        {/* Заголовок страницы */}
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

        {/* Основной контент */}
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
              {/* Название компании */}
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

              {/* Список реквизитов */}
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

        {/* Подвал страницы с акцентом */}
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
            <Typography>© ООО «СД-МЕД». Все права защищены.</Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
