import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Linking,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const YELLOW = '#ffd54f';
const PURPLE = '#4b2faf';
const RED = '#e63946';

export default function Footer({
  onNavHome,
  onNavAbout,
  onNavProducts,
  onNavContact,
}) {
  const { width } = useWindowDimensions();
  const { styles } = useMemo(() => createStyles(width), [width]);
  const [hoverItem, setHoverItem] = useState(null);
  function handleEmailClick() {
    Linking.openURL('mailto:vitordiniz2706@gmail.com').catch(() => {});
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.inner}>
        <View style={styles.topRow}>
          <View style={styles.colLeft}>
            <Text style={styles.brandName}>CAI CAI PAPELARIA</Text>
            <Text style={styles.addressLine}>
              Rua Cristovão Colombo, 3 - Centro, Nova Friburgo
            </Text>
            <Text style={styles.addressLine}>
              caicaipapelaria@hotmail.com
            </Text>
          </View>

          <View style={styles.colCenter}>
            <Pressable
              onPress={onNavHome}
              onHoverIn={() => setHoverItem('home')}
              onHoverOut={() => setHoverItem(null)}
            >
              <Text
                style={[
                  styles.navItem,
                  hoverItem === 'home' && styles.navItemHover,
                ]}
              >
                Home
              </Text>
            </Pressable>

            <Pressable
              onPress={onNavAbout}
              onHoverIn={() => setHoverItem('about')}
              onHoverOut={() => setHoverItem(null)}
            >
              <Text
                style={[
                  styles.navItem,
                  hoverItem === 'about' && styles.navItemHover,
                ]}
              >
                Quem Somos
              </Text>
            </Pressable>

            <Pressable
              onPress={onNavProducts}
              onHoverIn={() => setHoverItem('prod')}
              onHoverOut={() => setHoverItem(null)}
            >
              <Text
                style={[
                  styles.navItem,
                  hoverItem === 'prod' && styles.navItemHover,
                ]}
              >
                Produtos
              </Text>
            </Pressable>

            <Pressable
              onPress={onNavContact}
              onHoverIn={() => setHoverItem('contato')}
              onHoverOut={() => setHoverItem(null)}
            >
              <Text
                style={[
                  styles.navItem,
                  hoverItem === 'contato' && styles.navItemHover,
                ]}
              >
                Contato
              </Text>
            </Pressable>
          </View>

          <View style={styles.colRight}>
            <Text style={styles.hoursTitle}>Horário de Funcionamento</Text>
            <Text style={styles.hoursLine}>
              Segunda a Sexta: 9h às 19h
            </Text>
            <Text style={styles.hoursLine}>
              Sábado: 9h às 18h
            </Text>
          </View>
        </View>

        {/* LINHA DIVISÓRIA */}
        <View style={styles.divider} />

        <View style={styles.bottomArea}>
          <Text style={styles.bottomText}>
            Cai Cai Papelaria. Todos os direitos reservados.
          </Text>

          <View style={styles.devLine}>
            <Text style={styles.bottomText}>
              Desenvolvido por VFGL Soluções –{' '}
            </Text>

            <Pressable
              onPress={handleEmailClick}
              onHoverIn={() => setHoverItem('email')}
              onHoverOut={() => setHoverItem(null)}
              style={styles.emailWrapper}
            >
              <FontAwesome
                name="envelope"
                size={14}
                color={hoverItem === 'email' ? RED : PURPLE}
              />
              <Text
                style={[
                  styles.devEmail,
                  hoverItem === 'email' && styles.devEmailHover,
                ]}
              >
                vitordiniz2706@gmail.com
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

function createStyles(width) {
  const isMobile = width < 800;

  const styles = StyleSheet.create({
    wrapper: {
      width: '100%',
      backgroundColor: YELLOW,
      paddingHorizontal: 16,
      paddingTop: 18,
      paddingBottom: 10,
    },
    inner: {
      width: '100%',
      maxWidth: 1200,
      alignSelf: 'center',
    },
    topRow: {
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      gap: isMobile ? 18 : 24,
      marginBottom: 12,
    },

    colLeft: {
      flexShrink: 1,
    },
    brandName: {
      fontSize: 18,
      fontWeight: '700',
      color: PURPLE,
      marginBottom: 6,
    },
    addressLine: {
      fontSize: 13,
      color: '#4b3f3f',
    },

    colCenter: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: isMobile ? 'flex-start' : 'center',
      gap: 18,
    },
    navItem: {
      fontSize: 14,
      color: PURPLE,
      fontWeight: '600',
    },
    navItemHover: {
      color: RED,
    },

  
    colRight: {
      alignItems: isMobile ? 'flex-start' : 'flex-end',
    },
    hoursTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: PURPLE,
      marginBottom: 4,
    },
    hoursLine: {
      fontSize: 13,
      color: '#4b3f3f',
    },


    divider: {
      height: 1,
      backgroundColor: 'rgba(0,0,0,0.12)',
      marginTop: 12,
      marginBottom: 8,
    },

 
    bottomArea: {
      alignItems: 'center',
      paddingBottom: 4,
    },
    bottomText: {
      fontSize: 12,
      color: '#4b3f3f',
      textAlign: 'center',
    },
    devLine: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 2,
    },
    emailWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    devEmail: {
      fontSize: 12,
      color: PURPLE,
      marginLeft: 4,
      textDecorationLine: 'underline',
    },
    devEmailHover: {
      color: RED,
    },
  });

  return { styles };
}
