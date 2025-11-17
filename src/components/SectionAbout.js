import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';

const RED = '#e63946';
const PURPLE = '#7c3aed';
const BLACK = '#111111';
const CARD_BG = '#fff7c8';

export default function SectionAbout() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < 900;

  return (
    <View style={[styles.section, { minHeight: height * 1.1 }]}>
      <View style={styles.inner}>
        
        {/* Títulos */}
        <Text style={styles.sectionTitle}>Quem Somos</Text>
        <Text style={styles.sectionSubtitle}>
          Uma papelaria feita para quem ama organização, cor e criatividade.
        </Text>

        <View
          style={[
            styles.topRow,
            isMobile && { flexDirection: 'column', gap: 20 },
          ]}
        >
          <View
            style={[
              styles.photoWrapper,
              isMobile && { width: '100%' },
            ]}
          >
            <Image
              source={require('./assets/imagemee.png')}
              style={styles.mainPhoto}
            />
          </View>

          <View
            style={[
              styles.textWrapper,
              isMobile && { width: '100%' },
            ]}
          >
            <Text style={styles.bodyText}>
              Desde 1991, a <Text style={styles.bold}>Cai Cai Papelaria</Text> faz parte
              da história de Nova Friburgo, levando cor, organização e criatividade
              para o dia a dia de estudantes, profissionais e famílias inteiras.
              Localizada na tradicional Rua Cristovão Colombo, 3 – Centro, somos
              uma empresa familiar que cresceu com a missão de oferecer mais do
              que produtos: entregamos atenção, carinho e uma experiência única
              a cada cliente.
            </Text>

            <Text style={styles.bodyText}>
              Nosso compromisso vai além de vender materiais escolares e de escritório.
              Ao longo dos anos, conquistamos a confiança da comunidade com um
              atendimento acolhedor, humano e cheio de cuidado nos detalhes. Aqui,
              cada cliente é tratado como parte da nossa história — e essa história
              já atravessa gerações.
            </Text>
          </View>
        </View>

        {/* BLOCO 2 */}
        <View
          style={[
            styles.bottomRow,
            isMobile && { flexDirection: 'column', gap: 20 },
          ]}
        >
          {/* CARTÃO */}
          <View
            style={[
              styles.highlightCard,
              isMobile && { width: '100%' },
            ]}
          >
            <Text style={styles.highlightTitle}>🏅 Recomendação da Cidade 2024</Text>
            <Text style={styles.highlightText}>
              Com muito orgulho, recebemos um certificado de reconhecimento da
              Câmara Municipal de Nova Friburgo, em homenagem à nossa trajetória,
              ao impacto positivo na comunidade e ao compromisso que mantemos há
              mais de 30 anos com o bom atendimento e o desenvolvimento local.
            </Text>
          </View>

          <View
            style={[
              styles.certificateWrapper,
              isMobile && { width: '100%' },
            ]}
          >
            <Image
              source={require('./assets/ttttt.png')}
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
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: 1280,
  },

  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: RED,
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: PURPLE,
    textAlign: 'center',
    marginBottom: 40,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50, 
  },
  photoWrapper: {
    flexBasis: '45%', 
  },
  mainPhoto: {
    width: '100%',
    aspectRatio: 3 / 4,
    maxHeight: 420,
    borderRadius: 22,
  },
  textWrapper: {
    flexBasis: '50%',
    paddingLeft: 25, 
    justifyContent: 'center',
  },
  bodyText: {
    fontSize: 16,
    color: BLACK,
    lineHeight: 26,
    marginBottom: 16,
  },
  bold: {
    fontWeight: 'bold',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlightCard: {
    flexBasis: '48%',
    backgroundColor: CARD_BG,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderLeftColor: RED,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PURPLE,
    marginBottom: 12,
  },
  highlightText: {
    fontSize: 15, 
    color: BLACK,
    lineHeight: 24,
  },
  certificateWrapper: {
    flexBasis: '48%',
  },
  certificatePhoto: {
    width: '100%',
    aspectRatio: 4 / 3,
    maxHeight: 320, 
    borderRadius: 18,
  },
});
