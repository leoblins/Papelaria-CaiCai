// src/components/ProductCatalog.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import PRODUCTS from './Products';   // <— em vez de ../constants/products


const RED = '#e63946';
const PURPLE = '#7c3aed';
const BLACK = '#111111';

export default function ProductCatalog({ onBack, onAddToCart }) {
  function handleAdd(product) {
    if (onAddToCart) {
      onAddToCart(product);
    }
  }

  return (
    <View style={styles.section}>
      <View style={styles.inner}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Catálogo completo</Text>

          {onBack && (
            <Pressable style={styles.backButton} onPress={onBack}>
              <Text style={styles.backButtonText}>Voltar para a página inicial</Text>
            </Pressable>
          )}
        </View>

        <Text style={styles.subtitle}>
          Veja todos os produtos disponíveis na CaiCai Papelaria.
        </Text>

        <ScrollView
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        >
          {PRODUCTS.map((product) => (
            <View key={product.id} style={styles.card}>
              <Image source={{ uri: product.image }} style={styles.cardImage} />

              <View style={styles.cardBody}>
                <Text style={styles.cardCategory}>{product.category}</Text>
                <Text style={styles.cardName}>{product.name}</Text>
                <Text style={styles.cardPrice}>
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </Text>

                <Pressable
                  style={styles.btnPrimary}
                  onPress={() => handleAdd(product)}
                >
                  <Text style={styles.btnPrimaryText}>Adicionar ao carrinho</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff3bf',
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: 1100,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: RED,
  },
  backButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: RED,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 8,
  },
  backButtonText: {
    color: RED,
    fontSize: 12,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    color: PURPLE,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingBottom: 40,
  },
  card: {
    width: '100%',
    maxWidth: 260,
    backgroundColor: '#ffffff',
    borderRadius: 18,
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
  btnPrimary: {
    backgroundColor: RED,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
