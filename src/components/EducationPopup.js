import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';

export default function EducationPopup() {
  const { state, cerrarPopup } = useGame();
  const { popupConsejo } = state;

  if (!popupConsejo) return null;

  return (
    <Modal transparent animationType="fade" visible={!!popupConsejo}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconRow}>
            <Text style={styles.icon}>💡</Text>
          </View>
          <Text style={styles.titulo}>{popupConsejo.titulo}</Text>
          <View style={styles.divider} />
          <Text style={styles.consejo}>{popupConsejo.consejo}</Text>
          <TouchableOpacity style={styles.btn} onPress={cerrarPopup}>
            <Text style={styles.btnText}>¡Entendido!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000cc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 28,
    width: '100%',
    maxWidth: 380,
    borderWidth: 1,
    borderColor: '#f97316',
    alignItems: 'center',
  },
  iconRow: {
    backgroundColor: '#f9731622',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: { fontSize: 28 },
  titulo: {
    color: '#f97316',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#334155',
    marginBottom: 14,
  },
  consejo: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  btn: {
    backgroundColor: '#f97316',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
