
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
const primerCierrePersonalizado = document.getElementById('firstPartialInput')
const segundoCierrePersonalizado = document.getElementById('secondPartialInput')
const guardarParcialesPersonalizados = document.getElementById('saveCustomPartials')


let bloqueado = false
let resultadoCuenta1 = false
let mostrarMultiple = false
let riesgoCuenta1 = ''
let valorPip = 0
let valorPipTable = 0
let nombrePar = ''


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
        this.primerParcialGuardado = Number(localStorage.getItem('primerParcial'))
        this.segundoParcialGuardado = Number(localStorage.getItem('segundoParcial'))
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
            status.classList.remove('is-invalid')
            status.classList.add('is-valid')
            statusPillText.textContent = 'Valido ✅'
        } else {
            status.classList.remove('is-valid')
            status.classList.add('is-invalid')
            statusPillText.textContent = 'Faltan Datos'
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
            status.classList.remove('is-invalid')
            status.classList.add('is-valid')
            statusPillText.textContent = 'Se ha bloqueado la calculadora 🔒'
        } else {
            bloquear.classList.remove('is-active')
            select.disabled = false
            dinero.readOnly = false
            sl.readOnly = false
            cuentaMultiple.disabled = false
            botones.forEach(boton => {
                boton.style.display = 'flex'
            })
            status.classList.remove('is-valid')
            status.classList.remove('is-invalid')
            statusPillText.textContent = 'Se ha desbloqueado la calculadora 🔓'
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
            this.primerParcialGuardado = primerParcial
            this.segundoParcialGuardado = segundoParcial
            panelParciales.setAttribute('hidden', '')
            panelParciales.classList.add('is-hidden')
            calcular.calcularLote()
            status.classList.remove('is-invalid')
            status.classList.add('is-valid')
            statusPillText.textContent = 'Cierres guardados correctamente'
        } else {
            status.classList.remove('is-valid')
            status.classList.add('is-invalid')
            statusPillText.textContent = 'Los cierres deben sumar 100% o menos'
        }
    }
}

let calcular = new Calculadora()


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

    let division = 0
    valorPip = pip
    let multirr = 0
    let par = parSeleccionado

    //riesgo a calcular
    //dinero
    const valor = parseFloat(dinero.value)
    //riesgo
    const valorSL = parseFloat(sl.value)

    if(!isNaN(valor) && valor > 0 && (valorPip) && !isNaN(valorSL) && valorSL > 0){
        division = valor / (valorSL * valorPip)
        division.toFixed(3)
        multirr = valorSL * 3
        mensajes("Valido", true)
    }else{
        mensajes("Error: Faltan datos a mostar", false)
        return
    }

    if(mostrarMultiple){
        resultado2.textContent = division.toFixed(3)
        perdidaSL2.textContent = valor
        valorPuntoPip2.textContent = pip
        rr2.textContent = multirr
        parSeleccionado2.textContent = par
    }else{
        resultado.textContent = division.toFixed(3)
        perdidaSL.textContent = valor
        valorPuntoPip.textContent = pip
        rr.textContent = multirr
        parSeleccionado1.textContent = par
        resultadoCuenta1 = true
        riesgoCuenta1 = dinero.value
    }

    /*

    if(mostrarMultiple){
        valorPuntoPip2.textContent = isNaN(valorPip) ? "—" : valorPip
         if(isNaN(valorPip) || isNaN(valorSL)){
                status.classList.remove("is-valid");
                status.classList.add("is-invalid");
                statusPillText.textContent = "Faltan datos esenciales";
                return
            }

            perdidaSL2.textContent = !isNaN(valorRiesgo) ? valorRiesgo : "$0.00"

            let division = 0
            let multiplicacionrr = 0
            if (!isNaN(valorRiesgo) && valorRiesgo > 0 ){
                division = valorRiesgo / (valorSL * valorPip)
                multiplicacionrr = valorSL * 3
                }
                else{
                    status.classList.remove("is-valid");
                    status.classList.add("is-invalid");
                    statusPillText.textContent = "Datos incompletos";
                    resultado2.textContent = "Datos incompletos"
                    return
                    }

                resultado2.textContent = division.toFixed(2)
                status.classList.remove("is-invalid");
                status.classList.add("is-valid");
                statusPillText.textContent = "Valido ✅";
                parSeleccionado2.textContent = nombrePar

                let partial1 = 0
                let partial2 = 0
                let lotaje = 0
                const primerPorcentaje = calcular.primerParcialGuardado > 0 ? calcular.primerParcialGuardado : 33
                const segundoPorcentaje = calcular.segundoParcialGuardado > 0 ? calcular.segundoParcialGuardado : 33

                labelPartial1_2.textContent = `${primerPorcentaje}% a cerrar en 1:1`
                labelPartial2_2.textContent = `${segundoPorcentaje}% a cerrar en 1:2`
                
                if(division!== 0){
                    partial1 = (division * primerPorcentaje) / 100
                    primerCierre2.textContent = partial1.toFixed(2)

                    lotaje = division - partial1   

                    partial2 = (lotaje * segundoPorcentaje) / 100
                    segundoCierre2.textContent = partial2.toFixed(2)
                }else{
                status.classList.remove("is-invalid");
                status.classList.add("is-valid");
                statusPillText.textContent = "Valido ✅";
                resultado2.textContent = division.toFixed(2)
                }
                rr2.textContent = multiplicacionrr
                
        }else{
        valorPuntoPip.textContent = valorPip || "—";
        if(isNaN(valorPip) || isNaN(valorSL)){
                status.classList.remove("is-valid");
                status.classList.add("is-invalid");
                statusPillText.textContent = "Faltan datos esenciales";
                resultadoCuenta1 = false
                return
            }

            if (!isNaN(valorRiesgo)) {
                perdidaSL.textContent = valorRiesgo
            }else{
                perdidaSL.textContent = valorRiesgoSelect
            }

            let division = 0
            let multiplicacionrr = 0
            if (!isNaN(valorRiesgo) && valorRiesgo > 0 ){
                division = valorRiesgo / (valorSL * valorPip)
                multiplicacionrr = valorSL * 3
                }
                else if (!isNaN(valorRiesgoSelect) && valorRiesgoSelect > 0 ){
                    division = valorRiesgoSelect / (valorSL * valorPip)
                    }
                else{
                    status.classList.remove("is-valid");
                    status.classList.add("is-invalid");
                    statusPillText.textContent = "Datos incompletos";
                    resultado.textContent = "Datos incompletos"
                    resultadoCuenta1 = false
                    return
                }

                let partial1 = 0
                let partial2 = 0
                let lotaje = 0
                const primerPorcentaje = calcular.primerParcialGuardado > 0 ? calcular.primerParcialGuardado : 33
                const segundoPorcentaje = calcular.segundoParcialGuardado > 0 ? calcular.segundoParcialGuardado : 33
                labelPartial1.textContent = `${primerPorcentaje}% a cerrar en 1:1`
                labelPartial2.textContent = `${segundoPorcentaje}% a cerrar en 1:2`

                if(division !== 0){
                    partial1 = (division * primerPorcentaje) / 100

                    lotaje = division - partial1

                    partial2 = (lotaje * segundoPorcentaje) / 100
                }
                primerCierre.textContent = partial1.toFixed(2)
                segundoCierre.textContent = partial2.toFixed(2)

                status.classList.remove("is-invalid");
                status.classList.add("is-valid");
                statusPillText.textContent = "Valido ✅";
                resultadoCuenta1 = true
                riesgoCuenta1 = riesgo.value
                resultado.textContent = division.toFixed(2)
                parSeleccionado1.textContent = nombrePar
                rr.textContent = multiplicacionrr
                return
        } */
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


dinero.addEventListener('input', () => calcular.calcularLote())
sl.addEventListener('input', () => calcular.calcularLote())
select.addEventListener('change', () => calcular.actualizarPar())
loteAbiertoInput.addEventListener('input', () => calcular.calcularParciales())
lotePorcentajeInput.addEventListener('input', () => calcular.calcularParciales())

calcular.calcularLote()