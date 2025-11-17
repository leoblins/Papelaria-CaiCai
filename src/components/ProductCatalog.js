// src/components/ProductCatalog.js
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import PRODUCTS from './Products';
import Footer from './Footer';

const RED = '#e63946';
const PURPLE = '#7c3aed';
const BLACK = '#111111';
const BG = '#fff3bf';
const CARD_BG = '#ffffff';
const SHADOW = 'rgba(0,0,0,0.12)';

export default function ProductCatalog({ onAddToCart }) {
  const { width, height } = useWindowDimensions();
  const { styles } = useMemo(() => createStyles(width, height), [width, height]);

  // estado da busca
  const [searchInput, setSearchInput] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showClear, setShowClear] = useState(false);

  // estado da ordenação de preço
  const [priceOrder, setPriceOrder] = useState(null); // "asc" | "desc" | null

  // remove acentos e padroniza
  function normalize(str) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  // aplica a busca (Enter ou clique na lupa)
  function applySearch() {
    setSearchValue(searchInput);
    if (searchInput.trim() !== '') {
      setShowClear(true);
    } else {
      setShowClear(false);
    }
  }

  // limpa a busca
  function clearSearch() {
    setSearchInput('');
    setSearchValue('');
    setShowClear(false);
  }

  // alterna ordenação de preço
  function togglePriceOrder() {
    if (priceOrder === 'asc') setPriceOrder('desc');
    else if (priceOrder === 'desc') setPriceOrder(null);
    else setPriceOrder('asc');
  }

  // retorna a lista filtrada + ordenada
  function getFilteredProducts() {
    let list = PRODUCTS;

    if (searchValue.trim() !== '') {
      const text = normalize(searchValue);
      list = list.filter((product) => {
        const name = normalize(product.name);
        const cat = normalize(product.category);
        return name.includes(text) || cat.includes(text);
      });
    }

    if (priceOrder === 'asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (priceOrder === 'desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }

  const filtered = getFilteredProducts();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <View style={styles.inner}>
          {/* TÍTULO */}
          <Text style={styles.title}>Catálogo Completo</Text>

          {/* SUBTÍTULO */}
          <Text style={styles.subtitle}>
            Navegue por todos os produtos disponíveis na CaiCai Papelaria
          </Text>

          {/* 🔎 BUSCA */}
          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar produto por nome ou categoria..."
              placeholderTextColor="#a97be8"
              value={searchInput}
              onChangeText={setSearchInput}
              onSubmitEditing={applySearch}
            />

            <Pressable
              onPress={applySearch}
              style={({ hovered, pressed }) => [
                styles.searchButton,
                (hovered || pressed) && styles.searchButtonHover,
              ]}
            >
              <Text style={styles.searchButtonText}>🔍</Text>
            </Pressable>

            {showClear && (
              <Pressable
                onPress={clearSearch}
                style={({ hovered, pressed }) => [
                  styles.clearButton,
                  (hovered || pressed) && styles.clearButtonHover,
                ]}
              >
                <Text style={styles.clearButtonText}>Limpar</Text>
              </Pressable>
            )}
          </View>

          {/* ↕ ORDENAR POR PREÇO */}
          <Pressable
            onPress={togglePriceOrder}
            style={({ hovered, pressed }) => [
              styles.sortButton,
              (hovered || pressed) && styles.sortButtonHover,
            ]}
          >
            <Text style={styles.sortButtonText}>
              {priceOrder === 'asc' && 'Preço ↑ (menor primeiro)'}
              {priceOrder === 'desc' && 'Preço ↓ (maior primeiro)'}
              {priceOrder === null && 'Ordenar por preço'}
            </Text>
          </Pressable>

          {/* GRID DE PRODUTOS */}
          <View style={styles.grid}>
            {filtered.map((product) => (
              <Pressable
                key={product.id}
                style={({ hovered, pressed }) => [
                  styles.card,
                  (hovered || pressed) && styles.cardHover,
                ]}
              >
                <Image
                  source={{ uri: product.image }}
                  style={styles.cardImage}
                />

                <View style={styles.cardBody}>
                  <Text style={styles.cardCategory}>{product.category}</Text>

                  <Text style={styles.cardName}>{product.name}</Text>

                  <Text style={styles.cardPrice}>
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </Text>

                  <Pressable
                    style={({ hovered, pressed }) => [
                      styles.btnPrimary,
                      (hovered || pressed) && styles.btnPrimaryHover,
                    ]}
                    onPress={() => onAddToCart(product)}
                  >
                    <Text style={styles.btnPrimaryText}>
                      Adicionar ao carrinho
                    </Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}

            {filtered.length === 0 && (
              <Text style={styles.noResults}>
                Nenhum produto encontrado 😕
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* FOOTER */}
      <Footer />
    </ScrollView>
  );
}

/* ------------ ESTILOS ------------ */

function createStyles(width, height) {
  const isSmall = width < 700;
  const isMedium = width >= 700 && width < 1100;

  let cardBasis = '30%';
  if (isMedium) cardBasis = '45%';
  if (isSmall) cardBasis = '100%';

  const transition = {
    transitionDuration: '150ms',
    transitionProperty: 'transform, background-color',
  };

  const styles = StyleSheet.create({
    scroll: {
      flex: 1,
      backgroundColor: BG,
    },
    scrollContent: {
      alignItems: 'center',
    },

    section: {
      width: '100%',
      alignItems: 'center',
      paddingTop: 40,
      paddingBottom: 60,
      backgroundColor: BG,
    },
    inner: {
      width: '100%',
      maxWidth: 1280,
      alignItems: 'center',
    },

    /* TEXTOS */
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
      marginBottom: 24,
    },

    /* 🔎 BUSCA */
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      maxWidth: 520,
      marginBottom: 20,
      gap: 10,
      flexWrap: 'wrap',
    },
    searchInput: {
      flex: 1,
      minWidth: 220,
      backgroundColor: '#fff',
      borderRadius: 999,
      borderWidth: 2,
      borderColor: RED,
      paddingVertical: 10,
      paddingHorizontal: 18,
      fontSize: 14,
      color: BLACK,
    },
    searchButton: {
      backgroundColor: RED,
      borderRadius: 999,
      paddingVertical: 10,
      paddingHorizontal: 16,
      ...transition,
    },
    searchButtonHover: {
      backgroundColor: '#c72b33',
    },
    searchButtonText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 16,
    },
    clearButton: {
      backgroundColor: '#999',
      borderRadius: 999,
      paddingVertical: 10,
      paddingHorizontal: 18,
      ...transition,
    },
    clearButtonHover: {
      backgroundColor: '#777',
    },
    clearButtonText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 13,
    },

    /* ↕ ORDENAR PREÇO */
    sortButton: {
      backgroundColor: RED,
      borderRadius: 999,
      paddingVertical: 8,
      paddingHorizontal: 20,
      marginBottom: 32,
      ...transition,
    },
    sortButtonHover: {
      backgroundColor: '#c72b33',
    },
    sortButtonText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 14,
      textAlign: 'center',
    },

    /* GRID */
    grid: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 24,
    },

    /* CARD */
    card: {
      flexBasis: cardBasis,
      maxWidth: 360,
      backgroundColor: CARD_BG,
      borderRadius: 20,
      padding: 16,
      shadowColor: SHADOW,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
      transform: [{ scale: 1 }],
      ...transition,
    },
    cardHover: {
      transform: [{ scale: 1.04 }],
    },

    cardImage: {
      width: '100%',
      height: 260,
      borderRadius: 14,
      marginBottom: 12,
    },

    cardBody: {
      gap: 6,
    },

    cardCategory: {
      fontSize: 13,
      color: PURPLE,
    },
    cardName: {
      fontSize: 15,
      fontWeight: '600',
      color: BLACK,
    },
    cardPrice: {
      fontSize: 15,
      fontWeight: 'bold',
      color: RED,
      marginTop: 4,
      marginBottom: 10,
    },

    /* BOTÃO */
    btnPrimary: {
      backgroundColor: RED,
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 999,
      alignSelf: 'flex-start',
      ...transition,
    },
    btnPrimaryHover: {
      backgroundColor: '#c72b33',
    },
    btnPrimaryText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 13,
    },

    /* QUANDO NÃO ENCONTRA */
    noResults: {
      marginTop: 40,
      fontSize: 16,
      fontWeight: '600',
      color: BLACK,
      textAlign: 'center',
    },
  });

  return { styles };
}
