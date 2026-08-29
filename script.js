const RISK_SIMPLE = "simple";
const RISK_FULL = "full";

let riskMode = RISK_SIMPLE;

function obtenerValorPip(par) {
  switch (par) {
    case "EURUSD":
    case "GBPUSD":
    case "AUDUSD":
      return 10;

    case "USDCAD":
      return 7.2;

    case "USDCHF":
      return 12.5;

    case "XAUUSD":
      return 1;

    case "USTEC":
      return 1;

    case "USTEC-BULLFY":
      return 10;

    default:
      return null;
  }
}

function calcularLotaje(par, riesgoUSD, slPips, capital) {
  if (!par) {
    return { ok: false, mensaje: "Selecciona un par válido." };
  }

  if (!riesgoUSD || riesgoUSD <= 0) {
    return { ok: false, mensaje: "Ingresa el riesgo en USD." };
  }

  if (!slPips || slPips <= 0) {
    return { ok: false, mensaje: "Ingresa el SL en pips/puntos." };
  }

  const valorPip = obtenerValorPip(par);

  if (valorPip === null) {
    return { ok: false, mensaje: "Par no soportado." };
  }

  const loteCrudo = riesgoUSD / (slPips * valorPip);
  const lote = Math.max(0, Math.floor(loteCrudo * 100) / 100);
  const perdidaReal = lote * slPips * valorPip;

  let riesgoPctCapital = null;

  if (capital && capital > 0) {
    riesgoPctCapital = (perdidaReal / capital) * 100;
  }

  return {
    ok: true,
    lote,
    valorPip,
    perdidaReal,
    riesgoPctCapital
  };
}

const els = {
  pairSelect: document.getElementById("pairSelect"),
  capitalInput: document.getElementById("capitalInput"),
  riskModeToggle: document.getElementById("riskModeToggle"),
  simpleRiskBlock: document.getElementById("simpleRiskBlock"),
  fullRiskBlock: document.getElementById("fullRiskBlock"),
  riskAmountInput: document.getElementById("riskAmountInput"),
  riskPercentSelect: document.getElementById("riskPercentSelect"),
  fullRiskComputed: document.getElementById("fullRiskComputed"),
  slPipsInput: document.getElementById("slPipsInput"),
  validationBox: document.getElementById("validationBox"),
  statusPill: document.getElementById("statusPill"),
  statusPillText: document.getElementById("statusPillText"),
  gaugeFill: document.getElementById("gaugeFill"),
  gaugeValue: document.getElementById("gaugeValue"),
  lotResult: document.getElementById("lotResult"),
  lossResult: document.getElementById("lossResult"),
  valuePerPointResult: document.getElementById("valuePerPointResult"),
};

function textoANumero(texto) {
  if (typeof texto !== "string") return NaN;

  const limpio = texto
    .replace(/[^0-9.,-]/g, "")
    .replace(/,/g, "")
    .trim();

  if (limpio === "") return NaN;

  return Number(limpio);
}

function textoACapital(texto) {
  if (typeof texto !== "string") return NaN;

  let valor = texto
    .replace(/[^0-9.,-]/g, "")
    .trim();

  if (valor === "") return NaN;

  if (valor.includes(".") && valor.includes(",")) {
    valor = valor
      .replace(/\./g, "")
      .replace(",", ".");
  } else if (valor.includes(",")) {
    valor = valor.replace(/,/g, "");
  }

  return Number(valor);
}

function formatearUSD(valor) {
  return valor.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

const LISTA_PARES = [
  "EURUSD",
  "GBPUSD",
  "AUDUSD",
  "USDCHF",
  "USDCAD",
  "XAUUSD",
  "USTEC",
  "USTEC-BULLFY"
];

function llenarSelectPares() {
  els.pairSelect.innerHTML = "";

  for (let i = 0; i < LISTA_PARES.length; i++) {
    const par = LISTA_PARES[i];
    const opcion = document.createElement("option");

    opcion.value = par;
    opcion.textContent = par;

    els.pairSelect.appendChild(opcion);
  }
}

function setRiskMode(modo) {
  riskMode = modo;

  const botones =
    els.riskModeToggle.querySelectorAll(".segmented-btn");

  for (let i = 0; i < botones.length; i++) {
    const btn = botones[i];

    if (btn.dataset.mode === modo) {
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
    } else {
      btn.classList.remove("is-active");
      btn.setAttribute("aria-selected", "false");
    }
  }

  if (modo === RISK_SIMPLE) {
    els.simpleRiskBlock.classList.remove("is-hidden");
    els.fullRiskBlock.classList.add("is-hidden");
  } else {
    els.simpleRiskBlock.classList.add("is-hidden");
    els.fullRiskBlock.classList.remove("is-hidden");
  }

  calcularYMostrar();
}

const GAUGE_LARGO = 251.2;
const GAUGE_REFERENCIA_PCT = 2;

function dibujarGauge(pctCapital) {
  let pct = pctCapital;

  if (pct === null || isNaN(pct)) {
    pct = 0;
  }

  let ratio = pct / GAUGE_REFERENCIA_PCT;

  if (ratio > 1.15) {
    ratio = 1.15;
  }

  const offset =
    GAUGE_LARGO -
    Math.min(ratio, 1) * GAUGE_LARGO;

  els.gaugeFill.style.strokeDashoffset = offset;

  let color = "var(--green)";

  if (ratio >= 0.5) {
    color = "var(--yellow)";
  }

  if (ratio >= 1) {
    color = "var(--red)";
  }

  els.gaugeFill.style.stroke = color;
  els.gaugeValue.textContent = pct.toFixed(2) + "%";
  els.gaugeValue.style.color =
    ratio >= 1
      ? "var(--red)"
      : "var(--text-primary)";
}

function mostrarValidacion(mensaje) {
  if (!mensaje) {
    els.validationBox.classList.add("is-hidden");
    els.validationBox.innerHTML = "";
    return;
  }

  els.validationBox.classList.remove("is-hidden");

  els.validationBox.innerHTML =
    "<ul><li>" + mensaje + "</li></ul>";
}

function setEstadoPill(estado) {
  els.statusPill.classList.remove(
    "is-valid",
    "is-invalid"
  );

  if (estado === "valid") {
    els.statusPill.classList.add("is-valid");
    els.statusPillText.textContent =
      "Cálculo válido";
  } else if (estado === "invalid") {
    els.statusPill.classList.add("is-invalid");
    els.statusPillText.textContent =
      "Revisa los datos";
  } else {
    els.statusPillText.textContent =
      "Esperando datos";
  }
}

function mostrarResultados(resultado) {
  if (!resultado || !resultado.ok) {
    els.lotResult.textContent = "0.00";
    els.lossResult.textContent = "$0.00";
    els.valuePerPointResult.textContent = "—";
    dibujarGauge(0);
    return;
  }

  els.lotResult.textContent =
    resultado.lote.toFixed(2);

  els.lossResult.textContent =
    formatearUSD(resultado.perdidaReal);

  els.valuePerPointResult.textContent =
    formatearUSD(resultado.valorPip);

  dibujarGauge(
    resultado.riesgoPctCapital
  );
}

function hayAlgunDatoIngresado() {
  const slPips =
    textoANumero(els.slPipsInput.value);

  const capital =
    textoACapital(els.capitalInput.value);

  const riesgo =
    textoANumero(els.riskAmountInput.value);

  return Boolean(
    slPips ||
    capital ||
    riesgo
  );
}

function calcularYMostrar() {
  const par = els.pairSelect.value;

  const capital =
    textoACapital(
      els.capitalInput.value
    ) || null;

  const slPips =
    textoANumero(
      els.slPipsInput.value
    ) || null;

  let riesgoUSD;

  if (riskMode === RISK_SIMPLE) {
    riesgoUSD =
      textoANumero(
        els.riskAmountInput.value
      ) || null;
  } else {
    const pct =
      textoANumero(
        els.riskPercentSelect.value
      ) || 0;

    riesgoUSD =
      capital && pct
        ? capital * (pct / 100)
        : null;
  }

  const resultado =
    calcularLotaje(
      par,
      riesgoUSD,
      slPips,
      capital
    );

  mostrarValidacion(
    resultado.ok
      ? null
      : resultado.mensaje
  );

  mostrarResultados(resultado);

  if (resultado.ok) {
    setEstadoPill("valid");
  } else if (hayAlgunDatoIngresado()) {
    setEstadoPill("invalid");
  } else {
    setEstadoPill("idle");
  }

  if (riskMode === RISK_FULL) {
    const pct =
      textoANumero(
        els.riskPercentSelect.value
      ) || 0;

    if (capital && capital > 0) {
      els.fullRiskComputed.textContent =
        formatearUSD(
          capital * (pct / 100)
        );
    } else {
      els.fullRiskComputed.textContent =
        "—";
    }
  }
}

function inicializarEventos() {
  els.pairSelect.addEventListener(
    "change",
    calcularYMostrar
  );

  els.capitalInput.addEventListener(
    "input",
    calcularYMostrar
  );

  els.riskAmountInput.addEventListener(
    "input",
    calcularYMostrar
  );

  els.slPipsInput.addEventListener(
    "input",
    calcularYMostrar
  );

  els.riskPercentSelect.addEventListener(
    "change",
    calcularYMostrar
  );

  const botonesRiesgo =
    els.riskModeToggle.querySelectorAll(
      ".segmented-btn"
    );

  for (let i = 0; i < botonesRiesgo.length; i++) {
    botonesRiesgo[i].addEventListener(
      "click",
      function () {
        setRiskMode(this.dataset.mode);
      }
    );
  }

  const chips =
    document.querySelectorAll(
      ".chip[data-risk-amount]"
    );

  for (let i = 0; i < chips.length; i++) {
    chips[i].addEventListener(
      "click",
      function () {
        els.riskAmountInput.value =
          this.dataset.riskAmount;

        for (let j = 0; j < chips.length; j++) {
          chips[j].classList.remove(
            "is-active"
          );
        }

        this.classList.add("is-active");

        calcularYMostrar();
      }
    );
  }
}

function iniciar() {
  llenarSelectPares();
  inicializarEventos();
  setRiskMode(RISK_SIMPLE);
  calcularYMostrar();
}

document.addEventListener(
  "DOMContentLoaded",
  iniciar
);
