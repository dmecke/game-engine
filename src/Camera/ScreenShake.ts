import Rng from '../Math/Rng';
import Vector from '../Math/Vector';

export default class ScreenShake {
    constructor(
        private amount: Vector,
        private duration: number,
    ) {
    }

    get offset(): Vector {
        if (this.duration <= 0) {
            return Vector.null();
        }

        let shake = this
            .amount
            .multiply(Math.pow(this.duration / 60, 2))
        ;
        shake = shake.add(new Vector(Rng.instance.randomIntBetween(-shake.x, shake.x), Rng.instance.randomIntBetween(-shake.y, shake.y)))

        this.duration = Math.max(0, this.duration - 1);

        return shake;
    }
}
