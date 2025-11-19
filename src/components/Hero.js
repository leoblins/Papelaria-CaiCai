import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  useWindowDimensions,
} from "react-native";

const SLIDES = [
  {
    tag: "VOLTA ÀS AULAS",
    title: "Bem-vindo à CaiCai Papelaria",
    description:
      "Cadernos, agendas, planners e muito mais para organizar sua rotina.\nEncontre tudo em um só lugar com atendimento de confiança.",
    image: require("./assets/cadernoRealMdrid1.png"),
    accentColor: "#FF5252",
    overlayColor: "rgba(255, 204, 170, 0.9)",
  },
  {
    tag: "OFERTAS ESPECIAIS",
    title: "Material escolar completo",
    description:
      "Lápis de cor, canetas, mochilas, estojos e kits criativos com preços que cabem no seu bolso.\nPerfeito para montar o enxoval escolar sem dor de cabeça.",
    image: require("./assets/lapisacrilex1.png"),
    accentColor: "#FF9800",
    overlayColor: "rgba(255, 220, 180, 0.9)",
  },
  {
    tag: "ORGANIZE SEU ESCRITÓRIO",
    title: "Materiais de escritórios",
    description:
      "Etiquetadores, pastas, blocos, clips, canetas e acessórios para deixar seu dia a dia mais prático.\nMais produtividade, praticidade e organização para o seu negócio.",
    image: require("./assets/furadera2.png"),
    accentColor: "#7B1FA2",
    overlayColor: "rgba(240, 210, 245, 0.9)",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const fade = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();

  const isWide = width >= 900;
  const isTablet = width >= 600 && width < 900;
  const isMobile = width < 600;

  const bannerHeight =
    width >= 1400 ? 420 : width >= 1100 ? 380 : width >= 768 ? 340 : 320;

  useEffect(() => {
    const fadeIn = () =>
      Animated.timing(fade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

    const fadeOut = (onEnd) =>
      Animated.timing(fade, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(onEnd);

    fadeIn();
    const interval = setInterval(() => {
      fadeOut(() => {
        setIndex((prev) => (prev + 1) % SLIDES.length);
        fadeIn();
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [fade]);

  const slide = SLIDES[index];

  return (
    <View style={styles.heroSection}>
      <Animated.View
        style={[
          styles.banner,
          {
            height: bannerHeight,
            backgroundColor: slide.overlayColor,
            opacity: fade,
            flexDirection: isWide ? "row" : "column-reverse", // no mobile texto fica em cima
          },
        ]}
      >
        {/* BLOCO DE TEXTO */}
        <View
          style={[
            styles.textBlock,
            {
              paddingHorizontal: isWide ? 80 : isTablet ? 40 : 16,
              paddingVertical: isMobile ? 18 : 28,
            },
            isMobile && { alignItems: "center" },
          ]}
        >
          <View
            style={[
              styles.textCard,
              isMobile && {
                maxWidth: "100%",
                paddingHorizontal: 18,
                paddingVertical: 16,
              },
            ]}
          >
            {slide.tag ? (
              <View
                style={[
                  styles.tagPill,
                  { backgroundColor: slide.accentColor },
                  isMobile && { alignSelf: "center" },
                ]}
              >
                <Text style={styles.tagText}>{slide.tag}</Text>
              </View>
            ) : null}

            <Text
              style={[
                styles.title,
                isTablet && { fontSize: 28 },
                isMobile && {
                  fontSize: 22,
                  textAlign: "center",
                  marginBottom: 8,
                },
              ]}
            >
              {slide.title}
            </Text>

            <Text
              style={[
                styles.subtitle,
                isTablet && { fontSize: 15 },
                isMobile && { fontSize: 14, lineHeight: 20, textAlign: "center" },
              ]}
            >
              {slide.description}
            </Text>
          </View>
        </View>

        {/* BLOCO DA IMAGEM */}
        <View
          style={[
            styles.imageBlock,
            isMobile && {
              paddingHorizontal: 0,
              paddingBottom: 10,
              height: bannerHeight * 0.55,
            },
          ]}
        >
          <View
            style={[
              styles.imageCircle,
              isMobile && { width: "70%", height: "70%" },
            ]}
          />
          <Image
            source={slide.image}
            resizeMode="contain"
            style={[
              styles.productImage,
              isTablet && { width: "75%", height: "75%" },
              isMobile && { width: "60%", height: "60%" },
            ]}
          />
        </View>
      </Animated.View>

      {/* DOTS */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === index && {
                backgroundColor: slide.accentColor,
                borderColor: slide.accentColor,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    width: "100%",
    backgroundColor: "#fffde1",
    paddingTop: 40,
    paddingBottom: 32,
  },

  banner: {
    width: "100%",
    borderRadius: 0,
    overflow: "hidden",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textBlock: {
    flex: 1.4,
    justifyContent: "center",
  },

  textCard: {
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 20,
    maxWidth: 620,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },

  imageBlock: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingHorizontal: 40,
  },

  imageCircle: {
    position: "absolute",
    width: "78%",
    height: "78%",
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.55)",
  },

  productImage: {
    width: "80%",
    height: "80%",
  },

  tagPill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 12,
    alignSelf: "flex-start",
  },

  tagText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
  },

  title: {
    color: "#e63946",
    fontSize: 32,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 10,
  },

  subtitle: {
    color: "#444",
    fontSize: 16,
      lineHeight: 24,
    },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    marginHorizontal: 4,
    backgroundColor: "transparent",
  },
});
