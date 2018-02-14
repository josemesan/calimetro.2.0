import { BaseEntity } from './../../shared';

export const enum TipoDia {
    'LAB',
    'VIER',
    'SAB',
    'FEST',
    'ESP'
}

export class TablaTrenes implements BaseEntity {
    constructor(
        public id?: number,
        public hora?: any,
        public tipoDia?: TipoDia,
        public numeroTrenes?: number,
        public linea?: BaseEntity,
    ) {
    }
}
