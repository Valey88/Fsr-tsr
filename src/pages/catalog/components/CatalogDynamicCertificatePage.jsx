import React, { useEffect, useState, memo, useCallback } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  Typography,
  Grid,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import useProductStore from "../../../store/productStore";
import useBascketStore from "../../../store/bascketStore";
import { urlPictures } from "../../../constants/constants";
import SidebarFilter from "./SidebarFilter";

const ProductCard = memo(({ e }) => {
  return (
    <Link
      to={`/product/certificate/${e.id}`}
      style={{ textDecoration: "none", background: "none" }}
    >
      <Card
        sx={{
          width: { xs: "170px", md: "261px" },
          height: { xs: "600px", md: "600px" },
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          position: "relative", // Добавлено для корректного позиционирования preview
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0 4px 25px rgba(0,0,0,0.15)",
          },
          boxShadow: "none",
        }}
      >
        {e.preview && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              right: 8, // Добавлено для ограничения ширины
              bgcolor: "#7E22CE",
              color: "#fff",
              px: 1.5,
              py: 0.5,
              borderRadius: "8px",
              maxWidth: "max-content", // Ограничение ширины с учетом отступов
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              zIndex: 10, // Увеличено значение z-index
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)", // Добавлена тень для лучшей видимости
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "0.7rem", md: "0.75rem" }, // Адаптивный размер шрифта
                lineHeight: 1.2,
              }}
            >
              {e.preview}
            </Typography>
          </Box>
        )}
        <CardMedia
          component="img"
          image={`${urlPictures}/${e.images[0]?.name}`}
          alt={`Сертификат ТСР: ${e.name}`}
          loading="lazy"
          sx={{
            width: "100%",
            height: { xs: "200px", md: "300px" },
            objectFit: "contain",
            mt: e.preview ? 3 : 0, // Добавлен отступ сверху если есть preview
          }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            pt: 2, // Добавлен отступ сверху в CardContent
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "bold",
              mb: 1,
              cursor: "pointer",
              mt: e.preview ? 1 : 0, // Дополнительный отступ если есть preview
            }}
          >
            {e.name}
          </Typography>
          {e.nameplate && (
            <Box
              sx={{
                bgcolor: "#2e9efaff",
                color: "#fff",
                px: 1.5,
                py: 0.5,
                borderRadius: "8px",
                mb: 1,
                zIndex: 1, // Добавлен z-index для nameplate
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {e.nameplate}
              </Typography>
            </Box>
          )}
          {e.catalogs === 1 && (
            <Typography
              variant="h6"
              sx={{ color: "#B3B3FA", fontWeight: "bold", mb: 1 }}
            >
              {e.price} ₽
            </Typography>
          )}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#cb48ecff",
              color: "#fff",
              borderRadius: "8px",
              "&:hover": { bgcolor: "#b001dbff" },
              mt: "auto",
            }}
          >
            Подробнее
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
});

export default function CatalogDynamicCertificatePage() {
  const { id } = useParams();
  const { fetchProducts, products } = useProductStore();
  const { addProductThisBascket } = useBascketStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(null);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [ProductsPerPage] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("default");

  const category_id = id;

  useEffect(() => {
    const offset = (currentPage - 1) * ProductsPerPage;
    setLoading(true);
    fetchProducts(category_id, filters, offset, ProductsPerPage, "1,2")
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [category_id, fetchProducts, filters, currentPage]);

  useEffect(() => {
    if (products?.data) {
      let normalizedProducts = Array.isArray(products.data)
        ? products.data
        : [products.data];
      let sortedProducts = [...normalizedProducts];
      if (sortOrder === "priceAsc")
        sortedProducts.sort((a, b) => a.price - b.price);
      else if (sortOrder === "priceDesc")
        sortedProducts.sort((a, b) => b.price - a.price);
      setCurrentProducts(sortedProducts);
    } else {
      setCurrentProducts([]);
    }
  }, [products, sortOrder]);

  const handleChangePage = (event, value) => setCurrentPage(value);

  // SEO: Schema.org JSON-LD
  const schemaProducts = currentProducts.map((e, index) => ({
    "@type": "Product",
    position: index + 1,
    name: e.name,
    image: `${urlPictures}/${e.images[0]?.name}`,
    url: `https://sfr-tcr.ru/product/certificate/${e.id}`,
    offers: {
      "@type": "Offer",
      price: e.price || 0,
      priceCurrency: "RUB",
    },
  }));

  return (
    <Box sx={{ mt: 2, mb: 5 }}>
      <Helmet>
        <title>
          Сертификаты ТСР | СФР-ТСР - Купить технические средства реабилитации
        </title>
        <meta
          name="description"
          content="Купить сертификаты на технические средства реабилитации (ТСР) в компании СФР-ТСР. Полный каталог товаров с ценами и описаниями."
        />
        <link rel="canonical" href={`https://sfr-tcr.ru/catalog/${id}`} />
        {currentPage > 1 && (
          <link
            rel="prev"
            href={`https://sfr-tcr.ru/catalog/${id}?page=${currentPage - 1}`}
          />
        )}
        {currentPage < Math.ceil((products.count || 0) / ProductsPerPage) && (
          <link
            rel="next"
            href={`https://sfr-tcr.ru/catalog/${id}?page=${currentPage + 1}`}
          />
        )}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: schemaProducts.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: p,
            })),
          })}
        </script>
      </Helmet>

      <SidebarFilter setFilters={setFilters} />

      <Grid
        container
        spacing={2}
        sx={{
          mt: 2,
          mx: "auto",
          width: "fit-content",
          maxWidth: "100%",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Typography>Загрузка...</Typography>
          </Box>
        ) : error ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Typography color="error">Ошибка: {error}</Typography>
          </Box>
        ) : currentProducts.length > 0 ? (
          currentProducts.map((e) => (
            <Grid item key={e.id} xs={6} sm={4} md={3}>
              <ProductCard e={e} />
            </Grid>
          ))
        ) : (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Typography>Нет данных для отображения</Typography>
          </Box>
        )}
      </Grid>

      {currentProducts.length > 0 && (
        <Pagination
          count={Math.ceil((products.count || 0) / ProductsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          sx={{ mt: 4, display: "flex", justifyContent: "center" }}
        />
      )}
    </Box>
  );
}
