import { BaseEntity } from './../../shared';

export const enum TipoDia {
    'LAB',
    'VIER',
    'SAB',
    'FEST',
    'ESP'
}

export class IntervaloOfertado implements BaseEntity {
    constructor(
        public id?: number,
        public hora?: any,
        public tipoDia?: TipoDia,
        public intervaloMax?: number,
        public intervaloMin?: number,
        public linea?: BaseEntity,
    ) {
    }
}
