// --- RightBarWB.jsx ---
import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  LinearProgress,
  TextField,
  Modal,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";
import useBascketStore from "../../../store/bascketStore";

const WB = {
  purple: "#7B2BD1",
  purpleDark: "#5A1EA0",
  purpleLight: "#F7F2FF",
  accent: "#FF3BAC",
  neutralBg: "#FAF8FC",
  mutedText: "#6B6B6B",
};

export default function RightBar() {
  const { basket } = useBascketStore();
  const basketData = basket.data || {};
  const navigate = useNavigate();
  const [openDelivery, setOpenDelivery] = useState(false);
  const [openCertificate, setOpenCertificate] = useState(false);
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    const totalPrice =
      basketData.total_price_with_promotion > 0
        ? basketData.total_price_with_promotion
        : basketData.total_price || 0;
    if (totalPrice < 5000 && totalPrice > 0) {
      setOpenDelivery(true);
    }
  }, [basketData.total_price_with_promotion, basketData.total_price]);

  const total = useMemo(
    () =>
      basketData.total_price_with_promotion > 0
        ? basketData.total_price_with_promotion
        : basketData.total_price || 0,
    [basketData]
  );
  const progress = Math.min(Math.round((Number(total) / 5000) * 100), 100);

  return (
    <Box sx={{ position: { md: "sticky" }, top: 100 }}>
      <Paper
        sx={{ p: 3, borderRadius: 2, boxShadow: 3, bgcolor: WB.purpleLight }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
          Оформление заказа
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" sx={{ color: WB.mutedText }}>
            Товаров
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {basketData.quantity || 0}
          </Typography>
        </Box>

        {basketData.total_price_with_promotion > 0 && (
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" sx={{ color: WB.mutedText }}>
              Скидка
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: WB.purpleDark, fontWeight: 700 }}
            >
              {basketData.total_price - basketData.total_price_with_promotion} ₽
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Typography variant="subtitle2" sx={{ color: WB.mutedText }}>
            Итого
          </Typography>
          <Typography variant="h5" sx={{ color: "#cb48ecff", fontWeight: 800 }}>
            {total} ₽
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 2,
              mb: 1,
              backgroundColor: "rgba(203, 72, 236, 0.1)", // Светлый прозрачный фон на основе вашего цвета
              "& .MuiLinearProgress-bar1Determinate": {
                background:
                  "linear-gradient(90deg, #cb48ec 0%, #a239d0 50%, #8a1fc4 100%)", // Красивый градиент фиолетового для бара
                borderRadius: 2,
                transition: "transform 0.3s ease", // Плавная анимация заполнения
              },
              // Дополнительно: тонкая граница для обрамления
              border: "1px solid rgba(203, 72, 236, 0.2)",
              borderRadius: 2,
            }}
          />
          <Typography variant="caption" sx={{ color: WB.mutedText }}>
            {total >= 5000
              ? "Доставка бесплатна"
              : `Добавьте товаров на ${
                  5000 - Number(total)
                } ₽ до бесплатной доставки`}
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate("/paymants")}
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: 2,
            background: "#cb48ecff",
            textTransform: "none",
          }}
        >
          Перейти к оплате
        </Button>
      </Paper>
    </Box>
  );
}
