// src/components/Header.js
import React, { useState, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const YELLOW = '#ffd54f';
const RED = '#e63946';
const PURPLE = '#4b2faf';

export default function Header({
  cartItems = [],
  totalItems = 0,
  isCartOpen = false,
  onToggleCart,
  onGoToCart,
  onNavHome,
  onNavProducts,
  onNavContact,
  onNavAbout,
  onOpenWhatsApp,
  onOpenFacebook,
  onOpenInstagram,
}) {
  const { width } = useWindowDimensions();

  // estilos responsivos + tamanhos de ícone
  const { styles, iconSize, cartIconSize } = useMemo(
    () => createStyles(width),
    [width]
  );

  // estado de hover do MENU (cor vermelha)
  const [hoverMenu, setHoverMenu] = useState(null); // 'home' | 'about' | 'prod' | 'contato'

  // valores animados para escala suave dos ícones
  const scaleIg = useRef(new Animated.Value(1)).current;
  const scaleFb = useRef(new Animated.Value(1)).current;
  const scaleWpp = useRef(new Animated.Value(1)).current;
  const scaleCart = useRef(new Animated.Value(1)).current;

  const firstItems = cartItems.slice(0, 4);
  const hasMore = cartItems.length > 4;

  const totalValue = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  function animateHoverIn(scaleValue) {
    Animated.timing(scaleValue, {
      toValue: 1.15, // 15% maior
      duration: 150,
      useNativeDriver: true,
    }).start();
  }

  function animateHoverOut(scaleValue) {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.inner}>
        <View style={styles.header}>
          {/* LOGO */}
          <Pressable onPress={onNavHome}>
            <View style={styles.logoArea}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoInitials}>CC</Text>
              </View>
              <View>
                <Text style={styles.logoText}>CAI CAI PAPELARIA</Text>
                <Text style={styles.logoSubtitle}>
                  Rua Cristovão Colombo, 3 - Centro, Nova Friburgo{"\n"}
                  caicaipapelaria@hotmail.com
                </Text>
              </View>
            </View>
          </Pressable>

          {/* MENU + REDES + CARRINHO */}
          <View style={styles.rightArea}>
            {/* MENU */}
            <View style={styles.menu}>
              <Pressable
                onPress={onNavHome}
                onHoverIn={() => setHoverMenu('home')}
                onHoverOut={() => setHoverMenu(null)}
              >
                <Text
                  style={[
                    styles.menuItem,
                    hoverMenu === 'home' && styles.hoverText,
                  ]}
                >
                  Home
                </Text>
              </Pressable>

              {onNavAbout && (
                <Pressable
                  onPress={onNavAbout}
                  onHoverIn={() => setHoverMenu('about')}
                  onHoverOut={() => setHoverMenu(null)}
                >
                  <Text
                    style={[
                      styles.menuItem,
                      hoverMenu === 'about' && styles.hoverText,
                    ]}
                  >
                    Quem Somos
                  </Text>
                </Pressable>
              )}

              <Pressable
                onPress={onNavProducts}
                onHoverIn={() => setHoverMenu('prod')}
                onHoverOut={() => setHoverMenu(null)}
              >
                <Text
                  style={[
                    styles.menuItem,
                    hoverMenu === 'prod' && styles.hoverText,
                  ]}
                >
                  Produtos
                </Text>
              </Pressable>

              {onNavContact && (
                <Pressable
                  onPress={onNavContact}
                  onHoverIn={() => setHoverMenu('contato')}
                  onHoverOut={() => setHoverMenu(null)}
                >
                  <Text
                    style={[
                      styles.menuItem,
                      hoverMenu === 'contato' && styles.hoverText,
                    ]}
                  >
                    Contato
                  </Text>
                </Pressable>
              )}
            </View>

            {/* ÍCONES SOCIAIS (escala suave no hover) */}
            <View style={styles.socialArea}>
              <Pressable
                onPress={onOpenInstagram}
                onHoverIn={() => animateHoverIn(scaleIg)}
                onHoverOut={() => animateHoverOut(scaleIg)}
              >
                <Animated.View style={{ transform: [{ scale: scaleIg }] }}>
                  <FontAwesome
                    name="instagram"
                    size={iconSize}
                    style={styles.socialIcon}
                  />
                </Animated.View>
              </Pressable>

              <Pressable
                onPress={onOpenFacebook}
                onHoverIn={() => animateHoverIn(scaleFb)}
                onHoverOut={() => animateHoverOut(scaleFb)}
              >
                <Animated.View style={{ transform: [{ scale: scaleFb }] }}>
                  <FontAwesome
                    name="facebook"
                    size={iconSize}
                    style={styles.socialIcon}
                  />
                </Animated.View>
              </Pressable>

              <Pressable
                onPress={onOpenWhatsApp}
                onHoverIn={() => animateHoverIn(scaleWpp)}
                onHoverOut={() => animateHoverOut(scaleWpp)}
              >
                <Animated.View style={{ transform: [{ scale: scaleWpp }] }}>
                  <FontAwesome
                    name="whatsapp"
                    size={iconSize}
                    style={styles.socialIcon}
                  />
                </Animated.View>
              </Pressable>
            </View>

            {/* CARRINHO (escala suave no hover) */}
            <Pressable
              style={styles.cartButton}
              onPress={onToggleCart}
              onHoverIn={() => animateHoverIn(scaleCart)}
              onHoverOut={() => animateHoverOut(scaleCart)}
            >
              <Animated.View style={{ transform: [{ scale: scaleCart }] }}>
                <FontAwesome
                  name="shopping-cart"
                  size={cartIconSize}
                  style={styles.cartIcon}
                />
              </Animated.View>

              {totalItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {totalItems > 99 ? '99+' : totalItems}
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>

        {/* DROPDOWN DO CARRINHO */}
        {isCartOpen && (
          <View style={styles.dropdown}>
            {cartItems.length === 0 ? (
              <Text style={styles.dropdownEmpty}>
                Seu carrinho está vazio.
              </Text>
            ) : (
              <>
                <ScrollView style={{ maxHeight: 220 }}>
                  {firstItems.map((item) => (
                    <View key={item.product.id} style={styles.dropdownItem}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.dropdownName} numberOfLines={1}>
                          {item.product.name}
                        </Text>
                        <Text style={styles.dropdownDetail}>
                          {item.quantity}x R${' '}
                          {item.product.price.toFixed(2).replace('.', ',')}
                        </Text>
                      </View>
                      <Text style={styles.dropdownTotal}>
                        R${' '}
                        {(item.product.price * item.quantity)
                          .toFixed(2)
                          .replace('.', ',')}
                      </Text>
                    </View>
                  ))}
                  {hasMore && (
                    <Text style={styles.dropdownMore}>
                      + {cartItems.length - firstItems.length} itens no carrinho
                    </Text>
                  )}
                </ScrollView>

                <View style={styles.dropdownFooter}>
                  <Text style={styles.dropdownTotalLabel}>
                    Total:{' '}
                    <Text style={styles.dropdownTotalValue}>
                      R$ {totalValue.toFixed(2).replace('.', ',')}
                    </Text>
                  </Text>
                  <Pressable
                    style={styles.dropdownButton}
                    onPress={onGoToCart}
                  >
                    <Text style={styles.dropdownButtonText}>
                      Ir para o carrinho
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

/**
 * Estilos responsivos + tamanhos de ícone
 */
function createStyles(width) {
  const isMobile = width < 600;
  const isTablet = width >= 600 && width < 1024;
  const isDesktop = width >= 1024;

  const baseFont = isMobile ? 16 : isTablet ? 17 : 18;
  const logoFont = isMobile ? 23 : isTablet ? 25 : 30;
  const subtitleFont = isMobile ? 14 : isTablet ? 15 : 16;
  const menuFont = baseFont;

  const iconSize = isMobile ? 17 : isTablet ? 21 : 25;
  const cartIconSize = isMobile ? 17 : isTablet ? 21 : 25;

  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: YELLOW,
      paddingTop: isMobile ? 16 : 18,
      paddingBottom: isMobile ? 10 : 12,
    },
    inner: {
      width: '100%',
      maxWidth: isDesktop ? 1280 : 1000,
      alignSelf: 'center',
      paddingHorizontal: isMobile ? 12 : 24,
    },
    header: {
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: isMobile ? 'flex-start' : 'space-between',
      alignItems: isMobile ? 'center' : 'center',
      gap: isMobile ? 12 : 16,
    },
    logoArea: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: isMobile ? 8 : 10,
      flexShrink: 1,
      alignSelf: isMobile ? 'center' : 'flex-start',
    },
    logoCircle: {
      width: isMobile ? 40 : 60,
      height: isMobile ? 40 : 60,
      borderRadius: 999,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#ffeb3b',
    },
    logoInitials: {
      color: RED,
      fontWeight: 'bold',
      fontSize: baseFont,
    },
    logoText: {
      fontSize: logoFont,
      fontWeight: '700',
      color: RED,
    },
    logoSubtitle: {
      fontSize: subtitleFont,
      color: '#5c5c5c',
    },
    rightArea: {
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      gap: isMobile ? 10 : 18,
      marginTop: isMobile ? 8 : 0,
    },
    menu: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: isMobile ? 14 : 20,
    },
    menuItem: {
      fontSize: menuFont,
      color: PURPLE,
      fontWeight: '600',
    },
    hoverText: {
      color: RED,
    },
    socialArea: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: isMobile ? 20 : 20,
      marginTop: isMobile ? 8 : 0,
    },
    socialIcon: {
      color: PURPLE,
    },
    cartButton: {
      marginLeft: isMobile ? 0 : 4,
      marginTop: isMobile ? 8 : 0,
      padding: isMobile ? 6 : 6,
      borderRadius: 999,
      backgroundColor: '#fff8e1',
      position: 'relative',
    },
    cartIcon: {
      color: PURPLE,
    },
    badge: {
      position: 'absolute',
      top: -4,
      right: -4,
      minWidth: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: RED,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 4,
    },
    badgeText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: '700',
    },
    dropdown: {
      marginTop: 8,
      marginLeft: 'auto',
      width: isMobile ? '100%' : 320,
      backgroundColor: '#ffffff',
      borderRadius: 16,
      padding: 12,
    },
    dropdownEmpty: {
      fontSize: baseFont,
      color: '#666',
    },
    dropdownItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    dropdownName: {
      fontSize: baseFont,
      fontWeight: '600',
      color: '#222',
    },
    dropdownDetail: {
      fontSize: baseFont - 1,
      color: '#666',
    },
    dropdownTotal: {
      fontSize: baseFont,
      fontWeight: '600',
      color: RED,
      marginLeft: 8,
    },
    dropdownMore: {
      fontSize: baseFont - 1,
      color: '#777',
      marginTop: 4,
    },
    dropdownFooter: {
      borderTopWidth: 1,
      borderTopColor: '#f3f3f3',
      paddingTop: 8,
      marginTop: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dropdownTotalLabel: {
      fontSize: baseFont,
      color: '#444',
    },
    dropdownTotalValue: {
      fontWeight: '700',
      color: RED,
    },
    dropdownButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: RED,
    },
    dropdownButtonText: {
      color: '#fff',
      fontSize: baseFont - 1,
      fontWeight: '600',
    },
  });

  return {
    styles,
    iconSize,
    cartIconSize,
  };
}
