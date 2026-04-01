// ============================================================
// DATOS DEL JUEGO — migrado de Unity ScriptableObjects a JS
// ============================================================

export const INITIAL_STATE = {
  efectivoNegocio: 500,
  ahorroPersonal: 200,
  carteraCrypto: 0,
  precioBC: 10, // precio inicial de BirriaCoin en pesos
};

export const GAME_CONFIG = {
  accionesFinancierasPorDia: 3,
  diasPorSemana: 6,
  precioMinimo: 0.5,
  precioMaximo: 1000,
  volatilidadMin: -0.12,
  volatilidadMax: 0.18,
  probabilidadNoticia: 0.35,
};

// Noticias del barrio (BarrioNewsEvent ScriptableObjects)
export const NOTICIAS_BARRIO = [
  {
    id: "taqueria_acepta_bc",
    titulo: "🌮 ¡La taquería del güero acepta BirriaCoin!",
    descripcion: "Tres negocios del barrio anunciaron que aceptarán BirriaCoin como pago.",
    cambioPorcentualPrecio: 0.2,
  },
  {
    id: "robo_mercado",
    titulo: "🚨 Asalto en el mercado central",
    descripcion: "La inseguridad hace que la gente prefiera efectivo. BirriaCoin cae.",
    cambioPorcentualPrecio: -0.15,
  },
  {
    id: "influencer_bc",
    titulo: "📱 Influencer local promociona BirriaCoin",
    descripcion: "Un youtuber del barrio habló bien de BirriaCoin en su canal.",
    cambioPorcentualPrecio: 0.3,
  },
  {
    id: "lluvia_ventas",
    titulo: "🌧️ Semana de lluvias — pocas ventas",
    descripcion: "La gente sale menos, BirriaCoin pierde interés temporalmente.",
    cambioPorcentualPrecio: -0.08,
  },
  {
    id: "feria_barrio",
    titulo: "🎉 Feria del barrio este fin de semana",
    descripcion: "El evento atrae turistas. Todo el comercio local sube.",
    cambioPorcentualPrecio: 0.25,
  },
  {
    id: "corrupcion",
    titulo: "😤 Rumores de corrupción en el mercado crypto",
    descripcion: "Desconfianza general. BirriaCoin cae junto con todo el mercado.",
    cambioPorcentualPrecio: -0.2,
  },
  {
    id: "radio_bc",
    titulo: "📻 Radio Norteña menciona BirriaCoin",
    descripcion: "La estación más escuchada del barrio habló del token en el noticiero.",
    cambioPorcentualPrecio: 0.12,
  },
];

// Decisiones diarias (DecisionesDiarias ScriptableObjects)
export const DECISIONES_POR_DIA = {
  1: [
    {
      id: "D1_A",
      titulo: "Reinvertir en más birria 🌮",
      descripcion: "Comprar más insumos para vender el doble mañana.",
      consejo: "Reinvertir en tu negocio es la base del crecimiento. ¡El flujo de caja lo es todo!",
      deltaEfectivo: -150,
      deltaAhorro: 0,
      deltaCrypto: 0,
      esRecomendada: true,
    },
    {
      id: "D1_B",
      titulo: "Guardar todo en el colchón 🛏️",
      descripcion: "Guardar el efectivo en casa 'por si acaso'.",
      consejo: "El dinero parado pierde valor por la inflación. ¡Hazlo trabajar para ti!",
      deltaEfectivo: 0,
      deltaAhorro: 0,
      deltaCrypto: 0,
      esRecomendada: false,
    },
    {
      id: "D1_C",
      titulo: "Mover dinero al ahorro 🏦",
      descripcion: "Separar $100 pesos para emergencias personales.",
      consejo: "Tener un fondo de emergencia es el primer paso de la salud financiera.",
      deltaEfectivo: -100,
      deltaAhorro: 100,
      deltaCrypto: 0,
      esRecomendada: true,
    },
  ],
  2: [
    {
      id: "D2_A",
      titulo: "Comprar BirriaCoin 🪙",
      descripcion: "Invertir $200 pesos en BirriaCoin al precio actual.",
      consejo: "Diversificar tus inversiones reduce el riesgo total. ¡No pongas todos los huevos en una canasta!",
      deltaEfectivo: -200,
      deltaAhorro: 0,
      deltaCrypto: null, // calculado dinámicamente por precio
      esRecomendada: true,
      esCryptoCompra: true,
      montoCryptoCompra: 200,
    },
    {
      id: "D2_B",
      titulo: "Pagar deuda del local 🏪",
      descripcion: "Saldar $180 pesos de renta atrasada.",
      consejo: "Pagar deudas mejora tu historial crediticio y elimina intereses.",
      deltaEfectivo: -180,
      deltaAhorro: 0,
      deltaCrypto: 0,
      esRecomendada: true,
    },
    {
      id: "D2_C",
      titulo: "Gastar en la fiesta del vecino 🎊",
      descripcion: "Aportar $150 pesos para la parrillada del vecino.",
      consejo: "El gasto social está bien ocasionalmente, pero no debe comprometer tu capital de trabajo.",
      deltaEfectivo: -150,
      deltaAhorro: 0,
      deltaCrypto: 0,
      esRecomendada: false,
    },
  ],
  3: [
    {
      id: "D3_A",
      titulo: "Vender BirriaCoin 📈",
      descripcion: "Liquidar 0.5 BC al precio actual del mercado.",
      consejo: "Saber cuándo vender es tan importante como saber cuándo comprar.",
      deltaEfectivo: 0,
      deltaAhorro: 0,
      deltaCrypto: null,
      esRecomendada: true,
      esCryptoVenta: true,
      cantidadVenta: 0.5,
    },
    {
      id: "D3_B",
      titulo: "Ampliar el menú 🥩",
      descripcion: "Invertir $250 en nuevos platillos para atraer más clientes.",
      consejo: "Diversificar tu oferta puede aumentar tus ventas hasta un 40%.",
      deltaEfectivo: -250,
      deltaAhorro: 0,
      deltaCrypto: 0,
      esRecomendada: true,
    },
    {
      id: "D3_C",
      titulo: "Nada, esperar al rato 😴",
      descripcion: "No hacer nada hoy.",
      consejo: "La inacción también tiene un costo: oportunidades perdidas.",
      deltaEfectivo: 0,
      deltaAhorro: 0,
      deltaCrypto: 0,
      esRecomendada: false,
    },
  ],
  4: [
    {
      id: "D4_A",
      titulo: "Contratar a un ayudante 👷",
      descripcion: "Pagar $300 a un familiar para que te ayude este fin de semana.",
      consejo: "Delegar te permite escalar. El tiempo también tiene valor.",
      deltaEfectivo: -300,
      deltaAhorro: 0,
      deltaCrypto: 0,
      esRecomendada: true,
    },
    {
      id: "D4_B",
      titulo: "Mover ahorro a crypto 🚀",
      descripcion: "Mover $150 del ahorro personal a BirriaCoin.",
      consejo: "El ahorro de emergencia no debería invertirse en activos volátiles.",
      deltaEfectivo: 0,
      deltaAhorro: -150,
      deltaCrypto: null,
      esRecomendada: false,
      esCryptoCompraDesdeAhorro: true,
      montoCryptoCompra: 150,
    },
    {
      id: "D4_C",
      titulo: "Publicidad en redes 📣",
      descripcion: "Invertir $100 en anuncios de Facebook para el taco stand.",
      consejo: "El marketing digital puede multiplicar tu visibilidad con inversión mínima.",
      deltaEfectivo: -100,
      deltaAhorro: 0,
      deltaCrypto: 0,
      esRecomendada: true,
    },
  ],
  5: [
    {
      id: "D5_A",
      titulo: "Reinvertir ganancias 🔄",
      descripcion: "Meter $200 más al negocio para el siguiente ciclo.",
      consejo: "El interés compuesto funciona igual en negocios: reinvierte para crecer.",
      deltaEfectivo: -200,
      deltaAhorro: 0,
      deltaCrypto: 0,
      esRecomendada: true,
    },
    {
      id: "D5_B",
      titulo: "Retirar todo 💸",
      descripcion: "Sacar $300 para gastos personales.",
      consejo: "Mezclar finanzas personales y del negocio es una de las causas más comunes de quiebra.",
      deltaEfectivo: -300,
      deltaAhorro: 150,
      deltaCrypto: 0,
      esRecomendada: false,
    },
    {
      id: "D5_C",
      titulo: "Comprar equipo mejor 🔧",
      descripcion: "Invertir $350 en una mejor parrilla.",
      consejo: "Invertir en capital físico aumenta tu capacidad productiva a largo plazo.",
      deltaEfectivo: -350,
      deltaAhorro: 0,
      deltaCrypto: 0,
      esRecomendada: true,
    },
  ],
  6: [
    {
      id: "D6_A",
      titulo: "Día de descanso 😌",
      descripcion: "Cerrar el puesto y descansar.",
      consejo: "El descanso es productivo. Un emprendedor quemado toma malas decisiones.",
      deltaEfectivo: 0,
      deltaAhorro: 0,
      deltaCrypto: 0,
      esRecomendada: true,
    },
    {
      id: "D6_B",
      titulo: "Abrir igual, vender extra 💪",
      descripcion: "Trabajar el día de descanso para sacar $200 extra.",
      consejo: "Maximizar ingresos a corto plazo puede afectar tu salud y sostenibilidad.",
      deltaEfectivo: 200,
      deltaAhorro: 0,
      deltaCrypto: 0,
      esRecomendada: false,
    },
    {
      id: "D6_C",
      titulo: "Ir al tianguis a comprar 🛒",
      descripcion: "Conseguir insumos más baratos, ahorrando $80.",
      consejo: "Reducir costos es tan poderoso como aumentar ingresos.",
      deltaEfectivo: 80,
      deltaAhorro: 0,
      deltaCrypto: 0,
      esRecomendada: true,
    },
  ],
};

// Para días > 6, cicla con variaciones
export const getDecisionesParaDia = (dia) => {
  const diaEnCiclo = ((dia - 1) % 6) + 1;
  return DECISIONES_POR_DIA[diaEnCiclo] || DECISIONES_POR_DIA[1];
};
