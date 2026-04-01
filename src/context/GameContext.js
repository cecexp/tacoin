import React, { createContext, useContext, useReducer, useCallback } from 'react';
import {
  INITIAL_STATE,
  GAME_CONFIG,
  NOTICIAS_BARRIO,
  getDecisionesParaDia,
} from '../data/gameData';

// ============================================================
// ESTADO INICIAL
// ============================================================
const initialGameState = {
  // EconomyManager
  efectivoNegocio: INITIAL_STATE.efectivoNegocio,
  ahorroPersonal: INITIAL_STATE.ahorroPersonal,
  carteraCrypto: INITIAL_STATE.carteraCrypto,

  // CryptoSimSystem
  precioBC: INITIAL_STATE.precioBC,
  noticiaDeHoy: null,

  // GameLoopManager
  diaGlobal: 1,
  diaSemana: 1,
  semanaGlobal: 1,
  accionesRestantes: GAME_CONFIG.accionesFinancierasPorDia,

  // DecisionHistoryManager
  historial: [], // [{diaGlobal, diaSemana, semanaGlobal, decision}]

  // UI state
  screen: 'game', // 'game' | 'weekly_report' | 'bankrupt'
  popupConsejo: null, // {titulo, consejo} | null
  noticiaVisible: null, // noticia a mostrar
  decisionesDelDia: [],
  resumenSemana: null,
};

// ============================================================
// REDUCER (toda la lógica del juego)
// ============================================================
function gameReducer(state, action) {
  switch (action.type) {

    case 'APLICAR_DECISION': {
      const { decision } = action;
      let nuevoEfectivo = state.efectivoNegocio;
      let nuevoAhorro = state.ahorroPersonal;
      let nuevoCrypto = state.carteraCrypto;

      // Compra de crypto desde efectivo del negocio
      if (decision.esCryptoCompra && decision.montoCryptoCompra) {
        const monto = Math.min(decision.montoCryptoCompra, nuevoEfectivo);
        nuevoEfectivo -= monto;
        nuevoCrypto += monto / state.precioBC;
      }
      // Compra de crypto desde ahorro personal
      else if (decision.esCryptoCompraDesdeAhorro && decision.montoCryptoCompra) {
        const monto = Math.min(decision.montoCryptoCompra, nuevoAhorro);
        nuevoAhorro -= monto;
        nuevoCrypto += monto / state.precioBC;
      }
      // Venta de crypto
      else if (decision.esCryptoVenta && decision.cantidadVenta) {
        const cantidad = Math.min(decision.cantidadVenta, nuevoCrypto);
        nuevoCrypto -= cantidad;
        nuevoEfectivo += cantidad * state.precioBC;
      }
      // Cambio financiero normal
      else {
        nuevoEfectivo = Math.max(0, nuevoEfectivo + (decision.deltaEfectivo || 0));
        nuevoAhorro = Math.max(0, nuevoAhorro + (decision.deltaAhorro || 0));
        nuevoCrypto = Math.max(0, nuevoCrypto + (decision.deltaCrypto || 0));
      }

      const nuevoHistorial = [...state.historial, {
        diaGlobal: state.diaGlobal,
        diaSemana: state.diaSemana,
        semanaGlobal: state.semanaGlobal,
        decision,
      }];

      const nuevasAcciones = state.accionesRestantes - 1;
      const hayBancarrota = nuevoEfectivo <= 0 && nuevoAhorro <= 0;

      // Si se acaban las acciones → terminar día
      if (nuevasAcciones <= 0 && !hayBancarrota) {
        return terminarDia({
          ...state,
          efectivoNegocio: nuevoEfectivo,
          ahorroPersonal: nuevoAhorro,
          carteraCrypto: nuevoCrypto,
          historial: nuevoHistorial,
          accionesRestantes: 0,
          popupConsejo: decision.consejo ? { titulo: decision.titulo, consejo: decision.consejo } : null,
        });
      }

      return {
        ...state,
        efectivoNegocio: nuevoEfectivo,
        ahorroPersonal: nuevoAhorro,
        carteraCrypto: nuevoCrypto,
        historial: nuevoHistorial,
        accionesRestantes: Math.max(0, nuevasAcciones),
        screen: hayBancarrota ? 'bankrupt' : 'game',
        popupConsejo: decision.consejo ? { titulo: decision.titulo, consejo: decision.consejo } : null,
      };
    }

    case 'FORZAR_FIN_DIA': {
      return terminarDia({ ...state, accionesRestantes: 0, popupConsejo: null });
    }

    case 'CERRAR_POPUP': {
      return { ...state, popupConsejo: null };
    }

    case 'CERRAR_NOTICIA': {
      return { ...state, noticiaVisible: null };
    }

    case 'CERRAR_REPORTE_SEMANAL': {
      return {
        ...state,
        screen: 'game',
        resumenSemana: null,
        decisionesDelDia: getDecisionesParaDia(state.diaGlobal),
      };
    }

    case 'REINICIAR': {
      return {
        ...initialGameState,
        decisionesDelDia: getDecisionesParaDia(1),
      };
    }

    default:
      return state;
  }
}

// ============================================================
// LÓGICA DE FIN DE DÍA (CryptoSimSystem + GameLoopManager)
// ============================================================
function terminarDia(state) {
  // 1) Actualizar precio de BirriaCoin (CryptoSimSystem.ActualizarPrecioDiario)
  const t = Math.random();
  const factorBase = lerp(1 + GAME_CONFIG.volatilidadMin, 1 + GAME_CONFIG.volatilidadMax, t);
  let nuevoPrecio = state.precioBC * factorBase;
  let noticiaDeHoy = null;

  if (Math.random() <= GAME_CONFIG.probabilidadNoticia) {
    noticiaDeHoy = NOTICIAS_BARRIO[Math.floor(Math.random() * NOTICIAS_BARRIO.length)];
    nuevoPrecio *= (1 + noticiaDeHoy.cambioPorcentualPrecio);
  }

  nuevoPrecio = Math.min(Math.max(nuevoPrecio, GAME_CONFIG.precioMinimo), GAME_CONFIG.precioMaximo);

  // 2) Avanzar calendario (GameLoopManager.AvanzarCalendario)
  const nuevoDiaGlobal = state.diaGlobal + 1;
  let nuevoDiaSemana = state.diaSemana + 1;
  let nuevaSemanaGlobal = state.semanaGlobal;
  let semanaTerminada = false;
  let resumenSemana = null;

  if (nuevoDiaSemana > GAME_CONFIG.diasPorSemana) {
    semanaTerminada = true;
    resumenSemana = calcularResumenSemana(state.historial, state.semanaGlobal);
    nuevoDiaSemana = 1;
    nuevaSemanaGlobal = state.semanaGlobal + 1;
  }

  // Venta diaria simulada (el taco stand genera ingresos base cada día)
  const ventaDiaria = 80 + Math.random() * 120; // $80-$200 pesos por día de ventas
  const nuevoEfectivo = state.efectivoNegocio + ventaDiaria;

  return {
    ...state,
    precioBC: nuevoPrecio,
    noticiaDeHoy,
    noticiaVisible: noticiaDeHoy,
    diaGlobal: nuevoDiaGlobal,
    diaSemana: nuevoDiaSemana,
    semanaGlobal: nuevaSemanaGlobal,
    accionesRestantes: GAME_CONFIG.accionesFinancierasPorDia,
    efectivoNegocio: nuevoEfectivo,
    decisionesDelDia: getDecisionesParaDia(nuevoDiaGlobal),
    screen: semanaTerminada ? 'weekly_report' : 'game',
    resumenSemana,
  };
}

function calcularResumenSemana(historial, semanaGlobal) {
  const registros = historial.filter(h => h.semanaGlobal === semanaGlobal);
  const totalDecisiones = registros.length;
  const totalRecomendadas = registros.filter(h => h.decision.esRecomendada).length;
  const totalNoRecomendadas = totalDecisiones - totalRecomendadas;
  return {
    semanaGlobal,
    totalDecisiones,
    totalRecomendadas,
    totalNoRecomendadas,
    porcentajeRecomendadas: totalDecisiones > 0 ? totalRecomendadas / totalDecisiones : 0,
  };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// ============================================================
// CONTEXT
// ============================================================
const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialGameState,
    decisionesDelDia: getDecisionesParaDia(1),
  });

  const aplicarDecision = useCallback((decision) => {
    dispatch({ type: 'APLICAR_DECISION', decision });
  }, []);

  const forzarFinDeDia = useCallback(() => {
    dispatch({ type: 'FORZAR_FIN_DIA' });
  }, []);

  const cerrarPopup = useCallback(() => {
    dispatch({ type: 'CERRAR_POPUP' });
  }, []);

  const cerrarNoticia = useCallback(() => {
    dispatch({ type: 'CERRAR_NOTICIA' });
  }, []);

  const cerrarReporteSemanal = useCallback(() => {
    dispatch({ type: 'CERRAR_REPORTE_SEMANAL' });
  }, []);

  const reiniciar = useCallback(() => {
    dispatch({ type: 'REINICIAR' });
  }, []);

  return (
    <GameContext.Provider value={{
      state,
      aplicarDecision,
      forzarFinDeDia,
      cerrarPopup,
      cerrarNoticia,
      cerrarReporteSemanal,
      reiniciar,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
