import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useGame } from '../context/GameContext';

export default function NoticiaPopup() {
  const { state, cerrarNoticia } = useGame();
  const { noticiaVisible } = state;

  if (!noticiaVisible) return null;

  const esBuena = noticiaVisible.cambioPorcentualPrecio >= 0;
  const porcentaje = Math.abs(noticiaVisible.cambioPorcentualPrecio * 100).toFixed(0);
  const color = esBuena ? '#4ade80' : '#f87171';

  return (
    <Modal transparent animationType="slide" visible={!!noticiaVisible}>
      <View style={styles.overlay}>
        <View style={[styles.card, { borderColor: color }]}>
          <Text style={styles.noticiaBadge}>📰 Noticias del Barrio</Text>
          <Text style={styles.titulo}>{noticiaVisible.titulo}</Text>
          <Text style={styles.descripcion}>{noticiaVisible.descripcion}</Text>
          <View style={[styles.impacto, { backgroundColor: color + '22' }]}>
            <Text style={[styles.impactoText, { color }]}>
              {esBuena ? '📈' : '📉'} BirriaCoin {esBuena ? '+' : '-'}{porcentaje}%
            </Text>
          </View>
          <TouchableOpacity style={[styles.btn, { backgroundColor: color }]} onPress={cerrarNoticia}>
            <Text style={styles.btnText}>Ok, entendido</Text>
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
    justifyContent: 'flex-end',
    padding: 20,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
  },
  noticiaBadge: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  titulo: {
    color: '#f1f5f9',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  descripcion: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
  },
  impacto: {
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  impactoText: {
    fontSize: 16,
    fontWeight: '700',
  },
  btn: {
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
