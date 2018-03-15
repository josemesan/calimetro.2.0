export const ChartsThemeTiempoVuelta = {
    chart: {
        type: 'column'
    },

    title: {
        text: 'Tiempo de vuelta'
    },

    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
            hour: '%H h',
           // year: '%b'
        },
        title: {
            text: 'Hora'
        }
    },

    series: [ {
        type: 'column',
        name: 'Intervalo Medio',
        data: [ [Date.UTC (1992, 1, 1, 8, 0), 7],
            [Date.UTC(1992, 1, 1, 10, 0), 3],
            [Date.UTC(1992, 1, 1, 15, 0), 3],
            [Date.UTC(1992, 1, 1, 20, 0), 9],
            [Date.UTC(1992, 1, 1, 23, 0), 13],
        ]
    }, {
        step: 'center',
        type: 'line',
        name: 'Intervalo Minimo',
        data: [ [Date.UTC (1992, 1, 1, 8, 0), 7],
            [Date.UTC(1992, 1, 1, 10, 0), 3],
            [Date.UTC(1992, 1, 1, 15, 0), 3],
            [Date.UTC(1992, 1, 1, 20, 0), 9],
            [Date.UTC(1992, 1, 1, 23, 0), 13],
        ]
    }, {
        step: 'center',
        type: 'line',
        name: 'Intervalo Maximo',
        data: [ [Date.UTC (1992, 1, 1, 8, 0), 7],
            [Date.UTC(1992, 1, 1, 10, 0), 3],
            [Date.UTC(1992, 1, 1, 15, 0), 3],
            [Date.UTC(1992, 1, 1, 20, 0), 9],
            [Date.UTC(1992, 1, 1, 23, 0), 13],
        ]
    } ],
};
