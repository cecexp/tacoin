import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { useGame } from '../context/GameContext';
import HUD from '../components/HUD';
import DecisionCard from '../components/DecisionCard';
import EducationPopup from '../components/EducationPopup';
import NoticiaPopup from '../components/NoticiaPopup';

function TileBackground({ width, height }) {
  const TILE = 60;
  const cols = Math.ceil(width / TILE) + 1;
  const rows = Math.ceil(height / TILE) + 1;
  const tiles = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      tiles.push(<View key={`${r}-${c}`} style={{ width: TILE, height: TILE, backgroundColor: (r + c) % 2 === 0 ? '#f5f2eb' : '#ede9e0', borderWidth: 0.8, borderColor: '#d8d2c4' }} />);
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{tiles}</View>
    </View>
  );
}

export default function GameScreen() {
  const { state, aplicarDecision, forzarFinDeDia } = useGame();
  const { decisionesDelDia, accionesRestantes, diaGlobal, noticiaVisible, popupConsejo } = state;
  const { width, height } = useWindowDimensions();
  const puedeDecidir = accionesRestantes > 0 && !noticiaVisible && !popupConsejo;

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f2eb' }}>
      <TileBackground width={width} height={height} />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(248,245,238,0.5)' }]} />

      <HUD />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>

        {/* Header del día */}
        <View style={styles.dayHeader}>
          <Text style={styles.dayTitle}>🌮 Día {diaGlobal} — Toma tus decisiones</Text>
          <View style={styles.accionesRow}>
            {Array.from({ length: 3 }).map((_, i) => (
              <View key={i} style={[styles.dot, i < accionesRestantes ? styles.dotActiva : styles.dotUsada]} />
            ))}
          </View>
          <Text style={styles.accionesLabel}>
            {accionesRestantes} acción{accionesRestantes !== 1 ? 'es' : ''} restante{accionesRestantes !== 1 ? 's' : ''}
          </Text>
        </View>

        {/* Decisiones */}
        {decisionesDelDia.map((decision) => (
          <DecisionCard
            key={decision.id}
            decision={decision}
            onPress={aplicarDecision}
            disabled={!puedeDecidir}
          />
        ))}

        {/* Cerrar puesto */}
        {accionesRestantes > 0 && (
          <TouchableOpacity style={styles.btnCerrar} onPress={forzarFinDeDia} disabled={!puedeDecidir}>
            <Text style={styles.btnCerrarText}>🌙 Cerrar el puesto (terminar día)</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      <NoticiaPopup />
      <EducationPopup />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, maxWidth: 600, alignSelf: 'center', width: '100%' },
  dayHeader: {
    marginBottom: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#d8d2c4',
  },
  dayTitle:    { color: '#3a1a0a', fontSize: 17, fontWeight: '800', marginBottom: 10 },
  accionesRow: { flexDirection: 'row', gap: 8, marginBottom: 5 },
  dot:         { width: 12, height: 12, borderRadius: 6 },
  dotActiva:   { backgroundColor: '#8b1a1a' },
  dotUsada:    { backgroundColor: '#d8d2c4' },
  accionesLabel: { color: '#8c7c6e', fontSize: 12, fontStyle: 'italic' },
  btnCerrar: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#d8d2c4',
    borderStyle: 'dashed',
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  btnCerrarText: { color: '#8c7c6e', fontSize: 14, fontWeight: '500' },
});
