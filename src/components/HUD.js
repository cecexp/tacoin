import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useGame } from '../context/GameContext';

export default function HUD() {
  const { state } = useGame();
  const { efectivoNegocio, ahorroPersonal, carteraCrypto, precioBC, diaGlobal, semanaGlobal } = state;
  const { width } = useWindowDimensions();
  const valorCrypto = carteraCrypto * precioBC;

  return (
    <View style={styles.container}>
      {/* Tira de azulejos */}
      <View style={styles.tileStrip}>
        {Array.from({ length: Math.ceil(width / 30) + 1 }).map((_, i) => (
          <View key={i} style={[styles.tile, { backgroundColor: i % 2 === 0 ? '#f5f2eb' : '#ede9e0' }]} />
        ))}
      </View>

      <View style={styles.inner}>
        {/* Encabezado día / semana */}
        <View style={styles.header}>
          <Text style={styles.dayLabel}>📅 Día {diaGlobal}</Text>
          <Text style={styles.weekLabel}>Semana {semanaGlobal}</Text>
        </View>

        {/* Cards financieras */}
        <View style={styles.cards}>
          <FinanceCard icon="💵" label="Efectivo" value={`$${efectivoNegocio.toFixed(0)}`} color="#4a9e4a" />
          <FinanceCard icon="🏦" label="Ahorro"   value={`$${ahorroPersonal.toFixed(0)}`}  color="#1a6fb5" />
          <FinanceCard icon="🪙" label="BC"        value={`${carteraCrypto.toFixed(2)}`}    sub={`≈$${valorCrypto.toFixed(0)}`} color="#b5820a" />
          <FinanceCard icon="📈" label="Precio"   value={`$${precioBC.toFixed(2)}`}         color="#8b1a1a" />
        </View>
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
    backgroundColor: '#f5f2eb',
    borderBottomWidth: 1,
    borderBottomColor: '#d8d2c4',
    paddingTop: 44,
  },
  tileStrip: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 44,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  tile: { width: 30, height: 44, borderWidth: 0.5, borderColor: '#d8d2c4' },
  inner: { paddingHorizontal: 16, paddingVertical: 12 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayLabel:  { color: '#8b1a1a', fontSize: 17, fontWeight: '800' },
  weekLabel: { color: '#8c7c6e', fontSize: 13, fontStyle: 'italic' },
  cards: { flexDirection: 'row', gap: 8 },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderLeftWidth: 3,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e8e0d4',
  },
  cardIcon:  { fontSize: 13 },
  cardLabel: { color: '#a89880', fontSize: 9, marginTop: 2 },
  cardValue: { fontSize: 12, fontWeight: '800', marginTop: 2 },
  cardSub:   { color: '#a89880', fontSize: 9, marginTop: 1 },
});
