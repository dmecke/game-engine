import Area from '../Math/Area';
import Vector from '../Math/Vector';

export default class Viewport {
    constructor(
        readonly size: Vector,
    ) {
    }

    get center(): Vector {
        return this.size.divide(2);
    }

    get area(): Area {
        return new Area(Vector.null(), this.size);
    }
}
