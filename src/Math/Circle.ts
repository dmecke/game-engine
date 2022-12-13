import Rng from './Rng';
import Vector from './Vector';

export default class Circle {
    constructor(
        readonly position: Vector,
        readonly radius: number,
    ) {
    }

    get diameter(): number {
        return this.radius * 2;
    }

    contains(position: Vector): boolean {
        return this.position.distanceTo(position) <= this.radius;
    }

    randomPoint(): Vector {
        const r = this.radius * Math.sqrt(Rng.instance.randomFloatBetween(0, 1));
        const theta = Rng.instance.randomFloatBetween(0, 1) * 2 * Math.PI;

        return this.position.addX(r * Math.cos(theta)).addY(r * Math.sin(theta));
    }
}
