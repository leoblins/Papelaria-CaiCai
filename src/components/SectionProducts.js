// src/components/SectionProducts.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import PRODUCTS from './Products';   // <— aqui é o ajuste



const RED = '#e63946';
const PURPLE = '#7c3aed';
const BLACK = '#111111';
const BG = '#fff3bf';

export default function SectionProducts({ onSeeMore, onAddToCart }) {
  // pega só alguns produtos para o carrossel
  const featuredProducts = PRODUCTS.slice(0, 5);

  function handleAdd(product) {
    if (onAddToCart) {
      onAddToCart(product);
    }
  }

  return (
    <View style={styles.section}>
      <View style={styles.inner}>
        <Text style={styles.sectionTitle}>Nossos produtos</Text>
        <Text style={styles.sectionSubtitle}>
          Alguns dos itens que você encontra na nossa papelaria.
        </Text>

        {/* CARROSSEL HORIZONTAL */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContent}
        >
          {featuredProducts.map((product) => (
            <View key={product.id} style={styles.card}>
              <Image source={{ uri: product.image }} style={styles.cardImage} />

              <View style={styles.cardBody}>
                <Text style={styles.cardCategory}>{product.category}</Text>
                <Text style={styles.cardName}>{product.name}</Text>
                <Text style={styles.cardPrice}>
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </Text>

                <View style={styles.cardButtonsRow}>
                  <Pressable
                    style={styles.btnPrimary}
                    onPress={() => handleAdd(product)}
                  >
                    <Text style={styles.btnPrimaryText}>Adicionar ao carrinho</Text>
                  </Pressable>

                  <Pressable
                    style={styles.btnOutline}
                    onPress={onSeeMore}
                  >
                    <Text style={styles.btnOutlineText}>Ver mais</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* BOTÃO VER TODOS */}
        <View style={styles.seeAllWrapper}>
          <Pressable style={styles.btnSeeAll} onPress={onSeeMore}>
            <Text style={styles.btnSeeAllText}>Ver todos os produtos</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: BG,
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: 1100,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: RED,
    textAlign: 'center',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: PURPLE,
    textAlign: 'center',
    marginBottom: 24,
  },
  carouselContent: {
    paddingVertical: 4,
  },

  card: {
    width: 260,
    marginRight: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 140,
  },
  cardBody: {
    padding: 12,
  },
  cardCategory: {
    fontSize: 11,
    color: PURPLE,
    marginBottom: 4,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '600',
    color: BLACK,
    marginBottom: 6,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: RED,
    marginBottom: 10,
  },
  cardButtonsRow: {
    flexDirection: 'column',
    gap: 6,
  },
  btnPrimary: {
    backgroundColor: RED,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 4,
  },
  btnPrimaryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  btnOutline: {
    borderColor: RED,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignItems: 'center',
  },
  btnOutlineText: {
    color: RED,
    fontSize: 12,
    fontWeight: '600',
  },

  seeAllWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  btnSeeAll: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: RED,
    paddingHorizontal: 22,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  btnSeeAllText: {
    color: RED,
    fontWeight: '600',
    fontSize: 14,
  },
});
