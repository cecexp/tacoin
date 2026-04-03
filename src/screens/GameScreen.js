import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions,
} from 'react-native';
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
      tiles.push(<View key={`${r}-${c}`} style={{
        width: TILE, height: TILE,
        backgroundColor: (r + c) % 2 === 0 ? '#f5f2eb' : '#ede9e0',
        borderWidth: 0.8, borderColor: '#d8d2c4',
      }} />);
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{tiles}</View>
    </View>
  );
}

export default function GameScreen() {
  const { state, aplicarDecision, forzarFinDeDia } = useGame();
  const { decisionesDelDia, accionesRestantes, diaGlobal, semanaGlobal, noticiaVisible, popupConsejo } = state;
  const { width, height } = useWindowDimensions();

  const puedeDecidir = accionesRestantes > 0 && !noticiaVisible && !popupConsejo;

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f2eb' }}>
      <TileBackground width={width} height={height} />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(248,245,238,0.5)' }]} />

      <HUD />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={[styles.content, { maxWidth: 600, alignSelf: 'center', width: '100%' }]}>

        {/* Banner del día */}
        <View style={styles.dayBanner}>
          <View style={styles.dayBannerLeft}>
            <Text style={styles.dayBannerTitle}>🌮 Día {diaGlobal} — Semana {semanaGlobal}</Text>
            <Text style={styles.dayBannerSub}>
              Elige una acción financiera. Cada decisión afecta tu negocio.
            </Text>
          </View>
        </View>

        {/* Instrucción contextual */}
        <View style={styles.instruccion}>
          <Text style={styles.instruccionIcon}>👇</Text>
          <Text style={styles.instruccionText}>
            {accionesRestantes === 3
              ? 'Tienes 3 acciones hoy. ¡Elige con cuidado!'
              : accionesRestantes === 2
                ? '2 acciones restantes. Sigue tomando decisiones.'
                : accionesRestantes === 1
                  ? '¡Última acción del día! Elige bien.'
                  : 'Día terminado. Mañana sigues.'}
          </Text>
        </View>

        {/* Decisiones */}
        <Text style={styles.sectionTitle}>¿Qué haces hoy?</Text>

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
          <TouchableOpacity
            style={[styles.btnCerrar, !puedeDecidir && { opacity: 0.4 }]}
            onPress={forzarFinDeDia}
            disabled={!puedeDecidir}
          >
            <Text style={styles.btnCerrarIcon}>🌙</Text>
            <View>
              <Text style={styles.btnCerrarTitle}>Cerrar el puesto</Text>
              <Text style={styles.btnCerrarSub}>Termina el día sin usar todas tus acciones</Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={{ height: 48 }} />
      </ScrollView>

      <NoticiaPopup />
      <EducationPopup />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 14 },

  // Banner del día
  dayBanner: {
    backgroundColor: '#8b1a1a',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayBannerLeft: { flex: 1 },
  dayBannerTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 3 },
  dayBannerSub:   { color: 'rgba(255,255,255,0.75)', fontSize: 12, lineHeight: 17 },

  // Instrucción contextual
  instruccion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8e0d4',
    padding: 10,
    marginBottom: 14,
  },
  instruccionIcon: { fontSize: 18 },
  instruccionText: { flex: 1, fontSize: 13, color: '#4a3228', fontWeight: '500', lineHeight: 18 },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#8c7c6e',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 10,
  },

  // Botón cerrar puesto
  btnCerrar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#d8d2c4',
    borderStyle: 'dashed',
    padding: 14,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  btnCerrarIcon:  { fontSize: 24 },
  btnCerrarTitle: { fontSize: 14, fontWeight: '700', color: '#6b5c54' },
  btnCerrarSub:   { fontSize: 11, color: '#a89880', marginTop: 1 },
});
