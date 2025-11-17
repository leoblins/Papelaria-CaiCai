// src/components/ProductCatalog.js
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  useWindowDimensions,
} from "react-native";
import PRODUCTS from "./Products";
import Footer from "./Footer";

const RED = "#e63946";
const PURPLE = "#7c3aed";
const BLACK = "#111111";
const BG = "#fff3bf";
const CARD_BG = "#ffffff";

export default function ProductCatalog({ onAddToCart }) {
  const { width, height } = useWindowDimensions();
  const { styles } = useMemo(() => createStyles(width, height), [width]);

  const [search, setSearch] = useState("");
  const [searchApplied, setSearchApplied] = useState(false);
  const [sortPrice, setSortPrice] = useState(""); // '' | 'asc' | 'desc'

  function normalize(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function applyFilters() {
    let list = [...PRODUCTS];

    // 🔍 APLICA BUSCA
    if (searchApplied && search.trim() !== "") {
      const term = normalize(search);
      list = list.filter(
        (p) =>
          normalize(p.name).includes(term) ||
          normalize(p.category).includes(term)
      );
    }

    // 💰 APLICA ORDENAR PREÇO
    if (sortPrice === "asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortPrice === "desc") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }

  const filtered = applyFilters();

  function handleSearch() {
    setSearchApplied(true);
  }

  function clearFilters() {
    setSearch("");
    setSearchApplied(false);
    setSortPrice("");
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <View style={styles.section}>
        <View style={styles.inner}>

          {/* TÍTULO */}
          <Text style={styles.title}>Catálogo Completo</Text>

          {/* SUBTÍTULO */}
          <Text style={styles.subtitle}>
            Navegue por todos os produtos disponíveis na CaiCai Papelaria
          </Text>

          {/* 🔍 BARRA DE PESQUISA + FILTRO DE PREÇO */}
          <View style={styles.searchRow}>
            {/* Campo de texto */}
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar produto..."
              placeholderTextColor="#777"
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={handleSearch}
            />

            {/* Botão Buscar */}
            <Pressable style={styles.searchBtn} onPress={handleSearch}>
              <Text style={styles.searchBtnText}>🔎</Text>
            </Pressable>

            {/* Select (WEB ONLY) */}
            <select
              value={sortPrice}
              onChange={(e) => setSortPrice(e.target.value)}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: `2px solid ${RED}`,
                fontWeight: "700",
                color: RED,
                backgroundColor: "#fff",
                cursor: "pointer",
              }}
            >
              <option value="">Ordenar preço</option>
              <option value="asc">Menor preço</option>
              <option value="desc">Maior preço</option>
            </select>

            {/* Botão Limpar */}
            {searchApplied || sortPrice ? (
              <Pressable style={styles.clearBtn} onPress={clearFilters}>
                <Text style={styles.clearBtnText}>Limpar</Text>
              </Pressable>
            ) : null}
          </View>

          {/* GRID DE PRODUTOS */}
          <View style={styles.grid}>
            {filtered.map((product) => (
              <Pressable
                key={product.id}
                style={({ hovered }) => [
                  styles.card,
                  hovered && styles.cardHover,
                ]}
              >
                <Image source={{ uri: product.image }} style={styles.cardImage} />

                <View style={styles.cardBody}>
                  <Text style={styles.cardCategory}>{product.category}</Text>

                  <Text style={styles.cardName}>{product.name}</Text>

                  <Text style={styles.cardPrice}>
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </Text>

                  <Pressable
                    style={({ hovered }) => [
                      styles.btnPrimary,
                      hovered && styles.btnPrimaryHover,
                    ]}
                    onPress={() => onAddToCart(product)}
                  >
                    <Text style={styles.btnPrimaryText}>Adicionar ao carrinho</Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}

/* ------------------------------------------------------- */
/* ---------------------- ESTILOS ------------------------- */
/* ------------------------------------------------------- */

function createStyles(width, height) {
  const isSmall = width < 700;
  const isMedium = width >= 700 && width < 1100;

  let cardBasis = "30%";
  if (isMedium) cardBasis = "45%";
  if (isSmall) cardBasis = "100%";

  const styles = StyleSheet.create({
    scroll: { flex: 1, backgroundColor: BG },
    scrollContent: { alignItems: "center" },

    section: {
      width: "100%",
      alignItems: "center",
      paddingTop: 40,
      paddingBottom: 60,
      backgroundColor: BG,
    },
    inner: {
      width: "100%",
      maxWidth: 1280,
      alignItems: "center",
    },

    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: RED,
      textAlign: "center",
      marginBottom: 6,
    },
    subtitle: {
      fontSize: 16,
      color: PURPLE,
      textAlign: "center",
      marginBottom: 40,
    },

    /* 🔍 PESQUISA */
    searchRow: {
      width: "100%",
      maxWidth: 900,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 12,
      marginBottom: 40,
    },
    searchInput: {
      flexGrow: 1,
      minWidth: 260,
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderWidth: 2,
      borderColor: RED,
      borderRadius: 10,
      backgroundColor: "#fff",
      fontSize: 14,
      fontWeight: "600",
      color: "#000",
    },
    searchBtn: {
      backgroundColor: RED,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    searchBtnText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "700",
    },

    clearBtn: {
      backgroundColor: "#555",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    clearBtnText: {
      color: "#fff",
      fontWeight: "700",
    },

    /* GRID */
    grid: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 24,
    },

    /* CARD */
    card: {
      flexBasis: cardBasis,
      maxWidth: 360,
      backgroundColor: CARD_BG,
      borderRadius: 20,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 4,
      transform: [{ scale: 1 }],
    },
    cardHover: {
      transform: [{ scale: 1.04 }],
    },
    cardImage: {
      width: "100%",
      height: 260,
      borderRadius: 14,
      marginBottom: 12,
    },
    cardBody: { gap: 6 },

    cardCategory: {
      fontSize: 13,
      color: PURPLE,
    },
    cardName: {
      fontSize: 15,
      fontWeight: "600",
      color: BLACK,
    },
    cardPrice: {
      fontSize: 15,
      fontWeight: "bold",
      color: RED,
      marginTop: 4,
      marginBottom: 10,
    },

    btnPrimary: {
      backgroundColor: RED,
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 999,
      alignSelf: "flex-start",
    },
    btnPrimaryHover: {
      backgroundColor: "#c72b33",
    },
    btnPrimaryText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 13,
    },
  });

  return { styles };
}
