import Area from '../Math/Area';
import Vector from '../Math/Vector';

export default class Grid<T> {
    private grid: Map<number, Map<number, T|null>> = new Map();

    constructor(
        readonly width: number,
        readonly height: number,
    ) {
    }

    get(x: number, y: number): T|null {
        const row = this.grid.get(x);
        if (!row) {
            return null;
        }

        return row.get(y) ?? null;
    }

    has(x: number, y: number): boolean {
        return this.get(x, y) !== null;
    }

    set(x: number, y: number, value: T): void {
        if (!this.grid.has(x)) {
            this.grid.set(x, new Map());
        }

        this.grid.get(x)?.set(y, value);
    }

    clear(): void {
        this.grid = new Map();
    }

    fill(value: T): void {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.width; y++) {
                this.set(x, y, value);
            }
        }
    }

    indexOfMin(area: Area): Vector|null {
        let minIndex: Vector|null = null;
        for (let x = area.left; x < area.right; x++) {
            for (let y = area.top; y < area.bottom; y++) {
                if (minIndex === null) {
                    minIndex = new Vector(x, y);
                } else {
                    const value = this.get(x, y);
                    const minValue = this.get(minIndex.x, minIndex.y);
                    if (value && minValue && value < minValue) {
                        minIndex = new Vector(x, y);
                    }
                }
            }
        }

        return minIndex;
    }
}
