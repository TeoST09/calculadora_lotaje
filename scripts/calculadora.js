
// Entradas
const select = document.getElementById('pairSelect')
const dinero = document.getElementById('riskAmountInput')
const sl = document.getElementById('slPipsInput')
const botones = document.querySelectorAll('.chip')
const bloquear = document.getElementById('bloquear')
const cuentaMultiple = document.getElementById('cuentaMultiple')

// Resultados
const resultado = document.getElementById('lotResult')
const valorPuntoPip = document.getElementById('valuePerPointResult')
const perdidaSL = document.getElementById('lossResult')
const primerCierre = document.getElementById('partial1R')
const segundoCierre = document.getElementById('partial2R')
const parSeleccionado1 = document.getElementById('parSeleccionado1')
const rr = document.getElementById('rr')
const rr2 = document.getElementById('rr2')

const resultado2 = document.getElementById('lotResult2')
const perdidaSL2 = document.getElementById('lossResult2')
const primerCierre2 = document.getElementById('partial1R2')
const segundoCierre2 = document.getElementById('partial2R2')
const valorPuntoPip2 = document.getElementById('valuePerPointResult2')
const parSeleccionado2 = document.getElementById('parSeleccionado2')

// Cierres
const loteAbiertoInput = document.getElementById('customLotInput')
const lotePorcentajeInput = document.getElementById('customPercentInput')
const loteRestante = document.getElementById('customRemainingResult')
const loteCerrar = document.getElementById('customCloseResult')

//Cierres labels

const labelPartial1 = document.getElementById('partial1Label')
const labelPartial2 = document.getElementById('partial2Label')
const labelPartial1_2 = document.getElementById('partial1Label2')
const labelPartial2_2 = document.getElementById('partial2Label2')

//Estado de la interfaz
const status = document.querySelector('.header-status')
const statusPillText = document.getElementById('statusPillText')
const mostrarResultado = document.getElementById('mostrarResultado2')
const tituloResultado2 = document.getElementById('tituloResultado2')
const mostrarParciales2 = document.getElementById('mostrarParciales2')
const tituloParciales2 = document.getElementById('mostarParciales2')

const personalizarParciales = document.getElementById('toggleCustomPartials')
const panelParciales = document.getElementById('customPartialsPanel')
const personalizarTp = document.getElementById('toggleTp')
const panelTp = document.getElementById('tpPanel')
const primerCierrePersonalizado = document.getElementById('firstPartialInput')
const segundoCierrePersonalizado = document.getElementById('secondPartialInput')
const guardarParcialesPersonalizados = document.getElementById('saveCustomPartials')

//Take Profit

const inputTp = document.getElementById('tpRatioInput')
const guardarTp = document.getElementById('saveTp')
const ratioRiesgo = document.getElementById('ratioRiesgo')
const ratioRiesgo2 = document.getElementById('ratioRiesgo2')

let bloqueado = false
let resultadoCuenta1 = false
let mostrarMultiple = false
let riesgoCuenta1 = ''
let valorPip = 0
let valorPipTable = 0
let nombrePar = ''


function mensajes(mensaje, comprobar){
    statusPillText.textContent = mensaje
    if(comprobar){
        status.classList.remove("is-invalid");
        status.classList.add("is-valid");
    }else{
        status.classList.remove("is-valid");
        status.classList.add("is-invalid");
    }
    return
}

const informacionPares = {
    "1": { valorPip: 10, par: "EURUSD" },
    "2": { valorPip: 10, par: "GBPUSD" },
    "3": { valorPip: 10, par: "AUDUSD" },
    "4": { valorPip: 7.19, par: "USDCAD" },
    "5": { valorPip: 12.35, par: "USDCHF" },
    "6": { valorPip: 100, par: "XAUUSD" },
    "7": { valorPip: 1, par: "USTEC" },
    "8": { valorPip: 10, par: "USTEC-BULLFY" }
}


class Calculadora {
    constructor() {
        this.bloqueado = false
        this.resultadoCuenta1 = false
        this.mostrarMultiple = false
        this.riesgoCuenta1 = ''
        this.valorPip = 0
        this.valorPipTable = 0
        this.nombrePar = ''
        this.primerParcialGuardado = Number(localStorage.getItem('primerParcial')) || 33
        this.segundoParcialGuardado = Number(localStorage.getItem('segundoParcial')) || 33
    }

    get parciales(){
        return {
            primerParcial: this.primerParcialGuardado,
            segundoParcial: this.segundoParcialGuardado
        }
    }

    actualizarPar() {
        const opcionElegida = select.value
        const selectPar = informacionPares[opcionElegida] || { valorPip: 0, par: '-' }

        this.valorPipTable = selectPar.valorPip
        this.nombrePar = selectPar.par
        valorPipTable = this.valorPipTable
        nombrePar = this.nombrePar
        calcularLote(selectPar.valorPip, selectPar.par)
    }

    calcularLote() {
        const selectPar = informacionPares[select.value] || { valorPip: 0, par: '-' }
        calcularLote(selectPar.valorPip, selectPar.par)
    }

    calcularParciales() {
        const loteAbierto = parseFloat(loteAbiertoInput.value)
        const lotePorcentaje = Number(lotePorcentajeInput.value)

        if (loteAbierto !== 0 && lotePorcentaje !== 0) {
            const calcularCierreParcial = loteAbierto * lotePorcentaje / 100
            const loteRestanteParcial = loteAbierto - calcularCierreParcial

            loteCerrar.textContent = calcularCierreParcial.toFixed(2)
            loteRestante.textContent = loteRestanteParcial.toFixed(2)
            mensajes('Valido', true)
        } else {
            mensajes('Faltan datos', false)
        }
    }

    bloqueo() {
        this.bloqueado = !this.bloqueado

        if (this.bloqueado) {
            bloquear.classList.add('is-active')
            select.disabled = true
            dinero.readOnly = true
            sl.readOnly = true
            cuentaMultiple.disabled = true
            botones.forEach(boton => {
                boton.style.display = 'none'
            })
            mensajes('Se ha bloqueado la calculadora 🔒', true)
        } else {
            bloquear.classList.remove('is-active')
            select.disabled = false
            dinero.readOnly = false
            sl.readOnly = false
            cuentaMultiple.disabled = false
            botones.forEach(boton => {
                boton.style.display = 'flex'
            })
            mensajes('Se ha desbloqueado la calculadora 🔓', true)
        }
    }

    guardarParciales() {
        const primerParcial = Number(
            (primerCierrePersonalizado.value || '').replace('%', '').trim()
        )

        const segundoParcial = Number(
            (segundoCierrePersonalizado.value || '').replace('%', '').trim()
        )

        if (primerParcial > 0 && segundoParcial > 0 && primerParcial + segundoParcial <= 100) {
            localStorage.setItem('primerParcial', primerParcial)
            localStorage.setItem('segundoParcial', segundoParcial)
            this.parciales.primerParcial = primerParcial
            this.parciales.segundoParcial = segundoParcial
            panelParciales.setAttribute('hidden', '')
            panelParciales.classList.add('is-hidden')
            calcular.calcularLote()
            mensajes('Cierres guardados correctamente', true)
        } else {
            mensajes('Los cierres deben sumar 100% o menos', false)
        }
    }
}

class herramientasAdicionales{
    constructor(){
        this.rr = ratioRiesgo
        this.rr2 = ratioRiesgo2
    }

    get obtenerNivel(){
        return inputTp.value.trim()
    }

    set obtenerNivel(valor){
        inputTp.value = valor
    }

    get ratios(){
        return{
            primerRatio: this.rr,
            segundoRatio: this.rr2
        }
    }

    set ratios(valor){
        this.rr.textContent = valor
        this.rr2.textContent = valor
    }

    guardarTakeProfit(){
        let numero = 0

        for (let i = 0; i < this.obtenerNivel.length; i++) {
            numero = this.obtenerNivel[i];
        }

        localStorage.setItem('tp', numero)
        this.imprimirRatio()
        mensajes('Se ha guardado correctamente', true)
        panelTp.setAttribute('hidden', '')
        panelTp.classList.add('is-hidden')
    }

    imprimirRatio(){
        let obtenerTp = localStorage.getItem('tp')
        if(!obtenerTp){
           localStorage.setItem('tp', 2)
           obtenerTp = 2
        }
        let asingar = "1:" + obtenerTp
        this.ratios = asingar
        this.obtenerNivel = asingar
    }
}

let calcular = new Calculadora()
let herramientas = new herramientasAdicionales()

herramientas.imprimirRatio()

function limpiarDatos(){
    resultado2.textContent = '0.00'
    perdidaSL2.textContent = '$0.00'
    valorPuntoPip2.textContent = '—'
    primerCierre2.textContent = '0.00'
    segundoCierre2.textContent = '0.00'
    parSeleccionado2.textContent = '—'
    rr2.textContent = '1:3'
}

function calcularLote(pip, parSeleccionado){
    let par = parSeleccionado
    let valorPip = pip

    let division = 0
    let traerTp = 0
    let multirr = 0

    let parciales = 0
    let parciales2 = 0
    let restaParcial = 0

    const valor = parseFloat(dinero.value)
    const valorSL = parseFloat(sl.value)

    const { primerParcial, segundoParcial } = calcular.parciales

    let por = ("%")
    labelPartial1.textContent = primerParcial + por
    labelPartial2.textContent = segundoParcial + por
    labelPartial1_2.textContent = primerParcial + por
    labelPartial2_2.textContent = segundoParcial + por

    if(!isNaN(valor) && valor > 0 && (valorPip) && !isNaN(valorSL) && valorSL > 0){
        division = valor / (valorSL * valorPip)
        parciales = (division * primerParcial) / 100
        restaParcial = (division - parciales)
        parciales2 = (restaParcial * segundoParcial) / 100
        traerTp = localStorage.getItem('tp')
        multirr = valorSL * traerTp

        mensajes("Valido", true)
    }else{
        mensajes("Error: Faltan datos a mostar", false)
        return
    }

    if(mostrarMultiple){
        resultado2.textContent = division.toFixed(2)
        perdidaSL2.textContent = valor
        valorPuntoPip2.textContent = pip
        rr2.textContent = multirr
        parSeleccionado2.textContent = par
        primerCierre2.textContent = parciales.toFixed(2)
        segundoCierre2.textContent = parciales2.toFixed(2)
    }else{
        resultado.textContent = division.toFixed(2)
        perdidaSL.textContent = valor
        valorPuntoPip.textContent = pip
        rr.textContent = multirr
        parSeleccionado1.textContent = par
        resultadoCuenta1 = true
        riesgoCuenta1 = dinero.value
        primerCierre.textContent = parciales.toFixed(2)
        segundoCierre.textContent = parciales2.toFixed(2)
    }

    }

personalizarParciales.addEventListener('click', function(){
const estaOculto = panelParciales.hasAttribute('hidden')

    if(estaOculto){
        panelParciales.removeAttribute('hidden')
         panelParciales.classList.remove('is-hidden')
    }else{
        panelParciales.setAttribute('hidden', '')
        panelParciales.classList.add('is-hidden')
    }
})

personalizarTp.addEventListener('click', function(){
const estaOculto = panelTp.hasAttribute('hidden')

    if(estaOculto){
        panelTp.removeAttribute('hidden')
        panelTp.classList.remove('is-hidden')
    }else{
        panelTp.setAttribute('hidden', '')
        panelTp.classList.add('is-hidden')
    }
})

guardarParcialesPersonalizados.addEventListener('click', () => calcular.guardarParciales())

if (calcular.primerParcialGuardado > 0 && calcular.segundoParcialGuardado > 0) {
    primerCierrePersonalizado.value = calcular.primerParcialGuardado
    segundoCierrePersonalizado.value = calcular.segundoParcialGuardado
}

botones.forEach(boton => {
    boton.addEventListener('click', function () {
        dinero.value = boton.value
        calcular.calcularLote()
    })
})

bloquear.addEventListener('click', function () {
    calcular.bloqueo()
})


cuentaMultiple.addEventListener('click', function cuentaMultipleF() {
    if (mostrarMultiple) {
        mostrarMultiple = false
        cuentaMultiple.classList.remove('is-active')
        cuentaMultiple.setAttribute('aria-selected', 'false')
        dinero.value = riesgoCuenta1
        tituloResultado2.style.display = 'none'
        mostrarResultado.style.display = 'none'
        tituloParciales2.style.display = 'none'
        mostrarParciales2.style.display = 'none'
        limpiarDatos()
        mensajes("Cuenta multiple desactivada", true)
        calcular.calcularLote()
        return
    }

    if (resultadoCuenta1) {
        cuentaMultiple.classList.add('is-active')
        cuentaMultiple.setAttribute('aria-selected', 'true')
        riesgoCuenta1 = dinero.value
        dinero.value = ''
        tituloResultado2.style.display = 'block'
        mostrarResultado.style.display = 'grid'
        tituloParciales2.style.display = 'block'
        mostrarParciales2.style.display = 'grid'
        mostrarMultiple = true
        mensajes('Cuenta 1 guardada. Introduce los datos de la cuenta 2', true)
    } else {
        cuentaMultiple.classList.remove('is-active')
        cuentaMultiple.setAttribute('aria-selected', 'false')
        mensajes('Para poder utilizar la opción necestias ingresar la primera cuenta, llena los campos', false)
    }
})

guardarTp.addEventListener('click', () => {
    herramientas.guardarTakeProfit()
})

dinero.addEventListener('input', () => calcular.calcularLote())
sl.addEventListener('input', () => calcular.calcularLote())
select.addEventListener('change', () => calcular.actualizarPar())
loteAbiertoInput.addEventListener('input', () => calcular.calcularParciales())
lotePorcentajeInput.addEventListener('input', () => calcular.calcularParciales())

calcular.calcularLote()