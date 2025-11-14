// src/components/Header.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

const YELLOW = '#ffd54f';
const RED = '#e63946';

export default function Header({
  cartItems = [],
  totalItems = 0,
  isCartOpen = false,
  onToggleCart,
  onGoToCart,
  onNavHome,
  onNavProducts,
  onNavContact,
}) {
  const firstItems = cartItems.slice(0, 4);
  const hasMore = cartItems.length > 4;

  const totalValue = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        {/* LOGO */}
        <Pressable onPress={onNavHome}>
          <View style={styles.logoArea}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoInitials}>CC</Text>
            </View>
            <View>
              <Text style={styles.logoText}>CaiCai Papelaria</Text>
              <Text style={styles.logoSubtitle}>
                Tudo para estudo e escritório
              </Text>
            </View>
          </View>
        </Pressable>

        {/* MENU + CARRINHO */}
        <View style={styles.rightArea}>
          <View style={styles.menu}>
            <Pressable onPress={onNavHome}>
              <Text style={styles.menuItem}>Home</Text>
            </Pressable>
            <Pressable onPress={onNavProducts}>
              <Text style={styles.menuItem}>Produtos</Text>
            </Pressable>
            {onNavContact && (
              <Pressable onPress={onNavContact}>
                <Text style={styles.menuItem}>Contato</Text>
              </Pressable>
            )}
          </View>

          <Pressable style={styles.cartButton} onPress={onToggleCart}>
            <Text style={styles.cartIcon}>🛒</Text>
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
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: YELLOW,
    paddingTop: 26,
    paddingHorizontal: 16,
    paddingBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoInitials: {
    color: RED,
    fontWeight: 'bold',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: RED,
  },
  logoSubtitle: {
    fontSize: 11,
    color: '#5c5c5c',
  },
  rightArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menu: {
    flexDirection: 'row',
    gap: 12,
  },
  menuItem: {
    fontSize: 13,
    color: '#4b4b4b',
  },
  cartButton: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 999,
    backgroundColor: '#fff8e1',
    position: 'relative',
  },
  cartIcon: {
    fontSize: 18,
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
    width: 320,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ffe4a8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 5,
  },
  dropdownEmpty: {
    fontSize: 13,
    color: '#666',
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dropdownName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222',
  },
  dropdownDetail: {
    fontSize: 11,
    color: '#666',
  },
  dropdownTotal: {
    fontSize: 13,
    fontWeight: '600',
    color: RED,
    marginLeft: 8,
  },
  dropdownMore: {
    fontSize: 11,
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
    fontSize: 13,
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
    fontSize: 11,
    fontWeight: '600',
  },
});
