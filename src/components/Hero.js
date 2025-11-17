// src/components/Hero.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';

const CAROUSEL_SLIDES = [
  {
    title: 'Bem-vindo à CaiCai Papelaria',
    text: 'Tudo o que você precisa para escritório, escola e artesanato em um só lugar.',
    image:
      'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Material escolar completo',
    text: 'Cadernos, mochilas, estojos, lápis e muito mais para a volta às aulas.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Papelaria criativa',
    text: 'Planners, adesivos, canetas coloridas e itens para deixar sua rotina mais leve.',
    image:
      'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1600&q=80',
  },
];

const RED = '#e63946';
const WHITE = '#ffffff';

export default function Hero() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const id = setInterval(
      () => setCarouselIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  const currentSlide = CAROUSEL_SLIDES[carouselIndex];

  const isMobile = width < 768;
  // altura do banner: ocupa boa parte da tela, mas com limite
  const bannerHeight = Math.max(
    320,
    Math.min(height * (isMobile ? 0.6 : 0.8), 560)
  );

  return (
    <View style={[styles.hero, { minHeight: height * 0.9 }]}>
      <View style={styles.heroCarousel}>
        <View style={styles.slideWrapper}>
          <ImageBackground
            source={{ uri: currentSlide.image }}
            style={[styles.slideImage, { height: bannerHeight }]}
            imageStyle={styles.slideImageInner}
          >
            <View
              style={[
                styles.slideOverlay,
                isMobile && styles.slideOverlayMobile,
              ]}
            >
              <Text style={styles.carouselTitle}>{currentSlide.title}</Text>
              <Text style={styles.carouselText}>{currentSlide.text}</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.carouselDots}>
          {CAROUSEL_SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === carouselIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#fffdf0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroCarousel: {
    width: '100%',
    alignItems: 'center',
  },
  slideWrapper: {
    width: '100%',
    maxWidth: 1200,
    borderRadius: 22,
    overflow: 'hidden',
  },
  slideImage: {
    justifyContent: 'center',
  },
  slideImageInner: {
    borderRadius: 22,
  },
  slideOverlay: {
    marginHorizontal: '18%',
    paddingVertical: 28,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 18,
    alignItems: 'center',
  },
  slideOverlayMobile: {
    marginHorizontal: '8%',
  },
  carouselTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: WHITE,
    textAlign: 'center',
    marginBottom: 10,
  },
  carouselText: {
    fontSize: 15,
    color: WHITE,
    textAlign: 'center',
  },
  carouselDots: {
    flexDirection: 'row',
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#e3d7a7',
    marginRight: 6,
  },
  dotActive: {
    backgroundColor: RED,
    width: 18,
  },
});
