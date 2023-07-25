import Vector from './Vector';

export default class CardinalDirection {
    private readonly direction: string;

    private constructor(direction: string) {
        this.direction = direction;
    }

    static get east(): CardinalDirection {
        return new CardinalDirection('e');
    }

    static get north(): CardinalDirection {
        return new CardinalDirection('n');
    }

    static get west(): CardinalDirection {
        return new CardinalDirection('w');
    }

    static get south(): CardinalDirection {
        return new CardinalDirection('s');
    }

    static get none(): CardinalDirection {
        return new CardinalDirection('-');
    }

    static get all(): CardinalDirection[] {
        return [
            CardinalDirection.east,
            CardinalDirection.south,
            CardinalDirection.west,
            CardinalDirection.north,
        ];
    }

    static fromString(direction: string): CardinalDirection {
        if (['-', 'e', 'n', 'w', 's'].indexOf(direction) === -1) {
            throw new Error('Invalid direction: "' + direction + '".');
        }

        return new CardinalDirection(direction);
    }

    static fromVector(vector: Vector): CardinalDirection {
        if (vector.length === 0) {
            return CardinalDirection.none;
        }

        const normalized = vector.normalize();

        const x = normalized.x;
        const y = normalized.y;

        if (y === 0) {
            if (x > 0) {
                return CardinalDirection.east;
            }

            if (x < 0) {
                return CardinalDirection.west;
            }
        }

        if (x === 0) {
            if (y > 0) {
                return CardinalDirection.south;
            }

            if (y < 0) {
                return CardinalDirection.north;
            }
        }

        if (x > 0 && Math.abs(x) >= Math.abs(y)) {
            return CardinalDirection.east;
        }
        if (x < 0 && Math.abs(x) >= Math.abs(y)) {
            return CardinalDirection.west;
        }
        if (y > 0 && Math.abs(y) >= Math.abs(x)) {
            return CardinalDirection.south;
        }
        if (y < 0 && Math.abs(y) >= Math.abs(x)) {
            return CardinalDirection.north;
        }

        throw new Error('Could not calculate direction for "' + vector.toString() + '".');
    }

    equals(other: CardinalDirection): boolean {
        return this.direction === other.direction;
    }

    get isEast(): boolean {
        return this.direction === 'e';
    }

    get isSouth(): boolean {
        return this.direction === 's';
    }

    get isWest(): boolean {
        return this.direction === 'w';
    }

    get isNorth(): boolean {
        return this.direction === 'n';
    }

    get isNone(): boolean {
        return this.direction === '-';
    }

    get vector(): Vector {
        switch (this.direction) {
            case '-':
                return new Vector(0, 0);

            case 'e':
                return new Vector(1, 0);

            case 's':
                return new Vector(0, 1);

            case 'w':
                return new Vector(-1, 0);

            case 'n':
                return new Vector(0, -1);
        }

        throw new Error('Invalid direction: "' + this.direction + '".');
    }

    get flip(): CardinalDirection {
        return CardinalDirection.fromVector(this.vector.multiply(-1));
    }

    get clockwise(): CardinalDirection {
        switch (this.direction) {
            case '-':
                return CardinalDirection.none;

            case 'e':
                return CardinalDirection.south;

            case 's':
                return CardinalDirection.west;

            case 'w':
                return CardinalDirection.north;

            case 'n':
                return CardinalDirection.east;
        }

        throw new Error('Invalid direction: "' + this.direction + '".');
    }

    get counterClockwise(): CardinalDirection {
        switch (this.direction) {
            case '-':
                return CardinalDirection.none;

            case 'e':
                return CardinalDirection.north;

            case 's':
                return CardinalDirection.east;

            case 'w':
                return CardinalDirection.south;

            case 'n':
                return CardinalDirection.west;
        }

        throw new Error('Invalid direction: "' + this.direction + '".');
    }

    toString(): string {
        return this.direction ?? '-';
    }
}
