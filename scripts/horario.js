const horario = document.getElementById('hora')
const sesion = document.getElementById('sesion')


class MercadoHora {
    constructor() {
        this.horaEl = document.getElementById('hora')
        this.sesionEl = document.getElementById('sesion')
    }

    actualizarHora() {
        const config = {
            timeZone: 'America/Bogota',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }

        const configDia = {
            timeZone: 'America/Bogota',
            weekday: 'long'
        }

        const formateador = new Intl.DateTimeFormat('es-CO', config)
        const formateadorDia = new Intl.DateTimeFormat('es-CO', configDia)

        const obtenerHora = formateador.format(new Date())
        const obtenerDia = formateadorDia.format(new Date())
        const parte = formateador.formatToParts(new Date())
        const partePeriodo = parte.find(parte => parte.type === 'dayPeriod')
        const obtenerAmPm = partePeriodo ? partePeriodo.value : ''
        const horaActualC = parseInt(obtenerHora.split(':')[0])

        if ((obtenerDia === 'viernes' && horaActualC >= 5 && obtenerAmPm === 'p. m.') ||
            obtenerDia === 'sábado' ||
            (obtenerDia === 'domingo' && horaActualC <= 5 && obtenerAmPm === 'p. m.')) {
            this.sesionEl.textContent = 'Cerrado'
        } else {
            if (obtenerAmPm === 'a. m.') {
                if (horaActualC >= 2 && horaActualC < 5) {
                    this.sesionEl.textContent = 'Londres'
                } else if (horaActualC >= 7 && horaActualC < 12) {
                    this.sesionEl.textContent = 'Nueva York'
                }
            } else {
                this.sesionEl.textContent = 'Sesion Asiática'
            }
        }

        this.horaEl.textContent = obtenerHora
    }
}

let hora = new MercadoHora()

hora.actualizarHora()
setInterval(() => hora.actualizarHora(), 1000)