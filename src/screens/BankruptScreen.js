import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';

export default function BankruptScreen() {
  const { state, reiniciar } = useGame();

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>😭</Text>
      <Text style={styles.titulo}>¡Bancarrota!</Text>
      <Text style={styles.subtitulo}>
        Se te acabó el efectivo y el ahorro...{'\n'}
        Pero el conocimiento financiero que ganaste{'\n'}
        ¡ya nadie te lo quita!
      </Text>
      <View style={styles.stats}>
        <Text style={styles.stat}>📅 Llegaste al día {state.diaGlobal}</Text>
        <Text style={styles.stat}>📊 Semana {state.semanaGlobal}</Text>
        <Text style={styles.stat}>🪙 {state.historial.length} decisiones tomadas</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={reiniciar}>
        <Text style={styles.btnText}>🌮 Volver a empezar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emoji: { fontSize: 72, marginBottom: 20 },
  titulo: {
    color: '#f87171',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 16,
  },
  subtitulo: {
    color: '#94a3b8',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  stats: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    gap: 10,
    marginBottom: 32,
  },
  stat: { color: '#cbd5e1', fontSize: 15 },
  btn: {
    backgroundColor: '#f97316',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 40,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
