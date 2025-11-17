// src/components/SectionContact.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  useWindowDimensions,
} from 'react-native';

const RED = '#e63946';
const RED_DARK = '#c53030';
const PURPLE = '#7c3aed';
const BLACK = '#111111';
const CARD_BG = '#ffffff';

// 🔧 TROQUE PELOS DADOS DO SEU EMAILJS
const EMAILJS_SERVICE_ID = 'service_uzxe2wl';
const EMAILJS_TEMPLATE_ID = 'template_7xlryar';
const EMAILJS_PUBLIC_KEY = 'MV7k_epzp81BIW1FV';

export default function SectionContact() {
  const { height, width } = useWindowDimensions();
  const isMobile = width < 768;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [isHoverSubmit, setIsHoverSubmit] = useState(false);
  const [isPressSubmit, setIsPressSubmit] = useState(false);

  function validateEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
  }

  async function handleSubmit() {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha Nome, E-mail e Mensagem.');
      return;
    }

    if (!validateEmail(email.trim())) {
      Alert.alert('E-mail inválido', 'Digite um e-mail válido.');
      return;
    }

    setIsSubmitting(true);
    setSuccessMsg('');

    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject || 'Sem assunto',
      message,
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: templateParams,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar');
      }

      setSuccessMsg(
        'Mensagem enviada com sucesso! Entrarei em contato em breve.'
      );
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      Alert.alert(
        'Erro ao enviar',
        'Não foi possível enviar sua mensagem. Verifique sua conexão ou tente novamente mais tarde.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const showButtonActive = isHoverSubmit || isPressSubmit || isSubmitting;

  return (
    <View style={[styles.section, { minHeight: height * 0.95 }]}>
      <View style={[styles.inner, isMobile && { maxWidth: 600 }]}>
        <Text style={styles.title}>Contato</Text>
        <Text style={styles.subtitle}>
          Fale com a gente para orçamentos, dúvidas e pedidos especiais.
        </Text>

        {/* MENSAGEM DE SUCESSO */}
        {successMsg ? (
          <View style={styles.successBox}>
            <Text style={styles.successText}>{successMsg}</Text>
          </View>
        ) : null}

        {/* FORMULÁRIO */}
        <View style={styles.formCard}>
          <View style={styles.field}>
            <Text style={styles.label}>Nome*</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor="#b5b5b5"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>E-mail*</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
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
              placeholder="Digite o assunto (opcional)"
              placeholderTextColor="#b5b5b5"
              value={subject}
              onChangeText={setSubject}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Mensagem*</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Digite sua mensagem"
              placeholderTextColor="#b5b5b5"
              multiline
              textAlignVertical="top"
              value={message}
              onChangeText={setMessage}
            />
          </View>

          <Pressable
            onPress={handleSubmit}
            disabled={isSubmitting}
            onHoverIn={() => setIsHoverSubmit(true)}
            onHoverOut={() => setIsHoverSubmit(false)}
            onPressIn={() => setIsPressSubmit(true)}
            onPressOut={() => setIsPressSubmit(false)}
            style={[
              styles.submitButton,
              showButtonActive && styles.submitButtonActive,
              isSubmitting && { opacity: 0.8 },
            ]}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 40,
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: 720,
  },
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

  successBox: {
    backgroundColor: '#d1fae5',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  successText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#047857',
    fontWeight: '500',
  },

  formCard: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  field: {
    marginBottom: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: PURPLE,
    marginBottom: 4,
  },
  input: {
    borderWidth: 2,
    borderColor: '#f3c77a',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    minHeight: 110,
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: RED,
    borderRadius: 999,
    paddingVertical: 11,
    paddingHorizontal: 24,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  submitButtonActive: {
    backgroundColor: RED_DARK,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});