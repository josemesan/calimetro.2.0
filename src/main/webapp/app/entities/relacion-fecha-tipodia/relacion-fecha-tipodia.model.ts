import { BaseEntity } from './../../shared';

export const enum TipoDia {
    'LAB',
    'VIER',
    'SAB',
    'FEST',
    'ESP'
}

export class RelacionFechaTipodia implements BaseEntity {
    constructor(
        public id?: number,
        public tipoDia?: TipoDia,
        public fecha?: any,
    ) {
    }
}
