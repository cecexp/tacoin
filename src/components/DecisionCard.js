import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function DecisionCard({ decision, onPress, disabled, efectivoActual = 0, ahorroActual = 0 }) {
  
  // Lógica de validación de dinero
  const costoEfectivo = Math.abs(decision.deltaEfectivo < 0 ? decision.deltaEfectivo : 0);
  const costoAhorro = Math.abs(decision.deltaAhorro < 0 ? decision.deltaAhorro : 0);
  const costoCryptoEfectivo = decision.esCryptoCompra ? (decision.montoCryptoCompra || 0) : 0;
  const costoCryptoAhorro = decision.esCryptoCompraDesdeAhorro ? (decision.montoCryptoCompra || 0) : 0;

 // LÓGICA FLEXIBLE: Suma total de ambos bolsillos
 const costoTotalNecesario = costoEfectivo + costoAhorro + costoCryptoEfectivo + costoCryptoAhorro;
 const capitalTotal = efectivoActual + ahorroActual;
 const tieneDinero = capitalTotal >= costoTotalNecesario;

  const isLocked = disabled || !tieneDinero;

  const getColor = () => {
    if (!tieneDinero) return '#94a3b8';
    if (decision.esCryptoCompra || decision.esCryptoVenta || decision.esCryptoCompraDesdeAhorro) return '#8b1a1a';
    const delta = (decision.deltaEfectivo || 0) + (decision.deltaAhorro || 0);
    if (delta > 0) return '#4a9e4a';
    if (delta < 0) return '#c0392b';
    return '#8c7c6e';
  };

  const getImpacto = () => {
    if (!tieneDinero) return { label: 'FONDOS INSUFICIENTES', sub: 'No tienes capital para esta acción', icon: '❌' };
    if (decision.esCryptoCompra) return { label: `Inviertes $${decision.montoCryptoCompra}`, sub: 'a cambio de BirriaCoin', icon: '🪙' };
    if (decision.esCryptoVenta) return { label: `Vendes ${decision.cantidadVenta} BC`, sub: 'recibes pesos', icon: '💵' };
    if (decision.esCryptoCompraDesdeAhorro) return { label: `Del ahorro: $${decision.montoCryptoCompra}`, sub: 'a BirriaCoin', icon: '🪙' };
    
    const parts = [];
    if (decision.deltaEfectivo) parts.push(`Efec. ${decision.deltaEfectivo > 0 ? '+' : ''}$${decision.deltaEfectivo}`);
    if (decision.deltaAhorro) parts.push(`Ahorro ${decision.deltaAhorro > 0 ? '+' : ''}$${decision.deltaAhorro}`);
    return parts.length ? { label: parts.join('  ·  '), sub: 'impacto financiero', icon: parts[0].includes('+') ? '📈' : '📉' } 
                        : { label: 'Sin cambio', sub: 'no afecta tus números', icon: '➖' };
  };

  const color = getColor();
  const impacto = getImpacto();

  return (
    <TouchableOpacity
      style={[styles.card, isLocked && styles.disabled, { borderLeftColor: color }]}
      onPress={() => onPress(decision)}
      disabled={isLocked}
      activeOpacity={0.78}
    >
      <View style={[styles.tipoBadge, { backgroundColor: tieneDinero ? color : '#94a3b8' }]}>
        <Text style={styles.tipoText}>{!tieneDinero ? 'BLOQUEADO' : 'ACCIÓN'}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.content}>
          <Text style={[styles.titulo, !tieneDinero && { color: '#94a3b8' }]}>{decision.titulo}</Text>
          <Text style={styles.descripcion}>{decision.descripcion}</Text>
          <View style={[styles.impactoRow, { backgroundColor: color + '12', borderColor: color + '40' }]}>
            <Text style={styles.impactoIcon}>{impacto.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.impactoLabel, { color }]}>{impacto.label}</Text>
              <Text style={styles.impactoSub}>{impacto.sub}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.arrow, { backgroundColor: color + '15', borderColor: color + '40' }]}>
          <Text style={{ color, fontSize: 18 }}>{tieneDinero ? '›' : '🔒'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#e8e0d4', borderLeftWidth: 5, padding: 14, marginBottom: 10, elevation: 2 },
  disabled: { opacity: 0.6 },
  tipoBadge: { alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2, marginBottom: 8 },
  tipoText: { color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  content: { flex: 1, gap: 4 },
  titulo: { color: '#3a1a0a', fontSize: 15, fontWeight: '800' },
  descripcion: { color: '#6b5c54', fontSize: 12, lineHeight: 16 },
  impactoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5, marginTop: 4 },
  impactoIcon: { fontSize: 14 },
  impactoLabel: { fontSize: 11, fontWeight: '700' },
  impactoSub: { fontSize: 9, color: '#8c7c6e' },
  arrow: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
});