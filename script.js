
const select = document.getElementById('pairSelect')

const riesgoSelect = document.getElementById('riskPercentSelect')

const riesgo = document.getElementById('riskAmountInput')
const sl = document.getElementById('slPipsInput')
const resultado = document.getElementById('lotResult')

const valorPuntoPip = document.getElementById('valuePerPointResult')
const perdidaSL = document.getElementById('lossResult')

const resultado2 = document.getElementById('lotResult2')
const perdidaSL2 = document.getElementById('lossResult2')

const botones = document.querySelectorAll('.chip')


const primerCierre = document.getElementById('partial1R')
const segundoCierre = document.getElementById('partial2R')
const primerCierre2 = document.getElementById('partial1R2')
const segundoCierre2 = document.getElementById('partial2R2')

const loteAbiertoInput = document.getElementById('customLotInput')
const lotePorcentajeInput = document.getElementById('customPercentInput')
const loteRestante = document.getElementById('customRemainingResult')
const loteCerrar = document.getElementById('customCloseResult')

const status = document.querySelector(".header-status");
const statusPillText = document.getElementById("statusPillText");

const chart = document.getElementById('riskValue')

const cuentaMultiple = document.getElementById('cuentaMultiple')

const mostrarResultado = document.getElementById('mostrarResultado2')
const tituloResultado2 = document.getElementById('tituloResultado2')
const mostrarParciales2 = document.getElementById('mostrarParciales2')
const tituloParciales2 = document.getElementById('mostarParciales2')
const valorPuntoPip2 = document.getElementById('valuePerPointResult2')

let resultadoCuenta1 = false
let mostrarMultiple = false
let riesgoCuenta1 = ""

botones.forEach(boton => {
    boton.addEventListener('click', function(){
        let dinerSelect = this.value
        riesgo.value = dinerSelect
    })
});


cuentaMultiple.addEventListener('click', function cuentaMultipleF(){

    if (mostrarMultiple) {
        mostrarMultiple = false
        cuentaMultiple.classList.remove('is-active')
        cuentaMultiple.setAttribute('aria-selected', 'false')
        riesgo.value = riesgoCuenta1
        tituloResultado2.style.display = "none"
        mostrarResultado.style.display = "none"
        tituloParciales2.style.display = "none"
        mostrarParciales2.style.display = "none"
        resultado2.textContent = "0.00"
        perdidaSL2.textContent = "$0.00"
        valorPuntoPip2.textContent = "—"
        primerCierre2.textContent = "0.00"
        segundoCierre2.textContent = "0.00"
        statusPillText.textContent = "Cuenta multiple desactivada"
        calcularLote()
        return
    }

    if (resultadoCuenta1) {
        cuentaMultiple.classList.add('is-active')
        cuentaMultiple.setAttribute('aria-selected', 'true')
        statusPillText.textContent = "Haz seleccionado cuenta multiple, introduce los valores de la segunda cuenta"
        riesgoCuenta1 = riesgo.value
        riesgo.value = ""
        tituloResultado2.style.display = "block"
        mostrarResultado.style.display = "grid"
        tituloParciales2.style.display = "block"
        mostrarParciales2.style.display = "grid"
        mostrarMultiple = true
        calcularLote()
    }else{
            cuentaMultiple.classList.remove('is-active')
            cuentaMultiple.setAttribute('aria-selected', 'false')
            statusPillText.textContent = "Para poder utilizar la opción necestias ingresar la primera cuenta, llena los campos"
    }
})

function calcularLote(){
    const valorPip = parseFloat(select.value)
    const valorRiesgoSelect = parseFloat(riesgoSelect.value)
    const valorRiesgo = parseFloat(riesgo.value)
    const valorSL = parseFloat(sl.value)

    valorPuntoPip.textContent = isNaN(valorPip) ? "—" : valorPip
    valorPuntoPip2.textContent = isNaN(valorPip) ? "—" : valorPip

    if(mostrarMultiple){
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

                let partial1 = 0
                let partial2 = 0
                let lotaje = 0
                
                if(division!== 0){
                    partial1 = (division * 33) / 100
                    primerCierre2.textContent = partial1.toFixed(2)

                    lotaje = division - partial1   

                    partial2 = (lotaje * 33 / 100)
                    segundoCierre2.textContent = partial2.toFixed(2)
                }else{
                status.classList.remove("is-invalid");
                status.classList.add("is-valid");
                statusPillText.textContent = "Valido ✅";
                resultado2.textContent = division.toFixed(2)
                }
                
        }else{
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
                
                if(division!== 0){
                    partial1 = (division * 33) / 100
                    primerCierre.textContent = partial1.toFixed(2)

                    lotaje = division - partial1   

                    partial2 = (lotaje * 33 / 100)
                    segundoCierre.textContent = partial2.toFixed(2)
                }


                status.classList.remove("is-invalid");
                status.classList.add("is-valid");
                statusPillText.textContent = "Valido ✅";
                resultadoCuenta1 = true
                riesgoCuenta1 = riesgo.value
                resultado.textContent = division.toFixed(2)
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

calcularLote()
calcularParciales()

select.addEventListener('change', calcularLote);
riesgo.addEventListener('input', calcularLote);
riesgoSelect.addEventListener('input', calcularLote);
sl.addEventListener('input', calcularLote);

botones.forEach(boton => {
    boton.addEventListener('click', calcularLote)
})

loteAbiertoInput.addEventListener('input', calcularParciales);
lotePorcentajeInput.addEventListener('input', calcularParciales);



