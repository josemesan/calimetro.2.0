export class DatosExcelModel {
    constructor(
        public id?: number,
        public fecha?: any,
        public hora?: any,
        public linea?: string,
        public intervaloMedio?: number,
        public desviacionMedia?: number,
        public tiempoVuelta?: number,
        public numeroTrenes?: number,
        public viajeros?: number,
        public toc?: number,
        public densidad?: number,
        public consumo?: number,
        public velocidad?: number,
        public cocheKm?: number,

    ) {
    }
}
