# 1% — Calculadora de Lotaje y Gestión de Riesgo

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge\&logo=github\&logoColor=white)](https://pages.github.com/)

> Calculadora web para determinar el tamaño de lote de una operación en función del riesgo y la distancia al Stop Loss.

[**Demo**](https://teost09.github.io/calculadora_lotaje/)

---

## Descripción

**1%** es una calculadora web diseñada para traders que quieren gestionar de forma sencilla el riesgo de sus operaciones.

La herramienta permite calcular el tamaño de posición teniendo en cuenta:

* Capital disponible.
* Porcentaje de riesgo.
* Dinero máximo a arriesgar.
* Instrumento o par de divisas.

El objetivo es evitar cálculos manuales y conocer rápidamente cuánto se está arriesgando antes de abrir una operación.

---

## Funcionalidades

* Cálculo automático del tamaño de lote.
* Cálculo del riesgo monetario.
* Cálculo del porcentaje de capital en riesgo.
* Cálculo del valor por pip.
* Dos modos de cálculo de riesgo:

  * **Riesgo simplificado**
  * **Riesgo completo**
* Soporte de diferentes instrumentos financieros.
* Indicador visual del nivel de riesgo.
* Resultados calculados directamente en el navegador.
* Interfaz sencilla y responsive.

---

## Instrumentos

La calculadora permite trabajar con diferentes instrumentos, entre ellos:

| Instrumento | Ejemplo                        |
| ----------- | ------------------------------ |
| Forex       | EURUSD                         |
| Forex       | GBPUSD                         |
| Forex       | AUDUSD                         |
| Forex       | USDCHF                         |
| Forex       | USDCAD                         |
| Forex       | NASDAQ                         |
| Otros       | Según configuración disponible |

---

## Cómo utilizarla

### 1. Seleccionar el instrumento

Selecciona el par o instrumento financiero sobre el que quieres realizar el cálculo.

### 2. Seleccionar el tipo de riesgo

Puedes elegir entre los diferentes modos disponibles:

* **Riesgo simplificado:** introduces directamente la cantidad de dinero que quieres arriesgar.
* **Riesgo completo:** introduces el capital disponible y el porcentaje de riesgo.

### 3. Introducir el Stop Loss

Indica la distancia del Stop Loss en pips.

### 4. Consultar el resultado

La calculadora mostrará automáticamente:

* Tamaño de lote.
* Dinero arriesgado.
* Pérdida estimada.
* Valor por pip/punto.
* Porcentaje del capital en riesgo.

---

## Ejemplo

Supongamos una cuenta con:

```text
Capital:       $1,000
Riesgo:        1%
Riesgo máximo: $10
Stop Loss:     50 pips
```

La calculadora utilizará estos valores junto con el instrumento seleccionado para determinar el tamaño de posición correspondiente.

---

## Tecnologías

El proyecto está desarrollado utilizando tecnologías web estándar:

* **HTML5** — estructura de la aplicación.
* **CSS3** — diseño y estilos.
* **JavaScript** — cálculos y lógica de la aplicación.
* **GitHub Pages** — despliegue.

No requiere backend ni base de datos.

---

## Estructura del proyecto

```text
calculadora_de_lotaje/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## Ejecutar localmente

Clona el repositorio:

```bash
git clone https://github.com/teost09/calculadora_de_lotaje.git
```

Accede al directorio:

```bash
cd calculadora_de_lotaje
```

Después puedes abrir `index.html` directamente en el navegador o utilizar **Live Server** desde Visual Studio Code.

---

## Demo

La aplicación está desplegada mediante GitHub Pages:

**https://teost09.github.io/calculadora_lotaje/**

---

## Gestión del riesgo

La calculadora está pensada como una herramienta de apoyo para establecer el tamaño de una posición en función del riesgo asumido de una manera rápida y efectiva. 

El flujo básico es:

```text
Capital
   ↓
Porcentaje de riesgo
   ↓
Dinero máximo a arriesgar
   ↓
Stop Loss
   ↓
Tamaño de posición
```

Esto permite conocer de antemano el riesgo aproximado de una operación antes de ejecutarla.

---

## Contribuciones

Las contribuciones son bienvenidas.

Si quieres mejorar el proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva rama.
3. Realiza los cambios.
4. Haz un Pull Request.

También puedes abrir un Issue para informar de errores o proponer nuevas funcionalidades.

---

## Aviso

Esta aplicación es una herramienta de apoyo para realizar cálculos relacionados con la gestión del riesgo.

Los resultados pueden variar dependiendo del broker, instrumento, tipo de cuenta, valor del pip/punto, spreads, comisiones y otras condiciones de mercado.

**La calculadora no constituye asesoramiento financiero ni una recomendación de inversión. El trading implica riesgo de capital**

---

## Autor

**teost09**

[![GitHub](https://img.shields.io/badge/GitHub-teost09-181717?style=for-the-badge\&logo=github)](https://github.com/teost09)

---

<div align="center">

### 1% — Calculadora de Lotaje y Gestión de Riesgo

[![GitHub Pages](https://img.shields.io/badge/Ver%20proyecto-GitHub%20Pages-222222?style=for-the-badge\&logo=github)](https://teost09.github.io/calculadora_de_lotaje/)

</div>
