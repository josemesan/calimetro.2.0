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
    title: {
        text: 'CONSUMO'
    },
    yAxis: {
        title: {
            text: ''
        },
       // min: 0 // this sets minimum values of y to 0
    },
    xAxis: {
        categories: ['CONSUMO']
    },
    // xAxis: {
    //     type: 'datetime',
    //     dateTimeLabelFormats: {
    //         hour: '%H h',
    //     },
    // },
    series: []
};
export const ChartGeneralVia = {

    title: {
        text: 'VIAJEROS'
    },
    yAxis: {
        title: {
            text: ''
        },
        min: 0 // this sets minimum values of y to 0
    },
    // xAxis: {
    //     type: 'datetime',
    //     dateTimeLabelFormats: {
    //         hour: '%H h',
    //     },
    // },
    series: []
};
export const ChartGeneralCoc = {
    title: {
        text: 'COCHES/KM'
    },
    yAxis: {
        title: {
            text: ''
        },
        min: 0 // this sets minimum values of y to 0
    },
    // xAxis: {
    //     type: 'datetime',
    //     dateTimeLabelFormats: {
    //         hour: '%H h',
    //     },
    // },
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
