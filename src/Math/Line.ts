import Vector from './Vector';

export default class Line {
    constructor(
        readonly point1: Vector,
        readonly point2: Vector,
    ) {
    }

    getIntersection(other: Line): Vector {
        const s = (
            (other.point2.x - other.point1.x) * (this.point1.y - other.point1.y) -
            (other.point2.y - other.point1.y) * (this.point1.x - other.point1.x)
        ) / (
            (other.point2.y - other.point1.y) * (this.point2.x - this.point1.x) -
            (other.point2.x - other.point1.x) * (this.point2.y - this.point1.y)
        );

        return new Vector(
            this.point1.x + s * (this.point2.x - this.point1.x),
            this.point1.y + s * (this.point2.y - this.point1.y),
        );
    }
}
