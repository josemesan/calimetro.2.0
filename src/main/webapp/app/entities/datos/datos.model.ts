import { BaseEntity } from './../../shared';

export const enum TipoDia {
    'LAB',
    'VIER',
    'SAB',
    'FEST',
    'ESP'
}

export const enum TipoVia {
    'I',
    'II'
}

export class Datos implements BaseEntity {
    constructor(
        public id?: number,
        public fechaHora?: any,
        public tipoDia?: TipoDia,
        public intervaloMedio?: number,
        public interMin?: number,
        public estacionMin?: string,
        public viaMin?: TipoVia,
        public interMax?: number,
        public estacionMax?: string,
        public viamax?: TipoVia,
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
        public observaciones?: BaseEntity[],
    ) {
    }
}
