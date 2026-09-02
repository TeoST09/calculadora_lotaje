
const select = document.getElementById('pairSelect')

const riesgoSelect = document.getElementById('riskPercentSelect')

const riesgo = document.getElementById('riskAmountInput')
const sl = document.getElementById('slPipsInput')
const resultado = document.getElementById('lotResult')

const valorPuntoPip = document.getElementById('valuePerPointResult')
const perdidaSL = document.getElementById('lossResult')

const botones = document.querySelectorAll('.chip')



const primerCierre = document.getElementById('partial1R')
const segundoCierre = document.getElementById('partial2R')


const loteAbiertoInput = document.getElementById('customLotInput')
const lotePorcentajeInput = document.getElementById('customPercentInput')
const loteRestante = document.getElementById('customRemainingResult')
const loteCerrar = document.getElementById('customCloseResult')

const status = document.querySelector(".header-status");
const statusPillText = document.getElementById("statusPillText");

const chart = document.getElementById('riskValue')

botones.forEach(boton => {
    boton.addEventListener('click', function(){
        let dinerSelect = this.value
        riesgo.value = dinerSelect
    })
});

function calcularLote(){
    const valorPip = parseFloat(select.value)
    const valorRiesgoSelect = parseFloat(riesgoSelect.value)
    const valorRiesgo = parseFloat(riesgo.value)
    const valorSL = parseFloat(sl.value)


    valorPuntoPip.textContent = valorPip


    if(isNaN(valorPip) || isNaN(valorSL)){
        status.classList.remove("is-valid");
        status.classList.add("is-invalid");
        statusPillText.textContent = "Faltan datos esenciales";
        return
    }else

    if (riesgoSelect !== "") {
        perdidaSL.textContent = valorRiesgo
    }else{
        perdidaSL.textContent = valorRiesgoSelect
    }

    let division = 0
    console.log("Entra")
    if (!isNaN(valorRiesgo) && valorRiesgo > 0 ){
        division = valorRiesgo / (valorSL * valorPip)
        }
        else if (!isNaN(valorRiesgoSelect) && valorRiesgoSelect > 0 ){
            console.log("Aqui estamos")
            division = valorRiesgoSelect / (valorSL * valorPip)
            }
        else{
            status.classList.remove("is-valid");
            status.classList.add("is-invalid");
            statusPillText.textContent = "Datos incompletos";
            resultado.textContent = "Datos incompletos"
            return
        }

        let partial1 = 0
        let partial2 = 0
        let lotaje = 0
        
        if(division!== 0){
            console.log("hola")
            partial1 = (division * 33) / 100
            primerCierre.textContent = partial1.toFixed(2)

            lotaje = division - partial1   

            partial2 = (lotaje * 33 / 100)
            segundoCierre.textContent = partial2.toFixed(2)
        }


        status.classList.remove("is-invalid");
        status.classList.add("is-valid");
        statusPillText.textContent = "Valido ✅";
        resultado.textContent = division.toFixed(2)
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



