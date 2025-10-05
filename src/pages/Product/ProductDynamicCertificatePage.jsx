import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import useProductStore from "../../store/productStore";
import useBascketStore from "../../store/bascketStore";
import { urlPictures } from "../../configs/axiosConfig";

import ImageGallery from "@/global/components/ImageGallery";
import ImageZoomDialog from "@/global/components/ImageZoomDialog";
import RegionSelector from "@/global/components/RegionSelector";
import CharacteristicSelector from "@/global/components/CharacteristicSelector";
import PriceAndCartActions from "@/global/components/PriceAndCartActions";
// import ProductTabs from "@/components/ProductTabs";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

export default function ProductDynamicCertificatePage() {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [newRegion, setNewRegion] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedHeight, setSelectedHeight] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomedImageIndex, setZoomedImageIndex] = useState(0);

  const { id } = useParams();
  const { fetchProductById, products } = useProductStore();
  const { addProductThisBascket, fetchUserBasket } = useBascketStore();

  const isCatalog1 = products.data?.catalogs === 1;
  const isCatalog2 = products.data?.catalogs === 2;

  useEffect(() => {
    const loadProduct = async () => {
      await fetchProductById(id);
      if (products.data?.characteristic) {
        const sizes = products.data.characteristic
          .filter(
            (c) =>
              c.name.toLowerCase() === "размер" ||
              c.name.toLowerCase() === "объем/размер"
          )
          .flatMap((c) => c.value);
        setSelectedSize(sizes[0] || "");
        const colors = products.data.characteristic
          .filter((c) => c.name.toLowerCase() === "цвет")
          .flatMap((c) => c.value);
        setSelectedColor(colors[0] || "");
        const heights = products.data.characteristic
          .filter((c) => c.name.toLowerCase() === "рост")
          .flatMap((c) => c.value);
        setSelectedHeight(heights[0] || "");
      }
    };
    loadProduct();
  }, [id, fetchProductById]);

  useEffect(() => {
    if (products.data?.images) {
      const fetchedImages = products.data.images.map(
        (image) => `${urlPictures}/${image.name}`
      );
      setImages(fetchedImages);
    }
  }, [products.data]);

  const handleAddProductToBasket = async (productId) => {
    const iso = isCatalog1 ? null : newRegion?.value;
    const dynamicOptions = [];

    if (selectedSize) {
      const sizeCharacteristic = products.data?.characteristic?.find(
        (c) =>
          c.name.toLowerCase() === "размер" ||
          c.name.toLowerCase() === "объем/размер"
      );
      if (sizeCharacteristic) {
        dynamicOptions.push({ id: sizeCharacteristic.id, value: selectedSize });
      }
    }
    if (selectedColor) {
      const colorCharacteristic = products.data?.characteristic?.find(
        (c) => c.name.toLowerCase() === "цвет"
      );
      if (colorCharacteristic) {
        dynamicOptions.push({
          id: colorCharacteristic.id,
          value: selectedColor,
        });
      }
    }
    if (selectedHeight) {
      const heightCharacteristic = products.data?.characteristic?.find(
        (c) => c.name.toLowerCase() === "рост"
      );
      if (heightCharacteristic) {
        dynamicOptions.push({
          id: heightCharacteristic.id,
          value: selectedHeight,
        });
      }
    }

    await addProductThisBascket(
      productId,
      quantity,
      iso,
      dynamicOptions.length > 0 ? dynamicOptions : null
    );
    fetchUserBasket();
  };

  const sanitizedDescription = products.data?.description
    ? DOMPurify.sanitize(products.data.description)
    : "Нет описания.";

  return (
    <Box
      sx={{
        maxWidth: 1500,
        mx: "auto",
        mt: 3,
        mb: 6,
        px: { xs: 1, sm: 1.5, lg: 2 },
      }}
    >
      <Helmet>
        <title>{products.data ? products.data.name : "Загрузка..."}</title>
      </Helmet>

      <Box
        sx={{
          borderRadius: 2,
          p: 2,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 3,
        }}
      >
        {/* Галерея */}
        <ImageGallery
          images={images}
          mainImageIndex={mainImageIndex}
          setMainImageIndex={setMainImageIndex}
          onImageClick={() => {
            setZoomedImageIndex(mainImageIndex);
            setZoomOpen(true);
          }}
        />
        <ImageZoomDialog
          open={zoomOpen}
          onClose={() => setZoomOpen(false)}
          images={images}
          zoomedImageIndex={zoomedImageIndex}
          setZoomedImageIndex={setZoomedImageIndex}
        />

        {/* Информация */}
        <Box
          sx={{
            width: { xs: "100%", lg: "50%" },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: "1.875rem",
              fontWeight: 600,
              color: "text.primary",
              lineHeight: 1.25,
            }}
          >
            {products.data?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Артикул: {products.data?.article || "Не указан"}
          </Typography>

          {isCatalog2 && (
            <RegionSelector
              newRegion={newRegion}
              setNewRegion={setNewRegion}
              fetchProductById={fetchProductById}
              productId={id}
            />
          )}

          <CharacteristicSelector
            label="Выберите размер"
            characteristicName="размер"
            characteristics={products.data?.characteristic}
            selectedValue={selectedSize}
            setSelectedValue={setSelectedSize}
            showPrice={true} // Показывать цены для размеров
          />
          <CharacteristicSelector
            label="Выберите цвет"
            characteristicName="цвет"
            characteristics={products.data?.characteristic}
            selectedValue={selectedColor}
            setSelectedValue={setSelectedColor}
          />
          <CharacteristicSelector
            label="Выберите рост"
            characteristicName="рост"
            characteristics={products.data?.characteristic}
            selectedValue={selectedHeight}
            setSelectedValue={setSelectedHeight}
          />
          <Box>
            <Typography
              variant="h5"
              sx={{
                borderBottom: "2px solid #B3B3FA",
                color: "#B3B3FA",
                width: "fit-content",
                fontSize: "1.125rem",
                mb: 3,
              }}
            >
              Характеристики
            </Typography>
            <List sx={{ "& .MuiListItem-root": { py: 0.5 } }}>
              {products.data?.characteristic?.map((char) => (
                <ListItem
                  key={char.id}
                  sx={{ justifyContent: "space-between", px: 0 }}
                >
                  <ListItemText
                    primary={char.name}
                    primaryTypographyProps={{
                      sx: { color: "text.secondary", fontWeight: 500 },
                    }}
                  />
                  <Typography sx={{ fontWeight: 500 }}>
                    {char.value.join(", ")}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{
                borderBottom: "2px solid #B3B3FA",
                color: "#B3B3FA",
                width: "fit-content",
                fontSize: "1.125rem",
                mb: 3,
              }}
            >
              Описание
            </Typography>
            <Box
              sx={{ fontSize: "1rem", lineHeight: 1.6 }}
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
          </Box>
          {/* <ProductTabs
            product={products.data}
            tabValue={tabValue}
            setTabValue={setTabValue}
          /> */}
        </Box>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 2,
            border: "1px solid #E5E5F7",
            height: "max-content",
            p: 2,
            width: { xs: "100%", sm: 350 },
            maxWidth: 350,
          }}
        >
          <PriceAndCartActions
            product={products.data}
            isCatalog1={isCatalog1}
            isCatalog2={isCatalog2}
            newRegion={newRegion}
            addProductToBasket={handleAddProductToBasket}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedSize={selectedSize} // Передаем выбранный размер
            characteristics={products.data?.characteristic} // Передаем характеристики
          />
        </Box>
      </Box>
    </Box>
  );
}
