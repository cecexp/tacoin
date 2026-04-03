import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useGame } from '../context/GameContext';

export default function HUD() {
  const { state } = useGame();
  const { efectivoNegocio, ahorroPersonal, carteraCrypto, precioBC, diaGlobal, semanaGlobal, accionesRestantes } = state;
  const { width } = useWindowDimensions();
  const valorCrypto = carteraCrypto * precioBC;
  const TOTAL_ACCIONES = 3;

  return (
    <View style={styles.container}>
      {/* Tira de azulejos arriba */}
      <View style={styles.tileStrip}>
        {Array.from({ length: Math.ceil(width / 30) + 1 }).map((_, i) => (
          <View key={i} style={[styles.tile, { backgroundColor: i % 2 === 0 ? '#f5f2eb' : '#ede9e0' }]} />
        ))}
      </View>

      <View style={styles.inner}>

        {/* Fila 1: Día + Semana */}
        <View style={styles.topRow}>
          <View style={styles.diaWrap}>
            <Text style={styles.diaIcon}>📅</Text>
            <View>
              <Text style={styles.diaNum}>Día {diaGlobal}</Text>
              <Text style={styles.semanaLabel}>Semana {semanaGlobal}</Text>
            </View>
          </View>

          {/* Acciones restantes — más visual */}
          <View style={styles.accionesWrap}>
            <Text style={styles.accionesTitle}>Acciones</Text>
            <View style={styles.accionesDots}>
              {Array.from({ length: TOTAL_ACCIONES }).map((_, i) => (
                <View key={i} style={[
                  styles.accionDot,
                  i < accionesRestantes ? styles.accionActiva : styles.accionUsada,
                ]}>
                  {i < accionesRestantes
                    ? <Text style={styles.accionCheckActivo}>●</Text>
                    : <Text style={styles.accionCheckUsado}>✓</Text>
                  }
                </View>
              ))}
            </View>
            <Text style={styles.accionesNum}>
              {accionesRestantes} de {TOTAL_ACCIONES} restantes
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Fila 2: 4 cards financieras */}
        <View style={styles.cards}>
          <FinanceCard
            icon="💵"
            label="Efectivo del negocio"
            value={`$${efectivoNegocio.toFixed(0)}`}
            color="#4a9e4a"
            helpText="Dinero para operar"
          />
          <FinanceCard
            icon="🏦"
            label="Ahorro personal"
            value={`$${ahorroPersonal.toFixed(0)}`}
            color="#1a6fb5"
            helpText="Fondo de emergencia"
          />
          <FinanceCard
            icon="🪙"
            label="BirriaCoin"
            value={`${carteraCrypto.toFixed(2)} BC`}
            sub={`≈ $${valorCrypto.toFixed(0)}`}
            color="#b5820a"
            helpText="Tu cripto"
          />
          <FinanceCard
            icon="📈"
            label="Precio BC"
            value={`$${precioBC.toFixed(2)}`}
            color="#8b1a1a"
            helpText="Por moneda"
          />
        </View>
      </View>
    </View>
  );
}

function FinanceCard({ icon, label, value, sub, color, helpText }) {
  return (
    <View style={[styles.card, { borderTopColor: color }]}>
      <View style={styles.cardTopRow}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <Text style={[styles.cardValue, { color }]}>{value}</Text>
      </View>
      {sub && <Text style={[styles.cardSub, { color }]}>{sub}</Text>}
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardHelp}>{helpText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#d8d2c4',
    paddingTop: 44,
    shadowColor: '#8c7c6e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  tileStrip: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: 44, flexDirection: 'row', overflow: 'hidden',
  },
  tile: { width: 30, height: 44, borderWidth: 0.5, borderColor: '#d8d2c4' },

  inner: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 12 },

  // Fila superior
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  diaWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  diaIcon: { fontSize: 26 },
  diaNum:  { fontSize: 20, fontWeight: '800', color: '#8b1a1a', lineHeight: 24 },
  semanaLabel: { fontSize: 11, color: '#8c7c6e', fontStyle: 'italic' },

  // Acciones
  accionesWrap: { alignItems: 'flex-end', gap: 3 },
  accionesTitle: { fontSize: 10, color: '#8c7c6e', fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  accionesDots: { flexDirection: 'row', gap: 6 },
  accionDot: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2,
  },
  accionActiva: { backgroundColor: '#fdf0ec', borderColor: '#8b1a1a' },
  accionUsada:  { backgroundColor: '#f0ece6', borderColor: '#d8d2c4' },
  accionCheckActivo: { color: '#8b1a1a', fontSize: 14, fontWeight: '800' },
  accionCheckUsado:  { color: '#b8b0a4', fontSize: 12 },
  accionesNum: { fontSize: 10, color: '#8c7c6e' },

  divider: { height: 1, backgroundColor: '#ede9e0', marginBottom: 10 },

  // Cards
  cards: { flexDirection: 'row', gap: 8 },
  card: {
    flex: 1,
    backgroundColor: '#faf8f5',
    borderRadius: 10,
    borderTopWidth: 3,
    borderWidth: 1,
    borderColor: '#e8e0d4',
    padding: 8,
    gap: 1,
  },
  cardTopRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardIcon:    { fontSize: 13 },
  cardValue:   { fontSize: 13, fontWeight: '800' },
  cardSub:     { fontSize: 10, fontWeight: '600', opacity: 0.8 },
  cardLabel:   { fontSize: 9,  color: '#6b5c54', fontWeight: '700', marginTop: 2 },
  cardHelp:    { fontSize: 8,  color: '#a89880', fontStyle: 'italic' },
});
