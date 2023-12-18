import Vector from '../Math/Vector';

export default class TileAnimation {
    constructor(
        private readonly frames: number,
        private readonly frameDuration: number,
        private readonly offset: Vector,
    ) {
    }

    getOffsetAt(animationTimer: number): Vector {
        return this.offset.multiply(this.getAnimationIndexAt(animationTimer));
    }

    getAnimationIndexAt(animationTimer: number): number {
        return Math.floor(animationTimer / this.frameDuration) % this.frames;
    }
}
