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

  const categoriesList = Array.isArray(category.data) ? category.data : [];

  const schemaCategories = categoriesList.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    url: `https://sfrtcr.ru/products/certificate/${item.id}`,
  }));

  return (
    <Box sx={{ mt: 6, mb: 10 }}>
      <Helmet>
        <title>Категории товаров | СФР-ТСР</title>
        <meta
          name="description"
          content="Ознакомьтесь с категориями товаров компании СФР-ТСР. Широкий ассортимент продукции для ваших нужд и сертифицированные товары."
        />
        <meta
          name="keywords"
          content="категории товаров, СФР-ТСР, сертификаты, ТСР, медицинские товары, продукция"
        />
        <link rel="canonical" href="https://sfrtcr.ru/categories" />

        {/* Open Graph / Social */}
        <meta property="og:title" content="Категории товаров | СФР-ТСР" />
        <meta
          property="og:description"
          content="Ознакомьтесь с категориями товаров компании СФР-ТСР. Широкий ассортимент продукции для ваших нужд и сертифицированные товары."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sfrtcr.ru/categories" />
        <meta
          property="og:image"
          content="https://sfrtcr.ru/og-image-categories.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Категории товаров | СФР-ТСР" />
        <meta
          name="twitter:description"
          content="Ознакомьтесь с категориями товаров компании СФР-ТСР. Широкий ассортимент продукции для ваших нужд и сертифицированные товары."
        />
        <meta
          name="twitter:image"
          content="https://sfrtcr.ru/og-image-categories.jpg"
        />

        {/* Schema.org для категорий */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: schemaCategories,
          })}
        </script>
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
          Категории товаров СФР-ТСР
        </Typography>

        {categoriesList.length > 0 ? (
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            columns={{ xs: 2, sm: 3, md: 4, lg: 5 }}
            justifyContent="center"
          >
            {categoriesList.map((item) => (
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
                        alt={`Категория товаров ${item.name} компании СФР-ТСР`}
                        sx={{
                          width: "320px",
                          height: "300px",
                          objectFit: "contain",
                          transition: "transform 0.4s ease",
                          "&:hover": { transform: "scale(1.05)" },
                        }}
                      />
                    </Box>

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
