// App.js
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
  Linking,   // <— IMPORTANTE
} from 'react-native';

import Header from './src/components/Header';
import Hero from './src/components/Hero';
import SectionAbout from './src/components/SectionAbout';
import SectionProducts from './src/components/SectionProducts';
import SectionContact from './src/components/SectionContact';
import Footer from './src/components/Footer';
import ProductCatalog from './src/components/ProductCatalog';
import CartPage from './src/components/CartPage';

const WHATSAPP_NUMBER = '5521989036236'; // número que você passou

export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'catalog' | 'cart'
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function addToCart(product) {
    setCartItems((current) => {
      const existing = current.find(
        (item) => item.product.id === product.id
      );
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { product, quantity: 1 }];
    });
    setIsCartOpen(true); // abre o dropdown pra mostrar
  }

  function updateQuantity(productId, delta) {
    setCartItems((current) => {
      const updated = current
        .map((item) => {
          if (item.product.id !== productId) return item;
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null; // remove se chegar em 0
          return { ...item, quantity: newQty };
        })
        .filter(Boolean);
      return updated;
    });
  }

  function removeFromCart(productId) {
    setCartItems((current) =>
      current.filter((item) => item.product.id !== productId)
    );
  }

  function handleToggleCartDropdown() {
    setIsCartOpen((prev) => !prev);
  }

  function goToHome() {
    setView('home');
    setIsCartOpen(false);
  }

  function goToCatalog() {
    setView('catalog');
    setIsCartOpen(false);
  }

  function goToCart() {
    setView('cart');
    setIsCartOpen(false);
  }

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  function handleCheckout() {
    if (!cartItems.length) {
      Alert.alert(
        'Carrinho vazio',
        'Adicione algum produto antes de finalizar.'
      );
      return;
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const itensTexto = cartItems
      .map(
        (item) =>
          `${item.quantity}x ${item.product.name} — R$ ${item.product.price
            .toFixed(2)
            .replace('.', ',')}`
      )
      .join('\n');

    const mensagem =
      `Olá! Gostaria de finalizar uma compra na CaiCai Papelaria.\n\n` +
      `Itens selecionados:\n` +
      `${itensTexto}\n\n` +
      `Total: R$ ${total.toFixed(2).replace('.', ',')}\n\n` +
      `Por favor, me informe as opções de entrega e pagamento.`;

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(mensagem)}`;

    Linking.openURL(url).catch(() => {
      Alert.alert(
        'Não foi possível abrir o WhatsApp',
        'Verifique se o aplicativo está instalado ou tente novamente.'
      );
    });
  }

  let content;
  if (view === 'catalog') {
    content = (
      <ProductCatalog
        onBack={goToHome}
        onAddToCart={addToCart}
      />
    );
  } else if (view === 'cart') {
    content = (
      <CartPage
        cartItems={cartItems}
        onBack={goToHome}
        onIncrement={(id) => updateQuantity(id, +1)}
        onDecrement={(id) => updateQuantity(id, -1)}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
    );
  } else {
    content = (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Hero />
        <SectionAbout />
        <SectionProducts
          onSeeMore={goToCatalog}
          onAddToCart={addToCart}
        />
        <SectionContact />
        <Footer />
      </ScrollView>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <Header
        cartItems={cartItems}
        totalItems={totalItems}
        isCartOpen={isCartOpen}
        onToggleCart={handleToggleCartDropdown}
        onGoToCart={goToCart}
        onNavHome={goToHome}
        onNavProducts={goToCatalog}
      />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fffdf0',
  },
  scrollContent: {
    paddingBottom: 40,
  },
});
