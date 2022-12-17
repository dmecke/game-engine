import Area from '../Math/Area';
import Vector from '../Math/Vector';

export default class Entity {
    constructor(
        private readonly id: string,
        public name: string,
        public position: Vector,
        readonly offset: Vector,
        readonly spriteArea: Area|null,
        readonly properties: Record<string, unknown>,
    ) {
    }

    equals(other: Entity): boolean {
        return this.id === other.id;
    }
}
