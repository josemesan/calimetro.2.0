import { BaseEntity } from './../../shared';

export const enum TipoVia {
    'I',
    'II'
}

export class IntervaloMin implements BaseEntity {
    constructor(
        public id?: number,
        public hora?: any,
        public interMin?: number,
        public estacionMin?: string,
        public viaMin?: TipoVia,
    ) {
    }
}
