import { BaseEntity } from '../shared';

export class DatosExcel implements BaseEntity {
    constructor(
        public id?: number,
        public fechaHora?: any,
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
