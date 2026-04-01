import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function DecisionCard({ decision, onPress, disabled }) {
  const getImpactoColor = () => {
    if (decision.esCryptoCompra || decision.esCryptoVenta) return '#a78bfa';
    const delta = (decision.deltaEfectivo || 0) + (decision.deltaAhorro || 0);
    if (delta > 0) return '#4ade80';
    if (delta < 0) return '#f87171';
    return '#9ca3af';
  };

  const getImpactoTexto = () => {
    const partes = [];
    if (decision.esCryptoCompra) partes.push(`-$${decision.montoCryptoCompra} → 🪙 BC`);
    else if (decision.esCryptoVenta) partes.push(`-${decision.cantidadVenta} BC → 💵`);
    else if (decision.esCryptoCompraDesdeAhorro) partes.push(`Ahorro -$${decision.montoCryptoCompra} → 🪙 BC`);
    else {
      if (decision.deltaEfectivo) partes.push(`Efectivo ${decision.deltaEfectivo > 0 ? '+' : ''}$${decision.deltaEfectivo}`);
      if (decision.deltaAhorro) partes.push(`Ahorro ${decision.deltaAhorro > 0 ? '+' : ''}$${decision.deltaAhorro}`);
      if (decision.deltaCrypto) partes.push(`BC ${decision.deltaCrypto > 0 ? '+' : ''}${decision.deltaCrypto}`);
    }
    return partes.length ? partes.join(' · ') : 'Sin cambio financiero';
  };

  const color = getImpactoColor();

  return (
    <TouchableOpacity
      style={[styles.card, disabled && styles.disabled, { borderColor: color + '44' }]}
      onPress={() => onPress(decision)}
      disabled={disabled}
      activeOpacity={0.75}
    >
      <View style={styles.row}>
        <View style={styles.content}>
          <Text style={styles.titulo}>{decision.titulo}</Text>
          <Text style={styles.descripcion}>{decision.descripcion}</Text>
          <View style={[styles.badge, { backgroundColor: color + '22', borderColor: color + '66' }]}>
            <Text style={[styles.badgeText, { color }]}>{getImpactoTexto()}</Text>
          </View>
        </View>
        <View style={[styles.arrow, { backgroundColor: color + '22' }]}>
          <Text style={{ color, fontSize: 18 }}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16213e',
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
  },
  disabled: {
    opacity: 0.45,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  titulo: {
    color: '#f1f5f9',
    fontSize: 15,
    fontWeight: '700',
  },
  descripcion: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 18,
  },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  arrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
