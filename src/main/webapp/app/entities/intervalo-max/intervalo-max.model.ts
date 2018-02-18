import { BaseEntity } from './../../shared';

export const enum TipoVia {
    'I',
    'II'
}

export class IntervaloMax implements BaseEntity {
    constructor(
        public id?: number,
        public hora?: any,
        public interMax?: number,
        public estacionMax?: string,
        public viamax?: TipoVia,
    ) {
    }
}
