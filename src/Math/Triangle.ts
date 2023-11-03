import Line from './Line';
import Vector from './Vector';

export default class Triangle {
    constructor(
        readonly a: Vector,
        readonly b: Vector,
        readonly c: Vector,
    ) {
    }

    get vertices(): [Vector, Vector, Vector] {
        return [this.a, this.b, this.c];
    }

    get lines(): [Line, Line, Line] {
        return [
            new Line(this.a, this.b),
            new Line(this.b, this.c),
            new Line(this.c, this.a),
        ];
    }

    get area(): number {
        const ab = this.a.subtract(this.b);
        const ac = this.a.subtract(this.c);

        return Math.abs(ab.cross(ac) / 2);
    }
}
