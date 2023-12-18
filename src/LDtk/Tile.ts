import Vector from '../Math/Vector';

export default class Tile {
    constructor(
        readonly index: number,
        readonly position: Vector,
        readonly offset: Vector,
        readonly tags: string[],
        readonly metadata: Record<string, unknown>,
    ) {
    }
}
