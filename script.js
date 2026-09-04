// Usuario
const welcome = document.getElementById('welcomeModal')
const welcomeInput = document.getElementById('welcomeName')
const welcomeEntrar = document.getElementById('welcomeEntrar')
const nombre = document.getElementById('userNameDisplay')

// Entradas
const select = document.getElementById('pairSelect')
const riesgoSelect = document.getElementById('riskPercentSelect')
const riesgo = document.getElementById('riskAmountInput')
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

// Estado interfaz
const status = document.querySelector('.header-status')
const statusPillText = document.getElementById('statusPillText')
const mostrarResultado = document.getElementById('mostrarResultado2')
const tituloResultado2 = document.getElementById('tituloResultado2')
const mostrarParciales2 = document.getElementById('mostrarParciales2')
const tituloParciales2 = document.getElementById('mostarParciales2')

//versión
const footer = document.getElementById('footer')

footer.append(
document.createElement("br"),
'Versión 1.0.9'
)

//Herramientas adicionales
const personalizarParciales = document.getElementById('toggleCustomPartials')
const panelParciales = document.getElementById('customPartialsPanel')
const primerCierrePersonalizado = document.getElementById('firstPartialInput')
const segundoCierrePersonalizado = document.getElementById('secondPartialInput')
const guardarParcialesPersonalizados = document.getElementById('saveCustomPartials')

//Horario
const horario = document.getElementById('hora')
const sesion = document.getElementById('sesion')

if(localStorage.getItem('usuario')){
        nombre.textContent = localStorage.getItem('usuario')
}

function mostrarBienvenida() { 
    const usuario = localStorage.getItem('usuario')
    if (!usuario) {
        welcome.removeAttribute('hidden')  
    }else{
        welcome.setAttribute('hidden', '')
    }
}

function actualizarHora() {
    const config = {
        timeZone: 'America/Bogota',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }

    const configDia = {
        timeZone: 'America/Bogota',
        weekday: 'long',
    }

    const formateador = new Intl.DateTimeFormat('es-CO', config)
    const formateadorDia = new Intl.DateTimeFormat('es-CO', configDia)

    const obtenerHora = formateador.format(new Date())
    const obtenerDia = formateadorDia.format(new Date())

    if (obtenerDia == "viernes" && obtenerHora >= "5:00:00 p.m." || obtenerDia === "sábado" || obtenerDia === "domingo" && obtenerHora <= "5:00:00 p. m.") {
        sesion.textContent = "Cerrado"
    }else{
        if (obtenerHora >= "2:00:00 a. m." && obtenerHora <= "5:00:00 a. m.") {
            sesion.textContent = "Londres"
        }else if (obtenerHora >= "7:00:00 a. m." && obtenerHora <= "12:00:00 p. m."){
            sesion.textContent = "Nueva York"
        }else{
            sesion.textContent = "Sesion Asiatica"
        }
    }
    document.getElementById('hora').textContent = obtenerHora
}

// Calculadora
let bloqueado = false
let resultadoCuenta1 = false
let mostrarMultiple = false
let riesgoCuenta1 = ''
let valorPip = 0


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


let valorPipTable = 0
let nombrePar = ''


function actualizarPar() {
    const opcionElegida = select.value

    const selectPar = informacionPares[opcionElegida] || {valorPip: 0, par: "-"}

    valorPipTable = selectPar.valorPip
    nombrePar = selectPar.par
    calcularLote()
}

function calcularLote(){

    valorPip = valorPipTable

    const valorRiesgoSelect = parseFloat(riesgoSelect.value)
    const valorRiesgo = parseFloat(riesgo.value)
    const valorSL = parseFloat(sl.value)

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
            if (!isNaN(valorRiesgo) && valorRiesgo > 0 ){
                division = valorRiesgo / (valorSL * valorPip)
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
                const primerPorcentaje = primerParcialGuardado > 0 ? primerParcialGuardado : 33
                const segundoPorcentaje = segundoParcialGuardado > 0 ? segundoParcialGuardado : 33

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
            if (!isNaN(valorRiesgo) && valorRiesgo > 0 ){
                division = valorRiesgo / (valorSL * valorPip)
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
                const primerPorcentaje = primerParcialGuardado > 0 ? primerParcialGuardado : 33
                const segundoPorcentaje = segundoParcialGuardado > 0 ? segundoParcialGuardado : 33
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
                return
        }
        }

function calcularParciales(){
    const loteAbierto = parseFloat(loteAbiertoInput.value)
    const lotePorcentaje = Number(lotePorcentajeInput.value)

    let calcularCierreParcial = 0
    let loteRestanteParcial = 0

    if (loteAbierto !== 0 && lotePorcentaje !== 0){

        calcularCierreParcial = loteAbierto * lotePorcentaje / 100
        loteRestanteParcial = loteAbierto - calcularCierreParcial

        loteCerrar.textContent = calcularCierreParcial.toFixed(2)
        loteRestante.textContent = loteRestanteParcial.toFixed(2)
        status.classList.remove("is-invalid");
        status.classList.add("is-valid");
        statusPillText.textContent = "Valido ✅";
    }else{
        status.classList.remove("is-valid");
        status.classList.add("is-invalid");
        statusPillText.textContent = "Faltan Datos"; 
        return
    }



}

//Eventos
welcomeEntrar.addEventListener('click', function(){
    const nombreIngresado = welcomeInput.value.trim()

    if(nombreIngresado !== ""){
        localStorage.setItem('usuario', nombreIngresado)
        nombre.textContent = localStorage.getItem('usuario')
        welcome.setAttribute('hidden', '')
    }
}) 

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

guardarParcialesPersonalizados.addEventListener('click', function(){
    const primerParcial = Number(
        primerCierrePersonalizado.value.replace('%', '').trim()
    )

    const segundoParcial = Number(
        segundoCierrePersonalizado.value.replace('%', '').trim()
    )

    if (primerParcial > 0 && segundoParcial > 0 && primerParcial + segundoParcial <= 100) {
        localStorage.setItem('primerParcial', primerParcial)
        localStorage.setItem('segundoParcial', segundoParcial)
        primerParcialGuardado = primerParcial
        segundoParcialGuardado = segundoParcial
        panelParciales.setAttribute('hidden', '')
        panelParciales.classList.add('is-hidden')
        calcularLote()
        status.classList.remove('is-invalid')
        status.classList.add('is-valid')
        statusPillText.textContent = "Cierres guardados correctamente"
    } else {
        status.classList.remove('is-valid')
        status.classList.add('is-invalid')
        statusPillText.textContent = "Los cierres deben sumar 100% o menos"
    }
})

let primerParcialGuardado = Number(localStorage.getItem('primerParcial'))
let segundoParcialGuardado = Number(localStorage.getItem('segundoParcial'))

if (primerParcialGuardado > 0 && segundoParcialGuardado > 0) {
    primerCierrePersonalizado.value = primerParcialGuardado
    segundoCierrePersonalizado.value = segundoParcialGuardado
}

botones.forEach(boton => {
    boton.addEventListener('click', function () {
        const dinerSelect = this.value
        riesgo.value = dinerSelect
        calcularLote()
    })
})

bloquear.addEventListener('click', function () {
    if (bloqueado) {
        bloqueado = false
        bloquear.classList.remove('is-active')
        select.disabled = false
        riesgo.readOnly = false
        sl.readOnly = false
        cuentaMultiple.disabled = false

        botones.forEach(boton => {
            boton.style.display = 'flex'
        })

        status.classList.remove('is-valid')
        status.classList.remove('is-invalid')
        statusPillText.textContent = 'Se ha desbloqueado la calculadora 🔓'
    } else {
        bloqueado = true
        bloquear.classList.add('is-active')
        select.disabled = true
        riesgo.readOnly = true
        sl.readOnly = true
        cuentaMultiple.disabled = true

        botones.forEach(boton => {
            boton.style.display = 'none'
        })

        status.classList.remove('is-invalid')
        status.classList.add('is-valid')
        statusPillText.textContent = 'Se ha bloqueado la calculadora 🔒'
    }
})

cuentaMultiple.addEventListener('click', function cuentaMultipleF() {
    if (mostrarMultiple) {
        mostrarMultiple = false
        cuentaMultiple.classList.remove('is-active')
        cuentaMultiple.setAttribute('aria-selected', 'false')
        riesgo.value = riesgoCuenta1
        tituloResultado2.style.display = 'none'
        mostrarResultado.style.display = 'none'
        tituloParciales2.style.display = 'none'
        mostrarParciales2.style.display = 'none'
        resultado2.textContent = '0.00'
        perdidaSL2.textContent = '$0.00'
        valorPuntoPip2.textContent = '—'
        primerCierre2.textContent = '0.00'
        segundoCierre2.textContent = '0.00'
        statusPillText.textContent = 'Cuenta multiple desactivada'
        calcularLote()
        return
    }

    if (resultadoCuenta1) {
        cuentaMultiple.classList.add('is-active')
        cuentaMultiple.setAttribute('aria-selected', 'true')
        statusPillText.textContent = 'Haz seleccionado cuenta multiple, introduce los valores de la segunda cuenta'
        riesgoCuenta1 = riesgo.value
        riesgo.value = ''
        tituloResultado2.style.display = 'block'
        mostrarResultado.style.display = 'grid'
        tituloParciales2.style.display = 'block'
        mostrarParciales2.style.display = 'grid'
        mostrarMultiple = true
    } else {
        cuentaMultiple.classList.remove('is-active')
        cuentaMultiple.setAttribute('aria-selected', 'false')
        statusPillText.textContent = 'Para poder utilizar la opción necestias ingresar la primera cuenta, llena los campos'
    }
})

riesgo.addEventListener('input', () => calcularLote())
riesgoSelect.addEventListener('input', () => calcularLote())
sl.addEventListener('input', () => calcularLote())
select.addEventListener('change', actualizarPar)
loteAbiertoInput.addEventListener('input', calcularParciales)
lotePorcentajeInput.addEventListener('input', calcularParciales)


calcularLote()
calcularParciales()

actualizarHora()
setInterval(actualizarHora, 1000)

mostrarBienvenida()

