export const ChartGeneralVel = {
    title: {
        text: 'VELOCIDAD'
    },
    yAxis: {
        title: {
            text: ''
        },
        min: 0 // this sets minimum values of y to 0
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            hour: '%H h',
        },
    },
    series: []
};
export const ChartGeneralCon = {
    plotOptions: {
        column: {
            borderRadius: 8
        }
    },
    chart: {
        plotBorderWidth: null,
        plotShadow: false,
        type: 'bar'
    },
    title: {
        text: 'CONSUMO'
    },
    yAxis: {
        title: {
            text: ''
        },
        min: 0 // this sets minimum values of y to 0
    },
    xAxis: {
        categories: ['']
    },
    series: []
};
export const ChartGeneralVia = {
    title: {
        text: 'VIAJEROS'
    },
    chart: {
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true
            },
            showInLegend: true
        }
    },
    series: []
};
export const ChartGeneralCoc = {
    plotOptions: {
        column: {
            borderRadius: 8
        }
    },

    chart: {
        plotBorderWidth: null,
        plotShadow: false,
        type: 'column'
    },
    title: {
        text: 'COCHES/KM'
    },
    yAxis: {
        title: {
            text: ''
        },
        min: 0 // this sets minimum values of y to 0
    },
    xAxis: {
        categories: ['']
    },
    series: []
};
export const ChartIntervalo = {
    title: {
        text: 'Intervalo medio'
    },
    yAxis: {
        title: {
            text: ''
        },
        min: 0 // this sets minimum values of y to 0
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            hour: '%H h',
        },
    },
    series: []
};
export const ChartNumeroTrenes = {
    title: {
        text: 'Numero de trenes'
    },
    yAxis: {
        title: {
            text: ''
        },
        min: 0 // this sets minimum values of y to 0
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            hour: '%H h',
        },
    },
    series: []
};
export const ChartDesviacion = {
    title: {
        text: 'Desviacion media'
    },
    yAxis: {
        title: {
            text: ''
        },
        min: 0 // this sets minimum values of y to 0
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            hour: '%H h',
        },
    },
    series: []
};
export const ChartTiempoVueltaVelocidad = {
    title: {
        text: 'Tiempo de vuelta y velocidad'
    },
    plotOptions: {
        column: {
            borderRadius: 5
        }
    },
    yAxis: {
        title: {
            text: ''
        },
        min: 0 // this sets minimum values of y to 0
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            hour: '%H h',
        },
    },
    series: []
};
export const ChartTOC = {
    title: {
        text: 'TOC'
    },
    yAxis: {
        title: {
            text: ''
        },
        min: 0 // this sets minimum values of y to 0
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            hour: '%H h',
        },
    },
    series: []
};
export const ChartViajerosDensidad = {
    chart: {
        polar: true
    },
    title: {
        text: 'Viajeros y Densidad'
    },
    yAxis: {
        title: {
            text: ''
        },
        min: 0 // this sets minimum values of y to 0
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            hour: '%H h',
        },
    },
    series: []
};
