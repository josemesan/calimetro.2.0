import { BaseEntity } from './../../shared';

export class Linea implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public visible?: boolean,
        public estacions?: BaseEntity[],
        public datos?: BaseEntity[],
        public tablaTrenes?: BaseEntity[],
        public intervaloOfertados?: BaseEntity[],
    ) {
        this.visible = false;
    }
}
