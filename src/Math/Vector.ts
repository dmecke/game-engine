import Area from './Area';
import Circle from './Circle';
import clamp from './clamp';
import lerp from './lerp';
import radToDeg from './radToDeg';

export default class Vector {
    constructor(
        private readonly _x: number,
        private readonly _y: number,
    ) {
        if (_x === undefined || _x === null || _y === undefined || _y === null) {
            throw new Error(`Cannot create Vector(${_x}|${_y}.`);
        }
    }

    static null(): Vector {
        return new Vector(0, 0);
    }

    static fromDirection(direction: number, length: number): Vector {
        return new Vector(
            length * Math.cos(direction * Math.PI / -180),
            length * Math.sin(direction * Math.PI / -180),
        );
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    copy(): Vector {
        return new Vector(this._x, this._y);
    }

    toString(): string {
        return this._x + '|' + this._y;
    }

    equals(other: Vector): boolean {
        return this._x === other._x && this._y === other._y;
    }

    isNull(): boolean {
        return this.equals(new Vector(0, 0));
    }

    add(other: Vector): Vector {
        return new Vector(this._x + other._x, this._y + other._y);
    }

    addX(x: number): Vector {
        return new Vector(this._x + x, this._y);
    }

    addY(y: number): Vector {
        return new Vector(this._x, this._y + y);
    }

    subtract(other: Vector): Vector {
        return new Vector(this._x - other._x, this._y - other._y);
    }

    subtractX(x: number): Vector {
        return new Vector(this._x - x, this._y);
    }

    subtractY(y: number): Vector {
        return new Vector(this._x, this._y - y);
    }

    multiply(multiplier: number): Vector {
        return new Vector(this._x * multiplier, this._y * multiplier);
    }

    multiplyX(multiplier: number): Vector {
        return new Vector(this._x * multiplier, this._y);
    }

    multiplyY(multiplier: number): Vector {
        return new Vector(this._x, this._y * multiplier);
    }

    divide(divisor: number): Vector {
        if (divisor === 0) {
            throw new Error('Cannot divide by zero.');
        }

        return new Vector(this._x / divisor, this._y / divisor);
    }

    get length(): number {
        return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
    }

    normalize(): Vector {
        if (this.length === 0) {
            return Vector.null();
        }

        return this.divide(this.length);
    }

    perpendicular(): Vector {
        return new Vector(this._y, this._x);
    }

    distanceTo(other: Vector): number {
        return Math.sqrt(this.distanceSquaredTo(other));
    }

    distanceSquaredTo(other: Vector): number {
        return Math.pow(this._x - other._x, 2) + Math.pow(this._y - other._y, 2);
    }

    round(): Vector {
        return new Vector(Math.round(this._x), Math.round(this._y));
    }

    floor(): Vector {
        return new Vector(Math.floor(this._x), Math.floor(this._y));
    }

    ceil(): Vector {
        return new Vector(Math.ceil(this._x), Math.ceil(this._y));
    }

    clamp(min: Vector, max: Vector): Vector {
        return new Vector(
            clamp(this._x, min._x, max._x),
            clamp(this._y, min._y, max._y),
        );
    }

    squareAround(size: number): Area {
        return new Area(
            new Vector(this._x - size / 2, this._y - size / 2),
            new Vector(size, size),
        );
    }

    circleAround(radius: number): Circle {
        return new Circle(this, radius);
    }

    directionTo(other: Vector): number {
        return -radToDeg(Math.atan2(this._y - other._y, this._x - other._x)) + 180;
    }

    lerpTo(other: Vector, amount: number): Vector {
        return new Vector(
            lerp(this._x, other._x, amount),
            lerp(this._y, other._y, amount),
        );
    }
}
