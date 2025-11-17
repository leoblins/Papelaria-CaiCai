import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';

const RED = '#e63946';
const PURPLE = '#7c3aed';
const BLACK = '#111111';
const GREEN = '#22c55e';

export default function CartSidePanel({
  visible,
  cartItems,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
}) {
  if (!visible) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  function handleFinish() {
    const hasName = name.trim().length > 0;
    const hasAddress = address.trim().length > 0;

    if (!hasName || !hasAddress) {
      setShowErrors(true);
      Alert.alert(
        'Campos obrigatórios',
        'Preencha seu nome e endereço para finalizar o pedido.'
      );
      return;
    }

    onCheckout &&
      onCheckout({
        name: name.trim(),
        address: address.trim(),
      });
  }

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <Text style={styles.panelTitle}>Carrinho</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </Pressable>
        </View>

        <View style={styles.divider} />

        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>
            Seu carrinho está vazio. Adicione alguns produtos para continuar.
          </Text>
        ) : (
          <>
            {/* LISTA DE ITENS */}
            <ScrollView
              style={styles.itemsScroll}
              contentContainerStyle={{ paddingBottom: 12 }}
            >
              {cartItems.map((item) => (
                <View key={item.product.id} style={styles.itemRow}>
                  <Text style={styles.itemName}>{item.product.name}</Text>

                  <View style={styles.linePrice}>
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

                    <Text style={styles.itemTotal}>
                      R${' '}
                      {(item.product.price * item.quantity)
                        .toFixed(2)
                        .replace('.', ',')}
                    </Text>
                  </View>

                  <Pressable
                    style={styles.removeButton}
                    onPress={() => onRemove(item.product.id)}
                  >
                    <Text style={styles.removeButtonText}>Remover</Text>
                  </Pressable>

                  <View style={styles.itemDivider} />
                </View>
              ))}
            </ScrollView>

            {/* CAMPOS DE DADOS DO CLIENTE */}
            <View style={styles.form}>
              <Text style={styles.label}>
                Seu nome <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.input,
                  showErrors && !name.trim() && styles.inputError,
                ]}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#b5b5b5"
                value={name}
                onChangeText={(t) => {
                  setName(t);
                  if (showErrors) setShowErrors(false);
                }}
              />

              <Text style={styles.label}>
                Seu endereço <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.input,
                  showErrors && !address.trim() && styles.inputError,
                ]}
                placeholder="Rua, número, bairro, cidade"
                placeholderTextColor="#b5b5b5"
                value={address}
                onChangeText={(t) => {
                  setAddress(t);
                  if (showErrors) setShowErrors(false);
                }}
              />

              {showErrors && (
                <Text style={styles.errorText}>
                  Nome e endereço são obrigatórios para finalizar o pedido.
                </Text>
              )}
            </View>

            {/* RESUMO / TOTAL */}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total: </Text>
              <Text style={styles.totalValue}>
                R$ {total.toFixed(2).replace('.', ',')}
              </Text>
            </View>

            <Text style={styles.shippingNote}>
               O frete será combinado com o dono da loja.
            </Text>

            {/* BOTÃO WHATSAPP */}
            <Pressable style={styles.whatsButton} onPress={handleFinish}>
              <Text style={styles.whatsButtonText}>
                Finalizar Pedido via WhatsApp
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  panel: {
    width: 380,
    maxWidth: '90%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  panelTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: BLACK,
  },
  closeButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
  },
  closeButtonText: {
    fontSize: 13,
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginTop: 8,
    marginBottom: 8,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 14,
    color: '#555',
  },
  itemsScroll: {
    maxHeight: 260,
    marginTop: 8,
    marginBottom: 12,
  },
  itemRow: {
    paddingVertical: 4,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: BLACK,
    marginBottom: 4,
  },
  linePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonText: {
    fontSize: 18,
    color: BLACK,
  },
  qtyText: {
    width: 32,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'underline',
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginTop: 8,
  },

  form: {
    marginTop: 8,
    marginBottom: 8,
    gap: 6,
  },
  label: {
    fontSize: 13,
    color: BLACK,
    marginBottom: 2,
  },
  required: {
    color: RED,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 6,
  },
  inputError: {
    borderColor: RED,
  },
  errorText: {
    fontSize: 12,
    color: RED,
    marginTop: 2,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 15,
    color: BLACK,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: RED,
  },
  shippingNote: {
    marginTop: 6,
    fontSize: 12,
    color: '#555',
    fontStyle: 'italic',
  },
  whatsButton: {
    marginTop: 12,
    backgroundColor: GREEN,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  whatsButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
