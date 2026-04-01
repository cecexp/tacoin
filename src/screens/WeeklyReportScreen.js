import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useGame } from '../context/GameContext';

export default function WeeklyReportScreen() {
  const { state, cerrarReporteSemanal } = useGame();
  const { resumenSemana } = state;

  if (!resumenSemana) return null;

  const { semanaGlobal, totalDecisiones, totalRecomendadas, totalNoRecomendadas, porcentajeRecomendadas } = resumenSemana;
  const pct = Math.round(porcentajeRecomendadas * 100);

  const getMedalla = () => {
    if (pct >= 80) return { emoji: '🥇', label: 'Empresario estrella', color: '#fbbf24' };
    if (pct >= 60) return { emoji: '🥈', label: 'Buen emprendedor', color: '#94a3b8' };
    if (pct >= 40) return { emoji: '🥉', label: 'En proceso', color: '#cd7c3b' };
    return { emoji: '📉', label: 'Necesitas mejorar', color: '#f87171' };
  };

  const medalla = getMedalla();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Reporte Semanal</Text>
      <Text style={styles.subtitulo}>Semana {semanaGlobal} completada 🎉</Text>

      {/* Medalla */}
      <View style={[styles.medallaCard, { borderColor: medalla.color }]}>
        <Text style={styles.medallaEmoji}>{medalla.emoji}</Text>
        <Text style={[styles.medallaLabel, { color: medalla.color }]}>{medalla.label}</Text>
        <Text style={styles.pctText}>{pct}% de decisiones acertadas</Text>
      </View>

      {/* Barra de progreso */}
      <View style={styles.barraContainer}>
        <View style={styles.barraRow}>
          <Text style={styles.barraLabel}>✅ Aciertos</Text>
          <Text style={styles.barraNum}>{totalRecomendadas}</Text>
        </View>
        <View style={styles.barraTrack}>
          <View style={[styles.barraFill, { width: `${pct}%`, backgroundColor: '#4ade80' }]} />
        </View>

        <View style={[styles.barraRow, { marginTop: 14 }]}>
          <Text style={styles.barraLabel}>❌ Errores</Text>
          <Text style={styles.barraNum}>{totalNoRecomendadas}</Text>
        </View>
        <View style={styles.barraTrack}>
          <View style={[styles.barraFill, { width: `${100 - pct}%`, backgroundColor: '#f87171' }]} />
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <StatBox label="Total decisiones" value={totalDecisiones} color="#60a5fa" />
        <StatBox label="% acierto" value={`${pct}%`} color={medalla.color} />
      </View>

      <TouchableOpacity style={styles.btn} onPress={cerrarReporteSemanal}>
        <Text style={styles.btnText}>Continuar a la Semana {semanaGlobal + 1} 🌮</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function StatBox({ label, value, color }) {
  return (
    <View style={[styles.statBox, { borderColor: color + '44' }]}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { padding: 24, paddingTop: 60 },
  titulo: {
    color: '#f97316',
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitulo: {
    color: '#94a3b8',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 28,
    marginTop: 4,
  },
  medallaCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    borderWidth: 2,
    padding: 28,
    alignItems: 'center',
    marginBottom: 24,
  },
  medallaEmoji: { fontSize: 52, marginBottom: 10 },
  medallaLabel: { fontSize: 20, fontWeight: '700', marginBottom: 6 },
  pctText: { color: '#94a3b8', fontSize: 14 },
  barraContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  barraRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  barraLabel: { color: '#cbd5e1', fontSize: 14, fontWeight: '600' },
  barraNum: { color: '#94a3b8', fontSize: 14 },
  barraTrack: {
    height: 10,
    backgroundColor: '#334155',
    borderRadius: 5,
    overflow: 'hidden',
  },
  barraFill: { height: '100%', borderRadius: 5 },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
    alignItems: 'center',
  },
  statValue: { fontSize: 26, fontWeight: '800', marginBottom: 4 },
  statLabel: { color: '#64748b', fontSize: 12, textAlign: 'center' },
  btn: {
    backgroundColor: '#f97316',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
