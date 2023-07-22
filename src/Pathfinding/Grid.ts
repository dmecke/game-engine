import GridType from '../Type/Grid';
import PF from 'pathfinding';
import Vector from '../Math/Vector';

export default class Grid {
    private readonly grid: PF.Grid;

    constructor(
        size: Vector,
        walkableGrid: GridType<boolean>,
    ) {
        this.grid = new PF.Grid(size.x, size.y);
        for (let y = 0; y < size.y; y++) {
            for (let x = 0; x < size.x; x++) {
                this.grid.setWalkableAt(x, y, walkableGrid.get(x, y) ?? false);
            }
        }
    }

    isWalkable(position: Vector): boolean {
        return this.grid.isWalkableAt(position.x, position.y);
    }

    getPath(origin: Vector, destination: Vector, allowDiagonal = true): Vector[] {
        return new PF
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .AStarFinder({ allowDiagonal, dontCrossCorners: allowDiagonal })
            .findPath(origin.x, origin.y, destination.x, destination.y, this.grid.clone())
            .map(cell => new Vector(cell[0], cell[1]))
        ;
    }
}
