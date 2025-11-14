import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
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
const PURPLE = '#7c3aed';
const BLACK = '#111111';
const WHITE = '#ffffff';

export default function Hero() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCarouselIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  const currentSlide = CAROUSEL_SLIDES[carouselIndex];

  return (
    <View style={styles.hero}>
      {/* TEXTO FIXO DA CHAMADA */}
      <View style={styles.heroTextBox}>
        <Text style={styles.heroTitle}>
          Papelaria completa, criativa e pertinho de você.
        </Text>
        <Text style={styles.heroSubtitle}>
          Cadernos, canetas, planners, materiais de arte e tudo que você precisa
          para organizar sua rotina com cor e personalidade.
        </Text>

        <View style={styles.heroButtons}>
          <Pressable style={styles.btnPrimary}>
            <Text style={styles.btnPrimaryText}>Ver produtos</Text>
          </Pressable>
          <Pressable style={styles.btnOutline}>
            <Text style={styles.btnOutlineText}>Fazer orçamento</Text>
          </Pressable>
        </View>
      </View>

      {/* CARROSSEL EMBAIXO, MAIS ALTO E CENTRALIZADO */}
      <View style={styles.heroCarousel}>
        <View style={styles.slideWrapper}>
          <ImageBackground
            source={{ uri: currentSlide.image }}
            style={styles.slideImage}
            imageStyle={styles.slideImageInner}
          >
            {/* overlay translúcido ocupando o centro */}
            <View style={styles.slideOverlay}>
              <Text style={styles.carouselTitle}>{currentSlide.title}</Text>
              <Text style={styles.carouselText}>{currentSlide.text}</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.carouselDots}>
          {CAROUSEL_SLIDES.map((_, index) => (
            <Pressable
              key={index}
              onPress={() => setCarouselIndex(index)}
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
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: 'column',
  },

  /* TEXTO SUPERIOR */
  heroTextBox: {
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 26,
    color: RED,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: PURPLE,
    marginBottom: 14,
  },
  heroButtons: {
    flexDirection: 'row',
  },
  btnPrimary: {
    backgroundColor: RED,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    marginRight: 8,
    shadowColor: BLACK,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  btnPrimaryText: {
    color: WHITE,
    fontWeight: '600',
    fontSize: 14,
  },
  btnOutline: {
    borderColor: RED,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  btnOutlineText: {
    color: RED,
    fontWeight: '600',
    fontSize: 14,
  },

  /* CARROSSEL */
  heroCarousel: {
    marginTop: 8,
    alignItems: 'center',
  },
  slideWrapper: {
    width: '100%',
    maxWidth: 1100,     // deixa menos horizontal em telas grandes
    borderRadius: 22,
    overflow: 'hidden',
  },
  slideImage: {
    height: 360,         // AQUI aumenta ou diminui a altura do banner
    justifyContent: 'center',
  },
  slideImageInner: {
    borderRadius: 22,
  },
 slideOverlay: {
  marginHorizontal: '10%',
  paddingVertical: 24,
  paddingHorizontal: 16,
  backgroundColor: 'rgba(0, 0, 0, 0.45)', // preto translúcido
  borderRadius: 18,
  alignItems: 'center',
},

  carouselTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: WHITE,
    textAlign: 'center',
    marginBottom: 8,
  },
  carouselText: {
    fontSize: 14,
    color: WHITE,
    textAlign: 'center',
  },
  carouselDots: {
    flexDirection: 'row',
    marginTop: 10,
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
