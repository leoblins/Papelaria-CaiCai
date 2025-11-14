// src/components/SectionAbout.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RED = '#e63946';
const PURPLE = '#7c3aed';
const BLACK = '#111111';
const CARD_BG = '#fff7c8';

export default function SectionAbout() {
  return (
    <View style={styles.section}>
      <View style={styles.inner}>
        {/* TÍTULO */}
        <Text style={styles.sectionTitle}>Quem Somos</Text>
        <Text style={styles.sectionSubtitle}>
          Uma papelaria feita para quem ama organização, cor e criatividade.
        </Text>

        {/* LINHA 1: FOTO ESQUERDA + TEXTO DIREITA */}
        <View style={styles.topRow}>
          {/* FOTO PRINCIPAL */}
          <View style={styles.photoWrapper}>
            <Image
              source={require('./assets/about/eu.jpg')}
              style={styles.mainPhoto}
            />
          </View>

          {/* TEXTO */}
          <View style={styles.textWrapper}>
            <Text style={styles.bodyText}>
              Desde 1991, a <Text style={styles.bold}>Cai Cai Papelaria</Text>{' '}
              faz parte da história de Nova Friburgo, levando cor, organização e
              criatividade para o dia a dia de estudantes, profissionais e
              famílias inteiras. Localizada na tradicional Rua Cristovão
              Colombo, 3 – Centro, somos uma empresa familiar que cresceu com a
              missão de oferecer mais do que produtos: entregamos atenção,
              carinho e uma experiência única a cada cliente.
            </Text>

            <Text style={styles.bodyText}>
              Nosso compromisso vai além de vender materiais escolares e de
              escritório. Ao longo dos anos, conquistamos a confiança da
              comunidade com um atendimento acolhedor, humano e cheio de cuidado
              nos detalhes. Aqui, cada cliente é tratado como parte da nossa
              história — e essa história já atravessa gerações.
            </Text>
          </View>
        </View>

        {/* LINHA 2: TEXTO ESQUERDA + CERTIFICADO DIREITA */}
        <View style={styles.bottomRow}>
          {/* CARTÃO AMARELO */}
          <View style={styles.highlightCard}>
            <Text style={styles.highlightTitle}>
              🏅 Recomendação da Cidade 2024
            </Text>
            <Text style={styles.highlightText}>
              Com muito orgulho, recebemos um certificado de reconhecimento da
              Câmara Municipal de Nova Friburgo, em homenagem à nossa
              trajetória, ao impacto positivo na comunidade e ao compromisso que
              mantemos há mais de 30 anos com o bom atendimento e o
              desenvolvimento local.
            </Text>
          </View>

          {/* CERTIFICADO */}
          <View style={styles.certificateWrapper}>
            <Image
              source={require('./assets/about/1758583274744.jpg')}
              style={styles.certificatePhoto}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingVertical: 40,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: 960,           // antes 1100 – deixa o bloco todo menor
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: RED,
    textAlign: 'center',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: PURPLE,
    textAlign: 'center',
    marginBottom: 24,
  },

  /* LINHA 1 */
  topRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  photoWrapper: {
    flexBasis: '40%',        // antes 48% – reduz largura da foto
    marginBottom: 16,
  },
  mainPhoto: {
    width: '100%',
    aspectRatio: 3 / 4,      // mais “retrato” (menos largo)
    maxHeight: 320,          // limita a altura máxima
    borderRadius: 20,
  },
  textWrapper: {
    flexBasis: '58%',        // texto ocupa um pouco mais que a foto
    marginBottom: 16,
    justifyContent: 'center',
  },
  bodyText: {
    fontSize: 14,
    color: BLACK,
    lineHeight: 22,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },

  /* LINHA 2 */
  bottomRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  highlightCard: {
    flexBasis: '48%',
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: RED,
  },
  highlightTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: PURPLE,
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 13,
    color: BLACK,
    lineHeight: 20,
  },
  certificateWrapper: {
    flexBasis: '48%',
    marginBottom: 16,
  },
  certificatePhoto: {
    width: '100%',
    aspectRatio: 4 / 3,
    maxHeight: 260,          // certificado mais baixinho
    borderRadius: 16,
  },
});
