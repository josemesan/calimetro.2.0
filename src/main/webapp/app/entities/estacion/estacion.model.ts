import { BaseEntity } from './../../shared';

export const enum TipoVia {
    'I',
    'II'
}

export class Estacion implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public nemo?: string,
        public via?: TipoVia,
        public visible?: boolean,
        public linea?: BaseEntity,
    ) {
        this.visible = false;
    }
}
