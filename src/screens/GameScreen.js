import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import { useGame } from '../context/GameContext';
import { GAME_CONFIG } from '../data/gameData';
import HUD from '../components/HUD';
import DecisionCard from '../components/DecisionCard';
import EducationPopup from '../components/EducationPopup';
import NoticiaPopup from '../components/NoticiaPopup';

export default function GameScreen() {
  const { state, aplicarDecision, forzarFinDeDia } = useGame();
  const { decisionesDelDia, accionesRestantes, diaGlobal, noticiaVisible, popupConsejo } = state;

  const puedeDecidir = accionesRestantes > 0 && !noticiaVisible && !popupConsejo;

  return (
    <SafeAreaView style={styles.safe}>
      <HUD />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.dayHeader}>
          <Text style={styles.dayTitle}>🌮 Día {diaGlobal} — Toma tus decisiones</Text>
          <View style={styles.acciones}>
            {Array.from({ length: GAME_CONFIG.accionesFinancierasPorDia }).map((_, i) => (
              <View
                key={i}
                style={[styles.accionDot, i < accionesRestantes ? styles.accionActiva : styles.accionUsada]}
              />
            ))}
          </View>
          <Text style={styles.accionesLabel}>
            {accionesRestantes} acción{accionesRestantes !== 1 ? 'es' : ''} restante{accionesRestantes !== 1 ? 's' : ''}
          </Text>
        </View>

        {decisionesDelDia.map((decision) => (
          <DecisionCard
            key={decision.id}
            decision={decision}
            onPress={aplicarDecision}
            disabled={!puedeDecidir}
          />
        ))}

        {accionesRestantes > 0 && (
          <TouchableOpacity
            style={styles.btnCerrar}
            onPress={forzarFinDeDia}
            disabled={!puedeDecidir}
          >
            <Text style={styles.btnCerrarText}>🌙 Cerrar el puesto (terminar día)</Text>
          </TouchableOpacity>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>

      <NoticiaPopup />
      <EducationPopup />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  scroll: { flex: 1 },
  content: { padding: 16 },
  dayHeader: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  dayTitle: { color: '#f1f5f9', fontSize: 17, fontWeight: '700', marginBottom: 12 },
  acciones: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  accionDot: { width: 12, height: 12, borderRadius: 6 },
  accionActiva: { backgroundColor: '#f97316' },
  accionUsada: { backgroundColor: '#334155' },
  accionesLabel: { color: '#64748b', fontSize: 12 },
  btnCerrar: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    borderStyle: 'dashed',
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnCerrarText: { color: '#64748b', fontSize: 14, fontWeight: '500' },
});
