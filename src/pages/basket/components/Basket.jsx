// --- BasketWB.jsx ---
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useBascketStore from "../../../store/bascketStore";
import { urlPictures } from "../../../constants/constants";

export default function Basket() {
  const {
    fetchUserBasket,
    basket,
    deleteProductThithBasket,
    editCountProductBascket,
  } = useBascketStore();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchUserBasket();
  }, []);

  useEffect(() => {
    if (basket?.data?.items) {
      const normalized = Array.isArray(basket.data.items)
        ? basket.data.items
        : [basket.data.items];
      setItems(normalized);
    } else setItems([]);
  }, [basket]);

  const handleDelete = async (id) => {
    await deleteProductThithBasket(id);
    setItems((prev) => prev.filter((p) => p.id !== id));
    fetchUserBasket();
  };

  const handleChangeCount = (id, delta, iso) => {
    setItems((prev) =>
      prev.map((p) =>
        p.product_id === id
          ? { ...p, quantity: Math.max((Number(p.quantity) || 1) + delta, 1) }
          : p
      )
    );
    editCountProductBascket(id, delta, iso).then(() => fetchUserBasket());
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Корзина
      </Typography>
      {items.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Ваша корзина пуста
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {items.map((p) => (
            <Grid item xs={12} key={p.product_id}>
              <Card
                sx={{
                  display: "flex",
                  gap: 2,
                  p: 2,
                  borderRadius: 2,
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  image={`${urlPictures}/${p.image}`}
                  alt={p.name}
                  sx={{
                    width: 140,
                    height: 120,
                    objectFit: "contain",
                    borderRadius: 1,
                    bgcolor: "white",
                  }}
                />
                <CardContent sx={{ flex: 1, p: 0 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {p.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#6B6B6B" }}>
                    {p.brand}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ mt: 1, color: "#7B2BD1", fontWeight: 700 }}
                  >
                    {p.total_price} ₽
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <Button
                      size="small"
                      onClick={() => handleChangeCount(p.product_id, -1, p.iso)}
                      disabled={Number(p.quantity) <= 1}
                    >
                      −
                    </Button>
                    <TextField
                      value={p.quantity}
                      size="small"
                      inputProps={{ style: { textAlign: "center", width: 56 } }}
                    />
                    <Button
                      size="small"
                      onClick={() => handleChangeCount(p.product_id, 1, p.iso)}
                    >
                      +
                    </Button>
                    <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(p.id)}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
