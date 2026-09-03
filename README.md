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

* Dinero que quieres arriesgar.
* Distancia del Stop Loss.
* Valor del pip o punto del instrumento.
* Instrumento o par seleccionado.

El objetivo es evitar cálculos manuales y conocer rápidamente cuánto se está arriesgando antes de abrir una operación.

---

## Funcionalidades

* Cálculo automático del tamaño de lote.
* Cálculo del riesgo monetario.
* Cálculo del valor por pip.
* Riesgo simplificado mediante una cantidad fija de dinero.
* Botones rápidos para seleccionar riesgos de `$25`, `$50`, `$100` o `$200`.
* Opción para trabajar con una segunda cuenta y consultar sus resultados por separado.
* Cálculo de cierres parciales del 33% en los niveles 1:1 y 1:2.
* Calculadora de cierre personalizado según el lotaje abierto y el porcentaje elegido.
* Bloqueo de la calculadora para evitar cambios accidentales en los datos.
* Indicador visual del estado de la calculadora y de la validación de los datos.
* Soporte para diferentes pares e instrumentos financieros.
* Resultados calculados directamente en el navegador.
* Interfaz sencilla y responsive.

---

## Instrumentos

La calculadora permite trabajar con los siguientes instrumentos:

| Instrumento | Valor por pip/punto |
| ----------- | ------------------- |
| EURUSD      | 10                  |
| GBPUSD      | 10                  |
| AUDUSD      | 10                  |
| USDCAD      | 7.19                |
| USDCHF      | 12.35               |
| XAUUSD      | 100                 |
| USTEC       | 1                   |
| USTEC-BULLFY| 100                 |

---

## Cómo utilizarla

### 1. Seleccionar el instrumento

Selecciona el par o instrumento financiero sobre el que quieres realizar el cálculo.

### 2. Introducir el riesgo

Introduce directamente la cantidad de dinero que quieres arriesgar o utiliza uno de los botones rápidos disponibles.

### 3. Introducir el Stop Loss

Indica la distancia del Stop Loss en pips.

### 4. Consultar el resultado

La calculadora mostrará automáticamente:

* Tamaño de lote.
* Dinero arriesgado.
* Pérdida estimada.
* Valor por pip/punto.
* Par o instrumento seleccionado.

### 5. Usar una segunda cuenta

Cuando la primera cuenta tenga datos válidos, activa **Cuenta multiple**. La calculadora mostrará un segundo bloque para introducir el riesgo de la otra cuenta y calcular sus resultados de forma independiente.

### 6. Calcular cierres parciales

El resultado principal incluye dos cierres parciales del 33% del lotaje: uno en 1:1 y otro en 1:2.

También puedes utilizar la calculadora de cierre personalizado. Introduce el lotaje total abierto y el porcentaje que quieres cerrar para conocer cuánto cerrar y cuánto lote quedará restante.

### 7. Bloquear la calculadora

Pulsa **Bloquear** cuando termines de introducir los datos. Esta opción desactiva los campos principales, la selección del instrumento, los botones rápidos y el modo de segunda cuenta hasta que vuelvas a desbloquearla.

---

## Ejemplo

Supongamos una operación con:

```text
Dinero a arriesgar: $100
Instrumento:       EURUSD
Stop Loss:     50 pips
```

Como el EURUSD tiene un valor de 10 por pip para un lote, la calculadora mostrará un tamaño aproximado de **0.20 lotes**.

---

## Tecnologías

El proyecto está desarrollado utilizando tecnologías web estándar:

* **HTML5** — estructura de la aplicación.
* **CSS3** — diseño y estilos.
* **JavaScript** — cálculos y lógica de la aplicación.
* **GitHub Pages** — despliegue.

No requiere backend ni base de datos.

## Versión

Versión actual: **1.0.7**.

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
