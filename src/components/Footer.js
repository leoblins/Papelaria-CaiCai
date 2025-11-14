import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BLACK = '#111111';
const WHITE = '#ffffff';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        © {year} CaiCai Papelaria — Protótipo em React Native.
      </Text>
      <Text style={styles.footerSmall}>
        Desenvolvido para estudo com Node, npm e Expo (React Native Web).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: BLACK,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  footerText: {
    color: WHITE,
    fontSize: 12,
    textAlign: 'center',
  },
  footerSmall: {
    color: '#bbbbbb',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
  },
});
