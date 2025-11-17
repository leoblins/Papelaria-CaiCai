// App.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';

import Header from './src/components/Header';
import Hero from './src/components/Hero';
import SectionAbout from './src/components/SectionAbout';
import SectionProducts from './src/components/SectionProducts';
import SectionContact from './src/components/SectionContact';
import Footer from './src/components/Footer';
import ProductCatalog from './src/components/ProductCatalog';
import CartPage from './src/components/CartPage';
import CartSidePanel from './src/components/CartSidePanel';

const WHATSAPP_NUMBER = '5521989036236';

export default function App() {
  const [view, setView] = useState('home'); 
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const scrollRef = useRef(null);
  const sectionPositions = useRef({
    hero: 0,
    about: 0,
    products: 0,
    contact: 0,
  });
  const [pendingSection, setPendingSection] = useState(null);

  const handleSectionLayout = (section) => (event) => {
    const { y } = event.nativeEvent.layout;
    sectionPositions.current[section] = y;
  };

  useEffect(() => {
    if (view === 'home' && pendingSection && scrollRef.current) {
      const y = sectionPositions.current[pendingSection] || 0;
      scrollRef.current.scrollTo({ y, animated: true });
      setPendingSection(null);
    }
  }, [view, pendingSection]);

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
  }

  function updateQuantity(productId, delta) {
    setCartItems((current) => {
      const updated = current
        .map((item) => {
          if (item.product.id !== productId) return item;
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
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

  function goToHomeSection(section = 'hero') {
    setIsCartOpen(false);
    setPendingSection(section);
    setView('home');
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

  function handleCheckout(extraInfo) {
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

    let dadosCliente = '';
    if (extraInfo && (extraInfo.name || extraInfo.address)) {
      dadosCliente =
        `Dados do cliente:\n` +
        (extraInfo.name ? `Nome: ${extraInfo.name}\n` : '') +
        (extraInfo.address ? `Endereço: ${extraInfo.address}\n` : '') +
        '\n';
    }

    const mensagem =
      `Olá! Gostaria de finalizar uma compra na CaiCai Papelaria.\n\n` +
      dadosCliente +
      `Itens selecionados:\n` +
      `${itensTexto}\n\n` +
      `Total: R$ ${total.toFixed(2).replace('.', ',')}\n\n`;

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
  function handleOpenWhatsAppIcon() {
    Linking.openURL(`https://wa.me/${WHATSAPP_NUMBER}`).catch(() =>
      Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.')
    );
  }

  function handleOpenFacebook() {
    Linking.openURL('https://facebook.com/seupagina').catch(() =>
      Alert.alert('Erro', 'Não foi possível abrir o Facebook.')
    );
  }

  function handleOpenInstagram() {
    Linking.openURL('https://instagram.com/seupagina').catch(() =>
      Alert.alert('Erro', 'Não foi possível abrir o Instagram.')
    );
  }

  let content;
  if (view === 'catalog') {
    content = (
      <ProductCatalog
        onAddToCart={addToCart}
      />
    );
  } else if (view === 'cart') {
    content = (
      <CartPage
        cartItems={cartItems}
        onBack={() => goToHomeSection('hero')}
        onIncrement={(id) => updateQuantity(id, +1)}
        onDecrement={(id) => updateQuantity(id, -1)}
        onRemove={removeFromCart}
        onCheckout={() => handleCheckout()}
      />
    );
  } else {
    content = (
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent}
      >
        <View onLayout={handleSectionLayout('hero')}>
          <Hero />
        </View>

        <View onLayout={handleSectionLayout('about')}>
          <SectionAbout />
        </View>

        <View onLayout={handleSectionLayout('products')}>
          <SectionProducts
            onSeeMore={goToCatalog}
            onAddToCart={addToCart}
          />
        </View>

        <View onLayout={handleSectionLayout('contact')}>
          <SectionContact />
        </View>

        <Footer
          onNavHome={() => goToHomeSection('hero')}
          onNavAbout={() => goToHomeSection('about')}
          onNavProducts={() => goToHomeSection('products')}
          onNavContact={() => goToHomeSection('contact')}
        />
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
        onNavHome={() => goToHomeSection('hero')}
        onNavAbout={() => goToHomeSection('about')}
        onNavProducts={() => goToHomeSection('products')}
        onNavContact={() => goToHomeSection('contact')}
        onOpenWhatsApp={handleOpenWhatsAppIcon}
        onOpenFacebook={handleOpenFacebook}
        onOpenInstagram={handleOpenInstagram}
      />
      {content}

      {/* PAINEL LATERAL DO CARRINHO */}
      <CartSidePanel
        visible={isCartOpen}
        cartItems={cartItems}
        onClose={() => setIsCartOpen(false)}
        onIncrement={(id) => updateQuantity(id, +1)}
        onDecrement={(id) => updateQuantity(id, -1)}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
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
