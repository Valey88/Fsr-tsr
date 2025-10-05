import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useCategoryStore from "../../store/categoryStore";
import { urlPictures } from "../../constants/constants";

export default function CategoriesPage() {
  const { fetchCategory, category } = useCategoryStore();

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return (
    <Box sx={{ mt: 6, mb: 10 }}>
      <Helmet>
        <title>Категории товаров | Sdmedik.ru</title>
        <meta
          name="description"
          content="Ознакомьтесь с нашими категориями товаров. Мы предлагаем широкий ассортимент продукции для ваших нужд."
        />
        <meta
          name="keywords"
          content="категории, товары, ассортимент, продукция"
        />
      </Helmet>

      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 4,
            textAlign: "center",
            color: "#1f1f1f",
          }}
        >
          Категории товаров
        </Typography>

        {Array.isArray(category.data) && category.data.length > 0 ? (
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            columns={{ xs: 2, sm: 3, md: 4, lg: 5 }}
            justifyContent="center"
          >
            {category.data.map((item) => (
              <Grid item xs={1} sm={1} md={1} lg={1} key={item.id}>
                <Link
                  to={`/products/certificate/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      height: 320,
                      borderRadius: "16px",
                      backgroundColor: "#fff",
                      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
                      transition: "all 0.3s ease",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                  >
                    {/* Изображение категории */}
                    <Box
                      sx={{
                        flex: "1 1 auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                        backgroundColor: "#fafafa",
                        position: "relative",
                      }}
                    >
                      <Box
                        component="img"
                        src={`${urlPictures}/${item.images?.[0]?.name}`}
                        alt={item.name}
                        sx={{
                          width: "320px",
                          height: "300px",
                          objectFit: "contain",
                          transition: "transform 0.4s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      />
                    </Box>

                    {/* Нижний блок с названием */}
                    <CardContent
                      sx={{
                        p: 2,
                        background: "#cb48ecff",
                        color: "#fff",
                        borderBottomLeftRadius: "16px",
                        borderBottomRightRadius: "16px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        height: "80px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: "0.9rem", md: "1rem" },
                          lineHeight: 1.3,
                        }}
                      >
                        {item.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="h6"
            align="center"
            sx={{ mt: 5, color: "text.secondary" }}
          >
            Нет данных
          </Typography>
        )}
      </Container>
    </Box>
  );
}
