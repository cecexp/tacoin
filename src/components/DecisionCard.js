import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function DecisionCard({ decision, onPress, disabled }) {
  const getColor = () => {
    if (decision.esCryptoCompra || decision.esCryptoVenta) return '#8b1a1a';
    const delta = (decision.deltaEfectivo || 0) + (decision.deltaAhorro || 0);
    if (delta > 0) return '#4a9e4a';
    if (delta < 0) return '#c0392b';
    return '#8c7c6e';
  };

  const getImpacto = () => {
    const p = [];
    if (decision.esCryptoCompra)           p.push(`-$${decision.montoCryptoCompra} → 🪙 BC`);
    else if (decision.esCryptoVenta)       p.push(`-${decision.cantidadVenta} BC → 💵`);
    else if (decision.esCryptoCompraDesdeAhorro) p.push(`Ahorro -$${decision.montoCryptoCompra} → 🪙 BC`);
    else {
      if (decision.deltaEfectivo) p.push(`Efectivo ${decision.deltaEfectivo > 0 ? '+' : ''}$${decision.deltaEfectivo}`);
      if (decision.deltaAhorro)   p.push(`Ahorro ${decision.deltaAhorro > 0 ? '+' : ''}$${decision.deltaAhorro}`);
      if (decision.deltaCrypto)   p.push(`BC ${decision.deltaCrypto > 0 ? '+' : ''}${decision.deltaCrypto}`);
    }
    return p.length ? p.join(' · ') : 'Sin cambio financiero';
  };

  const color = getColor();

  return (
    <TouchableOpacity
      style={[styles.card, disabled && styles.disabled, { borderLeftColor: color }]}
      onPress={() => onPress(decision)}
      disabled={disabled}
      activeOpacity={0.78}
    >
      <View style={styles.row}>
        <View style={styles.content}>
          <Text style={styles.titulo}>{decision.titulo}</Text>
          <Text style={styles.descripcion}>{decision.descripcion}</Text>
          <View style={[styles.badge, { backgroundColor: color + '18', borderColor: color + '55' }]}>
            <Text style={[styles.badgeText, { color }]}>{getImpacto()}</Text>
          </View>
        </View>
        <View style={[styles.arrow, { backgroundColor: color + '15', borderColor: color + '44' }]}>
          <Text style={{ color, fontSize: 20, fontWeight: '700' }}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e8e0d4',
    borderLeftWidth: 4,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#8c7c6e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  disabled: { opacity: 0.45 },
  row:     { flexDirection: 'row', alignItems: 'center', gap: 12 },
  content: { flex: 1, gap: 5 },
  titulo:      { color: '#3a1a0a', fontSize: 15, fontWeight: '700' },
  descripcion: { color: '#6b5c54', fontSize: 13, lineHeight: 18 },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 4,
  },
  badgeText: { fontSize: 11, fontWeight: '700' },
  arrow: {
    width: 34, height: 34, borderRadius: 17,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1,
  },
});
