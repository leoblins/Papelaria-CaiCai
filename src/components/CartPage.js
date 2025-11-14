// src/components/CartPage.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

const RED = '#e63946';
const PURPLE = '#7c3aed';
const BLACK = '#111111';

export default function CartPage({
  cartItems,
  onBack,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
}) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <View style={styles.section}>
      <View style={styles.inner}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Seu carrinho</Text>
          {onBack && (
            <Pressable style={styles.backButton} onPress={onBack}>
              <Text style={styles.backButtonText}>Voltar para a loja</Text>
            </Pressable>
          )}
        </View>

        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>
            Seu carrinho está vazio. Adicione alguns produtos para continuar.
          </Text>
        ) : (
          <>
            <ScrollView
              style={{ maxHeight: 420 }}
              contentContainerStyle={{ paddingBottom: 12 }}
            >
              {cartItems.map((item) => (
                <View key={item.product.id} style={styles.itemRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemName}>{item.product.name}</Text>
                    <Text style={styles.itemPrice}>
                      R$ {item.product.price.toFixed(2).replace('.', ',')}
                    </Text>
                  </View>

                  <View style={styles.quantityBox}>
                    <Pressable
                      style={styles.qtyButton}
                      onPress={() => onDecrement(item.product.id)}
                    >
                      <Text style={styles.qtyButtonText}>-</Text>
                    </Pressable>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <Pressable
                      style={styles.qtyButton}
                      onPress={() => onIncrement(item.product.id)}
                    >
                      <Text style={styles.qtyButtonText}>+</Text>
                    </Pressable>
                  </View>

                  <View style={styles.itemTotalBox}>
                    <Text style={styles.itemTotal}>
                      R${' '}
                      {(item.product.price * item.quantity)
                        .toFixed(2)
                        .replace('.', ',')}
                    </Text>
                    <Pressable
                      style={styles.removeButton}
                      onPress={() => onRemove(item.product.id)}
                    >
                      <Text style={styles.removeButtonText}>Remover</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.summary}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryValue}>
                R$ {total.toFixed(2).replace('.', ',')}
              </Text>
            </View>

            <Pressable style={styles.checkoutButton} onPress={onCheckout}>
              <Text style={styles.checkoutButtonText}>Finalizar compra</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: '#fff7db',
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
    marginBottom: 16,
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
  },
  backButtonText: {
    color: RED,
    fontSize: 12,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: BLACK,
  },
  itemPrice: {
    fontSize: 12,
    color: PURPLE,
    marginTop: 2,
  },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  qtyButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonText: {
    fontSize: 16,
    color: BLACK,
  },
  qtyText: {
    width: 28,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  itemTotalBox: {
    alignItems: 'flex-end',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: RED,
  },
  removeButton: {
    marginTop: 4,
  },
  removeButtonText: {
    fontSize: 11,
    color: '#999',
    textDecorationLine: 'underline',
  },
  summary: {
    marginTop: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 16,
    color: BLACK,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: RED,
  },
  checkoutButton: {
    marginTop: 16,
    backgroundColor: RED,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
