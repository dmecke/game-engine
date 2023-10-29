import AnimationDefinition from './AnimationDefinition';
import CompassDirection from '../Math/CompassDirection';

export default class AnimationType {
    constructor(
        readonly definition: AnimationDefinition,
    ) {
    }

    get name(): string {
        return this.definition.name;
    }

    get frames(): number {
        return this.definition.frames;
    }

    get frameDuration(): number {
        return this.definition.frameDuration;
    }

    directionMapping(direction: CompassDirection): number {
        switch (this.definition.directionMapping) {
            case 'diagonally':
                return this.diagonally(direction);

            case 'eightdirectionally':
                return this.eightdirectionally(direction);

            case 'orthogonally':
                return this.orthogonally(direction);

            case 'unidirectionally':
                return this.unidirectionally(direction);

            default:
                throw new Error(`Unknown direction mapping "${this.definition.directionMapping}".`);
        }
    }

    private diagonally(direction: CompassDirection): number {
        switch (direction.toString()) {
            case 's':
            case 'e':
            case 'se':
                return 0;

            case 'w':
            case 'sw':
                return 1;

            case 'n':
            case 'ne':
                return 2;

            case 'nw':
                return 3;

            default:
                throw new Error(`Invalid direction: "${direction}".`);
        }
    }

    private orthogonally(direction: CompassDirection): number {
        switch (direction.toString()) {
            case 'se':
            case 'ne':
            case 'e':
                return 0;

            case 'sw':
            case 'nw':
            case 'w':
                return 1;

            case 's':
                return 2;

            case 'n':
                return 3;

            default:
                throw new Error(`Invalid direction: "${direction}".`);
        }
    }

    private unidirectionally(direction: CompassDirection): number {
        switch (direction.toString()) {
            case 's':
            case 'sw':
            case 'w':
            case 'nw':
            case 'n':
            case 'ne':
            case 'e':
            case 'se':
                return 0;

            default:
                throw new Error(`Invalid direction: "${direction}".`);
        }
    }

    private eightdirectionally(direction: CompassDirection): number {
        switch (direction.toString()) {
            case 'e':
                return 0;

            case 'w':
                return 1;

            case 's':
                return 2;

            case 'n':
                return 3;

            case 'se':
                return 4;

            case 'sw':
                return 5;

            case 'ne':
                return 6;

            case 'nw':
                return 7;

            default:
                throw new Error(`Invalid direction: "${direction}".`);
        }
    }
}
