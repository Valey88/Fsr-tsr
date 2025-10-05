import { Box, Typography } from "@mui/material";

export default function CharacteristicSelector({
  label,
  characteristicName,
  characteristics,
  selectedValue,
  setSelectedValue,
  showPrice = false, // Новый пропс для отображения цены
}) {
  const characteristic = characteristics?.find(
    (c) => c.name.toLowerCase() === characteristicName.toLowerCase()
  );

  if (
    !characteristic ||
    !characteristic.value ||
    characteristic.value.length === 0
  )
    return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 1, color: "#212121" }}
      >
        {label}:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
        role="radiogroup"
        aria-label={label}
      >
        {characteristic.value.map((value, index) => {
          const price = characteristic.prices?.[index];
          const displayPrice = price ? ` (${price} ₽)` : "";

          return (
            <Box
              key={index}
              onClick={() => setSelectedValue(value)}
              sx={{
                width: "max-content",
                height: 40,
                border:
                  selectedValue === value
                    ? "2px solid #B3B3FA"
                    : "1px solid #E0E0E0",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backgroundColor:
                  selectedValue === value ? "#B3B3FA" : "transparent",
                color: selectedValue === value ? "#FFFFFF" : "text.primary",
                "&:hover": {
                  borderColor: "#B3B3FA",
                  backgroundColor:
                    selectedValue === value ? "#B3B3FA" : "#F5F5F5",
                },
                pl: 1,
                pr: 1,
                transition: "all 0.2s ease",
              }}
              role="radio"
              aria-checked={selectedValue === value}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedValue(value);
                }
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: "medium" }}>
                {value}
                {showPrice && displayPrice}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
