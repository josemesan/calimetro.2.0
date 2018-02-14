import { BaseEntity } from './../../shared';

export class Datos implements BaseEntity {
    constructor(
        public id?: number,
        public fechaHora?: any,
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
        public linea?: BaseEntity,
        public intervaloMin?: BaseEntity,
        public intervaloMax?: BaseEntity,
        public observaciones?: BaseEntity[],
    ) {
    }
}
