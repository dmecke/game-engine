import Vector from './Vector';

export default class CompassDirection {
    private constructor(
        private readonly direction: string,
    ) {
    }

    static get south(): CompassDirection {
        return new CompassDirection('s');
    }

    static get southWest(): CompassDirection {
        return new CompassDirection('sw');
    }

    static get west(): CompassDirection {
        return new CompassDirection('w');
    }

    static get northWest(): CompassDirection {
        return new CompassDirection('nw');
    }

    static get north(): CompassDirection {
        return new CompassDirection('n');
    }

    static get northEast(): CompassDirection {
        return new CompassDirection('ne');
    }

    static get east(): CompassDirection {
        return new CompassDirection('e');
    }

    static get southEast(): CompassDirection {
        return new CompassDirection('se');
    }

    static get all(): CompassDirection[] {
        return [
            CompassDirection.east,
            CompassDirection.southEast,
            CompassDirection.south,
            CompassDirection.southWest,
            CompassDirection.west,
            CompassDirection.northWest,
            CompassDirection.north,
            CompassDirection.northEast,
        ];
    }

    static fromVector(vector: Vector): CompassDirection {
        // https://lemire.me/blog/2022/07/24/round-a-direction-vector-to-the-nearest-8-way-compass/
        const angle = (Math.round(4 * Math.atan2(vector.y, vector.x) / Math.PI + 8) % 8) * Math.PI / 4;

        const x = Math.round(Math.cos(angle));
        const y = Math.round(Math.sin(angle));

        let direction = '';
        if (y === -1) {
            direction += 'n';
        }
        if (y === 1) {
            direction += 's';
        }
        if (x === -1) {
            direction += 'w';
        }
        if (x === 1) {
            direction += 'e';
        }

        return new CompassDirection(direction);
    }

    static fromString(direction: string): CompassDirection {
        return new CompassDirection(direction);
    }

    get vector(): Vector {
        const x = this.direction.includes('e') ? 1 : this.direction.includes('w') ? -1 : 0;
        const y = this.direction.includes('s') ? 1 : this.direction.includes('n') ? -1 : 0;

        return new Vector(x, y);
    }

    toString(): string {
        return this.direction;
    }
}
