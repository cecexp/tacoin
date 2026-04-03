import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, useWindowDimensions,
} from 'react-native';

const NIVEL_INFO = [
  {
    semana: 1, icon: '🛒', titulo: 'El Arranque',
    desc: 'Tu primer día como taquero. Aprendes lo básico: vender, gastar y ahorrar.',
    recompensa: '$200 de capital inicial',
    consejo: 'Guarda al menos $100 en ahorro desde el primer día.',
    dificultad: 1, difLabel: 'Fácil', difColor: '#4a9e4a',
  },
  {
    semana: 2, icon: '🪙', titulo: 'Primeros Riesgos',
    desc: 'Se presenta BirriaCoin. Decides si entras al mundo crypto o te quedas seguro.',
    recompensa: 'Acceso a BirriaCoin',
    consejo: 'No inviertas más del 20% en crypto al inicio.',
    dificultad: 1, difLabel: 'Fácil', difColor: '#4a9e4a',
  },
  {
    semana: 3, icon: '🎪', titulo: 'Feria del Barrio',
    desc: 'Evento especial: las ventas se duplican pero los costos también suben.',
    recompensa: 'x1.5 ganancias esta semana',
    consejo: 'Reinvierte rápido, la ventana de ventas es corta.',
    dificultad: 2, difLabel: 'Normal', difColor: '#d4901a',
  },
  {
    semana: 4, icon: '📈', titulo: 'Crypto Volátil',
    desc: 'BirriaCoin sube y baja con más fuerza. Noticias del barrio casi a diario.',
    recompensa: 'Bono si tu BC vale x2',
    consejo: 'Diversifica. No pongas todo en crypto.',
    dificultad: 3, difLabel: 'Difícil', difColor: '#c0392b',
  },
  {
    semana: 5, icon: '🏪', titulo: 'La Expansión',
    desc: 'Puedes abrir un segundo punto de venta. Requiere inversión grande.',
    recompensa: 'x2 capacidad de venta',
    consejo: 'Asegúrate de tener fondo de emergencia antes de expandir.',
    dificultad: 3, difLabel: 'Difícil', difColor: '#c0392b',
  },
  {
    semana: 6, icon: '🤝', titulo: 'Inversionista',
    desc: 'Un vecino quiere invertir en tu negocio. Decide si aceptas o negocias.',
    recompensa: 'Capital x2 si negocias bien',
    consejo: 'Lee bien los términos antes de aceptar cualquier socio.',
    dificultad: 2, difLabel: 'Normal', difColor: '#d4901a',
  },
  {
    semana: 7, icon: '🏆', titulo: '¡La Gran Final!',
    desc: 'La semana más difícil. Eventos extremos, crypto en máxima volatilidad.',
    recompensa: '¡Puesto Famoso del Barrio!',
    consejo: 'Llega con ahorro, efectivo e inversiones balanceadas.',
    dificultad: 4, difLabel: 'BOSS', difColor: '#8b1a1a',
  },
];

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

// Paso 1: Recompensa
function StepRecompensa({ nivel, onNext }) {
  const scale  = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const btnFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scale,  { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
      Animated.timing(fadeIn, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.delay(300),
      Animated.timing(btnFade, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={stepStyles.container}>
      <Animated.View style={[stepStyles.iconWrap, { transform: [{ scale }] }]}>
        <View style={stepStyles.trophyBg}>
          <Text style={{ fontSize: 52 }}>🏅</Text>
        </View>
      </Animated.View>

      <Animated.View style={{ opacity: fadeIn, alignItems: 'center' }}>
        <Text style={stepStyles.label}>RECOMPENSA DE LA SEMANA</Text>
        <Text style={stepStyles.titulo}>{nivel.titulo}</Text>
        <View style={stepStyles.recompensaBox}>
          <Text style={stepStyles.recompensaIcon}>🎁</Text>
          <Text style={stepStyles.recompensaText}>{nivel.recompensa}</Text>
        </View>
        <View style={[stepStyles.difBadge, { backgroundColor: nivel.difColor + '20', borderColor: nivel.difColor + '60' }]}>
          {Array.from({ length: 4 }).map((_, i) => (
            <View key={i} style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: i < nivel.dificultad ? nivel.difColor : '#d8d2c4', marginHorizontal: 2 }} />
          ))}
          <Text style={[stepStyles.difText, { color: nivel.difColor }]}>{nivel.difLabel}</Text>
        </View>
      </Animated.View>

      <Animated.View style={{ opacity: btnFade, width: '100%' }}>
        <TouchableOpacity style={stepStyles.btnOuter} onPress={onNext} activeOpacity={0.85}>
          <View style={stepStyles.btnShadow} />
          <View style={stepStyles.btnFace}>
            <Text style={stepStyles.btnText}>Ver consejo del día  →</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// Paso 2: Consejo
function StepConsejo({ nivel, onNext }) {
  const slideY = useRef(new Animated.Value(40)).current;
  const fade   = useRef(new Animated.Value(0)).current;
  const btnFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(slideY, { toValue: 0, tension: 55, friction: 9, useNativeDriver: true }),
        Animated.timing(fade,   { toValue: 1, duration: 450, useNativeDriver: true }),
      ]),
      Animated.delay(400),
      Animated.timing(btnFade, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={stepStyles.container}>
      <Animated.View style={[{ opacity: fade, transform: [{ translateY: slideY }], alignItems: 'center', width: '100%' }]}>
        <View style={stepStyles.consejoIconWrap}>
          <Text style={{ fontSize: 42 }}>💡</Text>
        </View>
        <Text style={stepStyles.label}>CONSEJO DEL DÍA</Text>
        <Text style={stepStyles.titulo}>{nivel.titulo}</Text>
        <View style={stepStyles.consejoBox}>
          <Text style={stepStyles.consejoIcon}>{nivel.icon}</Text>
          <Text style={stepStyles.consejoDesc}>{nivel.desc}</Text>
        </View>
        <View style={stepStyles.consejoTipBox}>
          <Text style={stepStyles.consejoTip}>"{nivel.consejo}"</Text>
        </View>
      </Animated.View>

      <Animated.View style={{ opacity: btnFade, width: '100%' }}>
        <TouchableOpacity style={stepStyles.btnOuter} onPress={onNext} activeOpacity={0.85}>
          <View style={stepStyles.btnShadow} />
          <View style={stepStyles.btnFace}>
            <Text style={stepStyles.btnText}>¡Listo, a jugar! 🌮</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// Paso 3: Popup Día X Semana X
function StepDia({ nivel, dia, onFinish }) {
  const scale  = useRef(new Animated.Value(0.5)).current;
  const fade   = useRef(new Animated.Value(0)).current;
  const btnFade = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, tension: 55, friction: 8, useNativeDriver: true }),
        Animated.timing(fade,  { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      Animated.delay(200),
      Animated.timing(btnFade, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.06, duration: 700, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,    duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={stepStyles.container}>
      <Animated.View style={{ opacity: fade, transform: [{ scale }], alignItems: 'center', width: '100%' }}>
        {/* Círculo grande animado */}
        <Animated.View style={[stepStyles.diaCircleOuter, { transform: [{ scale: pulseAnim }] }]}>
          <View style={stepStyles.diaCircleInner}>
            <Text style={stepStyles.diaIcon}>{nivel.icon}</Text>
          </View>
        </Animated.View>

        <Text style={stepStyles.diaLabel}>¡COMIENZA!</Text>

        <View style={stepStyles.diaInfoRow}>
          <View style={stepStyles.diaInfoBox}>
            <Text style={stepStyles.diaInfoNum}>Día {dia}</Text>
            <Text style={stepStyles.diaInfoSub}>Jornada</Text>
          </View>
          <View style={stepStyles.diaInfoDivider} />
          <View style={stepStyles.diaInfoBox}>
            <Text style={stepStyles.diaInfoNum}>Semana {nivel.semana}</Text>
            <Text style={stepStyles.diaInfoSub}>Nivel</Text>
          </View>
        </View>

        <Text style={stepStyles.diaNivelNombre}>{nivel.titulo}</Text>
      </Animated.View>

      <Animated.View style={{ opacity: btnFade, width: '100%' }}>
        <TouchableOpacity style={stepStyles.btnOuter} onPress={onFinish} activeOpacity={0.85}>
          <View style={stepStyles.btnShadow} />
          <View style={stepStyles.btnFace}>
            <Text style={stepStyles.btnText}>▶  ¡Empezar Día {dia}!</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

export default function LevelIntroScreen({ semana = 1, dia = 1, onFinish }) {
  const { width, height } = useWindowDimensions();
  const [step, setStep] = useState(0); // 0=recompensa, 1=consejo, 2=dia
  const nivel = NIVEL_INFO[Math.min(semana - 1, NIVEL_INFO.length - 1)];

  // Fade entre pasos
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const goToStep = (next) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(() => {
      setStep(next);
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f2eb' }}>
      <TileBackground width={width} height={height} />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(248,245,238,0.55)' }]} />

      {/* Indicador de pasos */}
      <View style={stepStyles.stepsIndicator}>
        {['🎁', '💡', '📅'].map((icon, i) => (
          <View key={i} style={[
            stepStyles.stepDot,
            i === step && stepStyles.stepDotActive,
            i < step  && stepStyles.stepDotDone,
          ]}>
            <Text style={{ fontSize: i === step ? 14 : 10, opacity: i <= step ? 1 : 0.4 }}>{icon}</Text>
          </View>
        ))}
      </View>

      <Animated.View style={[stepStyles.card, { opacity: fadeAnim, maxWidth: Math.min(width - 32, 420), alignSelf: 'center', width: '100%' }]}>
        {/* Tira de azulejos */}
        <View style={stepStyles.tileStrip}>
          {Array.from({ length: 24 }).map((_, i) => (
            <View key={i} style={[stepStyles.tile, { backgroundColor: i % 2 === 0 ? '#f5f2eb' : '#ede9e0' }]} />
          ))}
        </View>

        <View style={stepStyles.cardBody}>
          {step === 0 && <StepRecompensa nivel={nivel} onNext={() => goToStep(1)} />}
          {step === 1 && <StepConsejo    nivel={nivel} onNext={() => goToStep(2)} />}
          {step === 2 && <StepDia        nivel={nivel} dia={dia} onFinish={onFinish} />}
        </View>
      </Animated.View>
    </View>
  );
}

const stepStyles = StyleSheet.create({
  stepsIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingTop: 56,
    paddingBottom: 16,
  },
  stepDot: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1.5, borderColor: '#d8d2c4',
    alignItems: 'center', justifyContent: 'center',
  },
  stepDotActive: { borderColor: '#8b1a1a', borderWidth: 2.5, backgroundColor: '#fdf0ec' },
  stepDotDone:   { backgroundColor: '#8b1a1a', borderColor: '#6b1212' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 24, overflow: 'hidden',
    borderWidth: 2, borderColor: '#8b1a1a',
    marginHorizontal: 16,
    shadowColor: '#8b1a1a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 16,
    elevation: 10,
  },
  tileStrip: { flexDirection: 'row', height: 8 },
  tile: { flex: 1, borderWidth: 0.5, borderColor: '#d8d2c4' },
  cardBody: { padding: 24, paddingBottom: 28 },

  container: { alignItems: 'center', gap: 16 },

  // Paso 1 — Recompensa
  iconWrap: { marginBottom: 4 },
  trophyBg: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#fdf0ec',
    borderWidth: 3, borderColor: '#e8c4b8',
    alignItems: 'center', justifyContent: 'center',
  },
  label: {
    fontSize: 11, fontWeight: '800', letterSpacing: 2,
    color: '#8c7c6e', textTransform: 'uppercase', marginBottom: 4,
  },
  titulo: { fontSize: 22, fontWeight: '800', color: '#3a1a0a', textAlign: 'center', marginBottom: 12 },
  recompensaBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fdf0ec', borderRadius: 14,
    borderWidth: 1.5, borderColor: '#e8c4b8',
    padding: 14, width: '100%', marginBottom: 12,
  },
  recompensaIcon: { fontSize: 24 },
  recompensaText: { fontSize: 16, fontWeight: '700', color: '#8b1a1a', flex: 1 },
  difBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderRadius: 20, borderWidth: 1.5,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  difText: { fontSize: 12, fontWeight: '700', marginLeft: 4 },

  // Paso 2 — Consejo
  consejoIconWrap: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#fffbeb',
    borderWidth: 2, borderColor: '#fde68a',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 4,
  },
  consejoBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    backgroundColor: '#fdf0ec', borderRadius: 12,
    borderWidth: 1, borderColor: '#e8c4b8',
    padding: 14, width: '100%',
  },
  consejoIcon: { fontSize: 22 },
  consejoDesc: { flex: 1, fontSize: 13, color: '#4a3228', lineHeight: 20 },
  consejoTipBox: {
    backgroundColor: '#fffbeb', borderRadius: 12,
    borderWidth: 1.5, borderColor: '#fde68a',
    padding: 14, width: '100%',
  },
  consejoTip: { fontSize: 14, fontStyle: 'italic', color: '#78520a', lineHeight: 21, textAlign: 'center' },

  // Paso 3 — Día
  diaCircleOuter: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: '#fdf0ec',
    borderWidth: 4, borderColor: '#8b1a1a',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#8b1a1a', shadowOpacity: 0.3, shadowRadius: 16, shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  diaCircleInner: { alignItems: 'center', justifyContent: 'center' },
  diaIcon: { fontSize: 46 },
  diaLabel: {
    fontSize: 13, fontWeight: '800', letterSpacing: 3,
    color: '#8b1a1a', marginBottom: 16,
  },
  diaInfoRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fdf0ec', borderRadius: 16,
    borderWidth: 1.5, borderColor: '#e8c4b8',
    padding: 16, width: '100%', marginBottom: 12,
  },
  diaInfoBox: { flex: 1, alignItems: 'center' },
  diaInfoNum: { fontSize: 18, fontWeight: '800', color: '#3a1a0a' },
  diaInfoSub: { fontSize: 11, color: '#8c7c6e', marginTop: 2 },
  diaInfoDivider: { width: 1, height: 36, backgroundColor: '#e8c4b8', marginHorizontal: 8 },
  diaNivelNombre: { fontSize: 14, color: '#8c7c6e', fontStyle: 'italic' },

  // Botón compartido
  btnOuter: { position: 'relative', marginTop: 4 },
  btnShadow: { position: 'absolute', bottom: -4, left: 4, right: 4, height: '100%', backgroundColor: '#4a0c0c', borderRadius: 50 },
  btnFace: { backgroundColor: '#8b1a1a', borderRadius: 50, paddingVertical: 15, alignItems: 'center', borderWidth: 2.5, borderColor: '#6b1212' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },
});
