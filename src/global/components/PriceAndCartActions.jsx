import { Box, Button, Typography, IconButton, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import ChatWindow from "../../global/components/ChatWindow";

export default function PriceAndCartActions({
  product,
  isCatalog1,
  isCatalog2,
  newRegion,
  addProductToBasket,
  quantity,
  setQuantity,
  selectedSize, // Новый пропс для выбранного размера
  characteristics = [], // Новый пропс для характеристик
}) {
  const [isOpen, setIsOpen] = useState(false);
  const MAX_QUANTITY = 999;

  // Функция для получения цены на основе выбранного размера
  const getPriceBySize = () => {
    if (!selectedSize || !characteristics || characteristics.length === 0) {
      return null;
    }

    const sizeCharacteristic = characteristics.find(
      (c) =>
        c.name.toLowerCase() === "размер" ||
        c.name.toLowerCase() === "объем/размер"
    );

    if (!sizeCharacteristic || !sizeCharacteristic.prices) {
      return null;
    }

    const sizeIndex = sizeCharacteristic.value.indexOf(selectedSize);
    if (sizeIndex === -1 || !sizeCharacteristic.prices[sizeIndex]) {
      return null;
    }

    return sizeCharacteristic.prices[sizeIndex];
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1 && value <= MAX_QUANTITY) {
      setQuantity(value);
    }
  };

  const handleIncrement = () => {
    if (quantity < MAX_QUANTITY) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Получаем цену на основе размера или используем базовую цену
  const sizePrice = getPriceBySize();
  const displayPrice = sizePrice || product?.price;

  const showAddToCartButton = isCatalog1
    ? displayPrice !== undefined && displayPrice !== null
    : newRegion &&
      product?.certificate_price !== undefined &&
      product?.certificate_price !== null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box sx={{ mb: 2, textAlign: "center" }}>
        {isCatalog1 && displayPrice ? (
          <Box>
            <Typography
              variant="h4"
              sx={{
                color: "#B3B3FA",
                fontWeight: "bold",
                fontSize: "2rem",
                lineHeight: 1.2,
              }}
            >
              {displayPrice} ₽
            </Typography>
            {sizePrice && (
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mt: 0.5,
                  fontStyle: "italic",
                }}
              >
                Цена для размера: {selectedSize}
              </Typography>
            )}
          </Box>
        ) : isCatalog2 && newRegion && product?.certificate_price ? (
          <Typography
            variant="h4"
            sx={{
              color: "#B3B3FA",
              fontWeight: "bold",
              fontSize: "2rem",
              lineHeight: 1.2,
            }}
          >
            {product.certificate_price} ₽
          </Typography>
        ) : (
          <>
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                color: "#333",
                fontSize: "0.875rem",
                lineHeight: 1.4,
              }}
            >
              {isCatalog2
                ? "Пожалуйста, выберите регион для просмотра цены"
                : "Уточнить стоимость товара можно у менеджера"}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: "#B3B3FA",
                borderColor: "#B3B3FA",
                borderRadius: "4px",
                padding: "8px 20px",
                fontSize: "0.875rem",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#B3B3FA",
                  backgroundColor: "#E0F7FA",
                  color: "#B3B3FA",
                },
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(true);
              }}
              aria-label="Открыть чат поддержки"
            >
              Открыть чат поддержки
            </Button>
            {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
          </>
        )}
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        {showAddToCartButton && (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                mb: 1,
              }}
            >
              <IconButton
                onClick={handleDecrement}
                sx={{
                  width: 40,
                  height: 40,
                  border: "1px solid #E0E0E0",
                  borderRadius: "4px 0 0 4px",
                  backgroundColor: "#F8F8F8",
                  "&:hover": {
                    backgroundColor: "#B3B3FA",
                    color: "#FFFFFF",
                    borderColor: "#B3B3FA",
                  },
                }}
                disabled={quantity <= 1}
                aria-label="Уменьшить количество"
              >
                <Remove fontSize="small" />
              </IconButton>
              <TextField
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{
                  min: 1,
                  max: MAX_QUANTITY,
                  step: 1,
                  style: {
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  },
                }}
                sx={{
                  width: 60,
                  "& .MuiInputBase-root": {
                    borderRadius: 0,
                    height: 40,
                    border: "1px solid #E0E0E0",
                    backgroundColor: "#F8F8F8",
                  },
                  "& input": {
                    fontWeight: "bold",
                    padding: "8px 4px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E0E0E0",
                  },
                }}
                size="small"
                aria-label="Количество товара"
              />
              <IconButton
                onClick={handleIncrement}
                sx={{
                  width: 40,
                  height: 40,
                  border: "1px solid #E0E0E0",
                  borderRadius: "0 4px 4px 0",
                  backgroundColor: "#F8F8F8",
                  "&:hover": {
                    backgroundColor: "#B3B3FA",
                    color: "#FFFFFF",
                    borderColor: "#B3B3FA",
                  },
                }}
                disabled={quantity >= MAX_QUANTITY}
                aria-label="Увеличить количество"
              >
                <Add fontSize="small" />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#B3B3FA",
                color: "#FFFFFF",
                borderRadius: "4px",
                padding: "12px 20px",
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                height: 48,
                boxShadow: "0 2px 4px rgba(0, 179, 164, 0.3)",
                "&:hover": {
                  backgroundColor: "#B3B3FA",
                  boxShadow: "0 4px 8px rgba(0, 179, 164, 0.4)",
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
              }}
              onClick={() => addProductToBasket(product.id)}
              aria-label="Добавить в корзину"
            >
              Добавить в корзину
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
