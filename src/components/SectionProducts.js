// src/components/SectionProducts.js
import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  useWindowDimensions,
} from 'react-native';

const BG = '#fffde1';
const CARD_BG = '#ffffff';
const RED = '#e63946';
const PURPLE = '#7c3aed';
const SHADOW = 'rgba(0,0,0,0.12)';

// 🔥 AGORA USANDO require() EM VEZ DE URL
const HIGHLIGHT_PRODUCTS = [
  {
    id: 'real-madrid-caderno',
    name: 'Caderno smart dac Real Madrid',
    price: 76.9,
    image: require('./assets/cadernoDivertidamente.png'),
  },
  {
    id: 'aplicador-tag-yins',
    name: 'Aplicador tag yins paper',
    price: 28.9,
    image: require('./assets/cadernoDivertidamente.png'),
  },
  {
    id: 'lapis-acrilix-24',
    name: 'Lápis acrilex 24 cores',
    price: 16.9,
    image: require('./assets/cadernoDivertidamente.png'),
  },
];

export default function SectionProducts({ onSeeMore, onAddToCart }) {
  const { width, height } = useWindowDimensions();
  const { styles } = useMemo(() => createStyles(width, height), [width, height]);

  return (
    <View style={styles.section}>
      <View style={styles.inner}>
        {/* TÍTULO */}
        <Text style={styles.title}>Nossos Produtos</Text>

        {/* SUBTÍTULO */}
        <Text style={styles.subtitle}>
          Confira alguns dos itens mais procurados da nossa loja.
        </Text>

        {/* GRID DE PRODUTOS */}
        <View style={styles.grid}>
          {HIGHLIGHT_PRODUCTS.map((product) => (
            <Pressable
              key={product.id}
              onPress={onSeeMore}
              style={({ hovered, pressed }) => [
                styles.card,
                (hovered || pressed) && styles.cardHover,
              ]}
            >
              <View style={styles.imageWrapper}>
                <Image
                  source={product.image}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </Text>

                <Pressable
                  onPress={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  style={({ hovered, pressed }) => [
                    styles.buyButton,
                    (hovered || pressed) && styles.buyButtonHover,
                  ]}
                >
                  <Text style={styles.buyButtonText}>
                    Adicionar ao carrinho
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>

        {/* BOTÃO VER MAIS */}
        <Pressable
          onPress={onSeeMore}
          style={({ hovered, pressed }) => [
            styles.moreButton,
            (hovered || pressed) && styles.moreButtonHover,
          ]}
        >
          <Text style={styles.moreButtonText}>Ver Mais</Text>
        </Pressable>
      </View>
    </View>
  );
}

function createStyles(width, height) {
  const isSmall = width < 700;
  const isMedium = width >= 700 && width < 1100;

  let cardSize = '32%';
  if (isMedium) cardSize = '48%';
  if (isSmall) cardSize = '100%';

  const webTransition = {
    // essas propriedades só fazem efeito no web
    transitionDuration: '150ms',
    transitionProperty: 'transform',
    transitionTimingFunction: 'ease-out',
  };

  const styles = StyleSheet.create({
    section: {
      width: '100%',
      backgroundColor: BG,
      paddingHorizontal: 16,
      paddingVertical: 40,
      alignItems: 'center',
      minHeight: height * 0.9,
    },
    inner: {
      width: '100%',
      maxWidth: 1280,
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: RED,
      textAlign: 'center',
      marginBottom: 6,
    },
    subtitle: {
      fontSize: 16,
      color: PURPLE,
      textAlign: 'center',
      marginBottom: 60,
    },
    grid: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 24,
    },
    card: {
      flexBasis: cardSize,
      backgroundColor: CARD_BG,
      borderRadius: 20,
      padding: 18,
      shadowColor: SHADOW,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevation: 4,
      transform: [{ scale: 1 }],
      ...webTransition,
    },
    cardHover: {
      transform: [{ scale: 1.03 }],
    },
    imageWrapper: {
      width: '100%',
      height: 300,
      marginBottom: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 12,
    },
    cardContent: {
      gap: 8,
    },
    productName: {
      fontSize: 16,
      fontWeight: '600',
      color: PURPLE,
    },
    productPrice: {
      fontSize: 15,
      fontWeight: '700',
      color: RED,
      marginBottom: 8,
    },
    buyButton: {
      alignSelf: 'flex-start',
      backgroundColor: RED,
      borderRadius: 999,
      paddingVertical: 8,
      paddingHorizontal: 14,
      ...webTransition,
    },
    buyButtonHover: {
      backgroundColor: '#c72b33', 
    },

    buyButtonText: {
      color: '#fff',
      fontSize: 13,
      fontWeight: '600',
    },
    moreButton: {
      marginTop: 50,
      backgroundColor: RED,
      borderRadius: 999,
      paddingVertical: 10,
      paddingHorizontal: 32,
      transform: [{ scale: 1 }],
      ...webTransition,
    },
    moreButtonHover: {
      transform: [{ scale: 1.05 }],
    },
    moreButtonText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 15,
    },
  });

  return { styles };
}
