// src/components/SectionContact.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Linking,
} from 'react-native';

const RED = '#e63946';
const PURPLE = '#7c3aed';
const BLACK = '#111111';
const BG = '#fff8d9';
const CARD_BG = '#ffffff';

const WHATSAPP_NUMBER = '5521989036236'; // DDI + DDD + número (só dígitos)
const CONTACT_EMAIL = 'leoblins@gmail.com';

export default function SectionContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  function validateEmail(value) {
    // validação simples só pra evitar coisa muito errada
    return /\S+@\S+\.\S+/.test(value);
  }

  function handleSubmit() {
    if (!name || !email || !subject || !message) {
      Alert.alert('Ops!', 'Preencha todos os campos antes de enviar ✍️');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('E-mail inválido', 'Digite um e-mail válido.');
      return;
    }

    const mailSubject = `[CaiCai Papelaria] ${subject}`;
    const mailBody =
      `Nome: ${name}\n` +
      `E-mail: ${email}\n\n` +
      `Mensagem:\n${message}\n`;

    const mailtoUrl =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(mailSubject)}` +
      `&body=${encodeURIComponent(mailBody)}`;

    Linking.openURL(mailtoUrl).catch(() => {
      Alert.alert(
        'Não foi possível abrir o e-mail',
        'Tente novamente ou use o WhatsApp para entrar em contato.'
      );
    });
  }

  function handleOpenWhatsApp() {
    if (!message) {
      Alert.alert(
        'Mensagem vazia',
        'Escreva a mensagem no campo de mensagem antes de abrir o WhatsApp 😉'
      );
      return;
    }

    const text =
      `Olá, meu nome é ${name || '(não informado)'}.\n` +
      `Assunto: ${subject || '(não informado)'}\n\n` +
      `${message}`;

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(text)}`;

    Linking.openURL(url).catch(() => {
      Alert.alert(
        'Não foi possível abrir o WhatsApp',
        'Verifique se o aplicativo está instalado ou tente pelo navegador.'
      );
    });
  }

  function handleOpenMailDirect() {
    const url = `mailto:${CONTACT_EMAIL}`;
    Linking.openURL(url);
  }

  return (
    <View style={styles.section}>
      <View style={styles.inner}>
        <Text style={styles.title}>Contato</Text>
        <Text style={styles.subtitle}>
          Fale com a gente para orçamentos, dúvidas e pedidos especiais.
        </Text>

        <View style={styles.row}>
          {/* FORMULÁRIO */}
          <View style={styles.formCard}>
            <View style={styles.field}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu nome completo"
                placeholderTextColor="#b5b5b5"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="seuemail@exemplo.com"
                placeholderTextColor="#b5b5b5"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Assunto</Text>
              <TextInput
                style={styles.input}
                placeholder="Orçamento, dúvida, kit personalizado..."
                placeholderTextColor="#b5b5b5"
                value={subject}
                onChangeText={setSubject}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Mensagem</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Como podemos te ajudar?"
                placeholderTextColor="#b5b5b5"
                multiline
                textAlignVertical="top"
                value={message}
                onChangeText={setMessage}
              />
            </View>

            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Enviar mensagem por e-mail</Text>
            </Pressable>

            <Pressable
              style={[styles.submitButton, styles.whatsButton]}
              onPress={handleOpenWhatsApp}
            >
              <Text style={styles.submitButtonText}>
                Enviar mensagem pelo WhatsApp
              </Text>
            </Pressable>
          </View>

          {/* OUTROS CONTATOS */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Outros canais</Text>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>WhatsApp</Text>
              <Pressable onPress={handleOpenWhatsApp}>
                <Text style={styles.infoValue}>(21) 99999-9999</Text>
              </Pressable>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>E-mail</Text>
              <Pressable onPress={handleOpenMailDirect}>
                <Text style={styles.infoValue}>{CONTACT_EMAIL}</Text>
              </Pressable>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Endereço</Text>
              <Text style={styles.infoValue}>
                Rua da Papelaria, 123 – Niterói/RJ
              </Text>
            </View>

            <View style={[styles.infoItem, { marginTop: 16 }]}>
              <Text style={styles.infoLabel}>Horário de atendimento</Text>
              <Text style={styles.infoValue}>
                Segunda a sexta: 9h às 18h{'\n'}
                Sábados: 9h às 13h
              </Text>
            </View>

            <View style={styles.tipBox}>
              <Text style={styles.tipTitle}>Dica 💡</Text>
              <Text style={styles.tipText}>
                Se preferir, descreva os itens da lista escolar ou do seu
                escritório. A gente monta o orçamento completo pra você!
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: BG,
    paddingHorizontal: 16,
    paddingVertical: 40,
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: 1100,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: RED,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: PURPLE,
    textAlign: 'center',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },

  formCard: {
    flexBasis: '60%',
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: BLACK,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#f3c77a',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    backgroundColor: '#fff',
  },
  textArea: {
    minHeight: 100,
  },
  submitButton: {
    marginTop: 12,
    backgroundColor: RED,
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
  },
  whatsButton: {
    backgroundColor: '#25D366',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },

  infoCard: {
    flexBasis: '35%',
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: RED,
    marginBottom: 12,
  },
  infoItem: {
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: BLACK,
  },
  infoValue: {
    fontSize: 13,
    color: '#444',
  },
  tipBox: {
    marginTop: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff3bf',
    borderLeftWidth: 3,
    borderLeftColor: PURPLE,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: PURPLE,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 12,
    color: BLACK,
    lineHeight: 18,
  },
});
