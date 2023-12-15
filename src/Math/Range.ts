import Rng from './Rng';
import clamp from './clamp';

export default class Range {
    constructor(
        readonly min: number,
        readonly max: number,
    ) {
        if (min > max) {
            throw new Error(`Min value of range must not be bigger than max value: ${min} -> ${max}.`);
        }
    }

    clamp(value: number): number {
        return clamp(value, this.min, this.max);
    }

    randomFloatBetween(): number {
        return Rng.instance.randomFloatBetween(this.min, this.max);
    }
}
