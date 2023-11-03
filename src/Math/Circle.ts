import Line from './Line';
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

    getIntersectionsWithLine(line: Line): Vector[] {
        const dx = line.point2.x - line.point1.x;
        const dy = line.point2.y - line.point1.y;

        const A = dx * dx + dy * dy;
        const B = 2 * (dx * (line.point1.x - this.position.x) + dy * (line.point1.y - this.position.y));
        const C = (line.point1.x - this.position.x) * (line.point1.x - this.position.x) + (line.point1.y - this.position.y) * (line.point1.y - this.position.y) - this.radius * this.radius;

        const discriminant = B * B - 4 * A * C;

        if (discriminant < 0) { // no intersection
            return [];
        }

        if (discriminant === 0) { // one intersection point
            const t = -B / (2 * A);
            const x = line.point1.x + t * dx;
            const y = line.point1.y + t * dy;

            return [new Vector(x, y)];
        }

        // two intersection points
        const t1 = (-B + Math.sqrt(discriminant)) / (2 * A);
        const t2 = (-B - Math.sqrt(discriminant)) / (2 * A);
        const x1 = line.point1.x + t1 * dx;
        const y1 = line.point1.y + t1 * dy;
        const x2 = line.point1.x + t2 * dx;
        const y2 = line.point1.y + t2 * dy;

        return [new Vector(x1, y1), new Vector(x2, y2)];
    }
}
