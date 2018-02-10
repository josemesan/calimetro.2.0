import { BaseEntity } from './../../shared';

export class Observaciones implements BaseEntity {
    constructor(
        public id?: number,
        public texto?: string,
        public datos?: BaseEntity,
    ) {
    }
}
