import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';

export default function HUD() {
  const { state } = useGame();
  const { efectivoNegocio, ahorroPersonal, carteraCrypto, precioBC, diaGlobal, semanaGlobal } = state;
  const valorCryptoEnPesos = carteraCrypto * precioBC;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dayLabel}>📅 Día {diaGlobal}</Text>
        <Text style={styles.weekLabel}>Semana {semanaGlobal}</Text>
      </View>
      <View style={styles.cards}>
        <FinanceCard icon="💵" label="Efectivo" value={`$${efectivoNegocio.toFixed(0)}`} color="#4ade80" />
        <FinanceCard icon="🏦" label="Ahorro" value={`$${ahorroPersonal.toFixed(0)}`} color="#60a5fa" />
        <FinanceCard icon="🪙" label="BC" value={`${carteraCrypto.toFixed(2)}`} sub={`≈$${valorCryptoEnPesos.toFixed(0)}`} color="#fbbf24" />
        <FinanceCard icon="📈" label="Precio" value={`$${precioBC.toFixed(2)}`} color="#a78bfa" />
      </View>
    </View>
  );
}

function FinanceCard({ icon, label, value, sub, color }) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.cardIcon}>{icon}</Text>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={[styles.cardValue, { color }]}>{value}</Text>
      {sub ? <Text style={styles.cardSub}>{sub}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    paddingBottom: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2d2d4e',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  dayLabel: { color: '#f97316', fontSize: 18, fontWeight: '700' },
  weekLabel: { color: '#9ca3af', fontSize: 14 },
  cards: { flexDirection: 'row', gap: 8 },
  card: { flex: 1, backgroundColor: '#16213e', borderRadius: 10, borderLeftWidth: 3, padding: 8 },
  cardIcon: { fontSize: 14 },
  cardLabel: { color: '#6b7280', fontSize: 9, marginTop: 2 },
  cardValue: { fontSize: 12, fontWeight: '700', marginTop: 2 },
  cardSub: { color: '#6b7280', fontSize: 9, marginTop: 1 },
});
