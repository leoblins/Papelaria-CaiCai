import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
  useWindowDimensions,
} from "react-native";

const SLIDES = [
  {
    tag: "VOLTA ÀS AULAS",
    title: "Bem-vindo à Cai Cai Papelaria",
    description:
      "Cadernos, agendas, planners e muito mais para organizar sua rotina.\nEncontre tudo em um só lugar com atendimento de confiança.",
    image: require("./assets/cadernoRealMadrid.png"),
    accentColor: "#FF5252",
    overlayColor: "rgba(255, 82, 82, 0.22)",
  },
  {
    tag: "OFERTAS ESPECIAIS",
    title: "Material escolar completo",
    description:
      "Lápis de cor, canetas, mochilas, estojos e kits criativos com preços que cabem no seu bolso.\nPerfeito para montar o enxoval escolar sem dor de cabeça.",
    image: require("./assets/lapisacrilex1.png"),
    accentColor: "#FF9800",
    overlayColor: "rgba(255, 152, 0, 0.23)",
  },
  {
    tag: "ORGANIZE SEU ESCRITÓRIO",
    title: "Materiais de escritórios",
    description:
      "Etiquetadores, pastas, blocos, clips, canetas e acessórios para deixar seu dia a dia mais prático.\nMais produtividade, praticidade e organização para o seu negócio.",
    image: require("./assets/furadera2.png"),
    accentColor: "#7B1FA2",
    overlayColor: "rgba(123, 31, 162, 0.23)",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const fade = useRef(new Animated.Value(0)).current;

  const { width } = useWindowDimensions();

  // altura do banner responsiva
  const bannerHeight =
    width >= 1200 ? 420 : width >= 900 ? 380 : width >= 600 ? 340 : 300;

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
  }, [fade, index]);

  const slide = SLIDES[index];

  return (
    <View style={styles.hero}>
      <Animated.View style={[styles.carouselBox, { opacity: fade }]}>
        <ImageBackground
          source={slide.image}
          resizeMode="contain"
          style={[
            styles.banner,
            {
              height: bannerHeight,
              paddingTop: bannerHeight * 0.18, 
            },
          ]}
          imageStyle={styles.bannerImage}
        >
          <View
            style={[
              styles.overlay,
              { backgroundColor: slide.overlayColor || "transparent" },
            ]}
          />

          <View style={styles.content}>
            {slide.tag && (
              <View
                style={[
                  styles.tagPill,
                  { backgroundColor: slide.accentColor },
                ]}
              >
                <Text style={styles.tagText}>{slide.tag}</Text>
              </View>
            )}

            <Text style={styles.title}>{slide.title.toUpperCase()}</Text>
            <Text style={styles.subtitle}>{slide.description}</Text>
          </View>
        </ImageBackground>

        {/* dots */}
        <View className="dots" style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === index && styles.dotActive,
                i === index && {
                  backgroundColor: slide.accentColor,
                  borderColor: slide.accentColor,
                },
              ]}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fffde1",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
  },

  carouselBox: {
    width: "92%",
    maxWidth: 1280,
    alignItems: "center",
  },

  banner: {
    width: "100%",
    justifyContent: "flex-start", 
    borderRadius: 26,
    overflow: "hidden",
  },

  bannerImage: {
    opacity: 0.38,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  content: {
    paddingHorizontal: 32,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  tagPill: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 10,
  },

  tagText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
  },

  title: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 12,
    letterSpacing: 1.2,
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },

  subtitle: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 30,
    maxWidth: 560,
  },

  dots: {
    flexDirection: "row",
    marginTop: 18,
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

  dotActive: {
    // cor vem dinamicamente
  },
});
