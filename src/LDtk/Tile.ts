import Vector from '../Math/Vector';

export default class Tile {
    constructor(
        readonly index: number,
        readonly position: Vector,
        readonly offset: Vector,
        private readonly metadata: Record<string, unknown>,
    ) {
    }

    get animation(): { offset: Vector, speed: number }|null {
        if (!this.metadata['animation']) {
            return null;
        }

        const animation = this.metadata['animation'] as { offset: { x: number, y: number }, speed: number };

        return {
            offset: new Vector(animation['offset']['x'], animation['offset']['y']),
            speed: animation['speed'],
        };
    }
}
