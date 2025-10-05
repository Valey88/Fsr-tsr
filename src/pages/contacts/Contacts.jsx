import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import api from "../../configs/axiosConfig";

export default function Contacts() {
  const [content, setContent] = useState({
    "page-title": "Контакты - Компания СД-МЕД",
    "meta-description": "Контактная информация нашей компании",
    "meta-keywords": "контакты, адрес, телефон",
    "main-heading": "<h1>Контакты</h1>",
    "phone-1": "+7 (903) 086 3091",
    "phone-2": "+7 (353) 293 5241",
    "address-1":
      "г. Оренбург, ул. Шевченко д. 20 «В», Магазин - Склад<br>+7 3532 93-52-41",
    "address-2":
      "г. Орск, проспект Мира. 15 «Д», ТД Яшма, магазин «Памперсы»<br>+7 905 896-23-23",
    "address-3":
      "г. Уфа, ул. Степана Кувыкина, 41, Магазин-Склад<br>+7 961 366-82-46",
    "address-4":
      "г. Екатеринбург, пр-т. Ленина 79 «Б», Центр обучения<br>+7 903 086-34-11",
    "coords-1": "[51.769, 55.096]",
    "coords-2": "[51.227, 58.562]",
    "coords-3": "[54.738, 55.972]",
    "coords-4": "[56.838, 60.597]",
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get("/page/contacts");
        const elements = Array.isArray(response.data?.data?.elements)
          ? response.data.data.elements
          : [];
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

  const addresses = [
    {
      address: content["address-1"],
      coords: JSON.parse(content["coords-1"] || "[51.769, 55.096]"),
    },
    {
      address: content["address-2"],
      coords: JSON.parse(content["coords-2"] || "[51.227, 58.562]"),
    },
    {
      address: content["address-3"],
      coords: JSON.parse(content["coords-3"] || "[54.738, 55.972]"),
    },
    {
      address: content["address-4"],
      coords: JSON.parse(content["coords-4"] || "[56.838, 60.597]"),
    },
  ];

  const stripHtml = (html) => html.replace(/<[^>]+>/g, "");

  return (
    <Box
      sx={{
        py: 1,
        background: "linear-gradient(180deg, #FAF5FF 0%, #F3E8FF 100%)",
      }}
    >
      <Helmet>
        <title>{content["page-title"]}</title>
        <meta name="description" content={content["meta-description"]} />
        <meta name="keywords" content={content["meta-keywords"]} />
      </Helmet>

      <Container maxWidth="lg">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
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

        {/* Контент */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 5,
            alignItems: "stretch",
          }}
        >
          {/* Карта */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ flex: 1 }}
          >
            <Card
              sx={{
                height: "max-content",
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 4px 25px rgba(147,51,234,0.15)",
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(6px)",
              }}
            >
              <YMaps>
                <Map
                  defaultState={{ center: [54.738, 55.972], zoom: 4 }}
                  style={{ width: "100%", height: "550px" }}
                >
                  {addresses.map((item, index) => (
                    <Placemark
                      key={index}
                      geometry={item.coords}
                      properties={{
                        balloonContent: item.address,
                      }}
                      options={{
                        iconColor: "#9333EA",
                      }}
                    />
                  ))}
                </Map>
              </YMaps>
            </Card>
          </motion.div>

          {/* Контакты */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            style={{ flex: 0.9 }}
          >
            <Card
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                boxShadow: "0 6px 25px rgba(147,51,234,0.1)",
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.85), rgba(250,245,255,0.95))",
                backdropFilter: "blur(6px)",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#9333EA",
                    mb: 2,
                  }}
                >
                  Контактная информация
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    sx={{ fontSize: "1rem", color: "#4B0082", mb: 1 }}
                  >
                    Телефоны:
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {stripHtml(content["phone-1"])}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {stripHtml(content["phone-2"])}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2, borderColor: "rgba(147,51,234,0.15)" }} />

                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: "#4B0082",
                    mb: 1,
                    fontWeight: 600,
                  }}
                >
                  Пункты выдачи заказов:
                </Typography>

                <List sx={{ pl: 0 }}>
                  {[1, 2, 3, 4].map((index) => (
                    <ListItem
                      key={index}
                      sx={{
                        display: "block",
                        mb: 2,
                        color: "#5B21B6",
                        fontSize: "0.95rem",
                      }}
                    >
                      <Typography
                        component="div"
                        dangerouslySetInnerHTML={{
                          __html:
                            content[`address-${index}`] || "<p>Нет данных</p>",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            textAlign: "center",
            mt: 6,
            color: "#7E22CE",
            opacity: 0.8,
            fontSize: "0.9rem",
          }}
        >
          © ООО «СД-МЕД». Все права защищены.
        </Box>
      </Container>
    </Box>
  );
}
