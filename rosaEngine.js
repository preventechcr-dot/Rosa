/**
 * Rosa Tech - Motor Ergonomico ROSA v1.0
 */

const MATRIZ_PANTALLA_TELEFONO = [
  [ 1,  2,  3,  4 ],
  [ 2,  2,  3,  4 ],
  [ 3,  3,  4,  5 ],
  [ 4,  4,  5,  6 ]
];

const MATRIZ_TECLADO_MOUSE = [
  [ 1,  2,  3,  4 ],
  [ 2,  3,  3,  4 ],
  [ 3,  3,  4,  5 ],
  [ 4,  4,  5,  6 ]
];

const MATRIZ_PERIFERICOS = [
  [1,  2,  3,  4,  5],
  [2,  3,  4,  5,  6],
  [3,  4,  5,  6,  7],
  [4,  5,  6,  7,  8],
  [5,  6,  7,  8,  9]
];

const MATRIZ_FINAL_ROSA = [
  [1,  2,  3,  3,  4,  4,  5,  6,  7,  8],
  [2,  2,  3,  4,  4,  5,  6,  6,  7,  8],
  [3,  3,  4,  4,  5,  5,  6,  7,  8,  9],
  [3,  4,  4,  5,  6,  6,  7,  8,  9,  9],
  [4,  4,  5,  6,  6,  7,  7,  8,  9,  9],
  [4,  5,  5,  6,  7,  7,  8,  9,  9, 10],
  [5,  6,  6,  7,  7,  8,  8,  9,  9, 10],
  [6,  6,  7,  8,  8,  9,  9,  9, 10, 10],
  [7,  7,  8,  9,  9,  9, 10, 10, 10, 10],
  [8,  8,  9,  9,  9, 10, 10, 10, 10, 10]
];

function obtenerValorMatriz(matriz, fila, columna) {
  const f = Math.min(Math.max(fila - 1, 0), matriz.length - 1);
  const c = Math.min(Math.max(columna - 1, 0), matriz[0].length - 1);
  return matriz[f][c];
}

function calcularRosa(datos) {
  // A. SILLA
  const scoreAsiento = datos.silla.altura + datos.silla.profundidad + datos.silla.ajustesAsiento;
  const scoreApoyabrazos = datos.silla.apoyabrazos + datos.silla.ajustesApoyabrazos;
  const scoreRespaldo = datos.silla.respaldo + datos.silla.ajustesRespaldo;
  
  const scoreSillaBase = Math.max(1, Math.min(10, scoreAsiento + scoreApoyabrazos + scoreRespaldo));
  const scoreSillaFinal = Math.max(1, Math.min(10, scoreSillaBase + datos.silla.tiempoUso));

  // B. PANTALLA Y TELÉFONO
  const scorePantallaBase = datos.pantalla.posicion + datos.pantalla.ajustes;
  const scoreTelefonoBase = datos.telefono.posicion + datos.telefono.ajustes;
  const scorePantallaTelefonoComb = obtenerValorMatriz(MATRIZ_PANTALLA_TELEFONO, scorePantallaBase, scoreTelefonoBase);
  const scorePantallaTelefonoFinal = Math.max(1, Math.min(10, scorePantallaTelefonoComb + datos.pantalla.tiempoUso));

  // C. TECLADO Y MOUSE
  const scoreTecladoBase = datos.teclado.posicion + datos.teclado.ajustes;
  const scoreMouseBase = datos.mouse.posicion + datos.mouse.ajustes;
  const scoreTecladoMouseComb = obtenerValorMatriz(MATRIZ_TECLADO_MOUSE, scoreTecladoBase, scoreMouseBase);
  const scoreTecladoMouseFinal = Math.max(1, Math.min(10, scoreTecladoMouseComb + datos.teclado.tiempoUso));

  // D. COMBINACIÓN PUESTO DE TRABAJO (B + C)
  const scorePuestoTrabajo = obtenerValorMatriz(MATRIZ_PERIFERICOS, scorePantallaTelefonoFinal, scoreTecladoMouseFinal);

  // E. PUNTUACIÓN FINAL ROSA TECH
  const puntuacionFinal = obtenerValorMatriz(MATRIZ_FINAL_ROSA, scoreSillaFinal, scorePuestoTrabajo);

  let nivelAccion = 1;
  let nivelRiesgo = "Bajo / Innecesario";

  if (puntuacionFinal >= 5) {
    nivelAccion = 3;
    nivelRiesgo = "Alto / Intervención Requerida";
  } else if (puntuacionFinal === 4) {
    nivelAccion = 2;
    nivelRiesgo = "Moderado / Profundizar Análisis";
  }

  return {
    score_silla: scoreSillaFinal,
    score_pantalla_telefono: scorePantallaTelefonoFinal,
    score_teclado_mouse: scoreTecladoMouseFinal,
    score_puesto_trabajo: scorePuestoTrabajo,
    puntuacion_final: puntuacionFinal,
    nivel_accion: nivelAccion,
    nivel_riesgo: nivelRiesgo,
    engine_version: "rosa-engine-v1.0"
  };
    }

