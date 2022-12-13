import Rng from './Rng';
import Vector from './Vector';

export class Area {
    constructor(
        readonly position: Vector,
        readonly size: Vector,
    ) {
    }

    static around(position: Vector, range: number): Area {
        return new Area(position.subtract(new Vector(range, range)), new Vector(range, range).multiply(2));
    }

    add(position: Vector): Area {
        return new Area(
            this.position.add(position),
            this.size,
        );
    }

    subtract(position: Vector): Area {
        return new Area(
            this.position.subtract(position),
            this.size,
        );
    }

    divide(divisor: number): Area {
        if (divisor === 0) {
            throw new Error('Cannot divide by zero.');
        }

        return new Area(
            this.position.divide(divisor),
            this.size.divide(divisor),
        )
    }

    floor(): Area {
        return new Area(
            this.position.floor(),
            this.size,
        );
    }

    contains(position: Vector): boolean {
        if (position.x < this.left) {
            return false;
        }

        if (position.y < this.top) {
            return false;
        }

        if (position.x >= this.right) {
            return false;
        }

        if (position.y >= this.bottom) {
            return false;
        }

        return true;
    }

    containsOneOf(positions: Vector[]): boolean {
        for (const position of positions) {
            if (this.contains(position)) {
                return true;
            }
        }

        return false;
    }

    get left(): number {
        return this.position.x;
    }

    get right(): number {
        return this.position.x + this.size.x;
    }

    get top(): number {
        return this.position.y;
    }

    get bottom(): number {
        return this.position.y + this.size.y;
    }

    get center(): Vector {
        return this.position.add(this.size.divide(2));
    }

    intersection(other: Area): Area {
        if (!this.overlaps(other)) {
            throw new Error('Areas do not overlap.');
        }

        const topLeft = new Vector(Math.max(this.left, other.left), Math.max(this.top, other.top));
        const bottomRight = new Vector(Math.min(this.right, other.right), Math.min(this.bottom, other.bottom));

        return new Area(
            topLeft,
            bottomRight.subtract(topLeft),
        );
    }

    overlaps(other: Area): boolean {
        if (this.left >= other.right) {
            return false;
        }

        if (other.left >= this.right) {
            return false;
        }

        if (this.top >= other.bottom) {
            return false;
        }

        if (other.top >= this.bottom) {
            return false;
        }

        return true;
    }

    get area(): number {
        return this.size.x * this.size.y;
    }

    toString(): string {
        return `${this.position.toString()} - ${this.position.add(this.size.subtract(new Vector(1, 1))).toString()}`;
    }

    getRandomPoint(): Vector {
        return new Vector(
            Rng.instance.randomIntBetween(this.position.x, this.position.x + this.size.x - 1),
            Rng.instance.randomIntBetween(this.position.y, this.position.y + this.size.y - 1),
        );
    }
}
