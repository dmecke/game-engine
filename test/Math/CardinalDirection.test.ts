import CardinalDirection from '../../src/Math/CardinalDirection';
import Vector from '../../src/Math/Vector';

describe('CardinalDirection', () => {
    it('should return a none direction', () => {
        expect(CardinalDirection.none.toString()).toEqual('-');
    });

    it('should return an east direction', () => {
        expect(CardinalDirection.east.toString()).toEqual('e');
    });

    it('should return a south direction', () => {
        expect(CardinalDirection.south.toString()).toEqual('s');
    });

    it('should return a west direction', () => {
        expect(CardinalDirection.west.toString()).toEqual('w');
    });

    it('should return a north direction', () => {
        expect(CardinalDirection.north.toString()).toEqual('n');
    });

    it('should return all directions', () => {
        expect(CardinalDirection.all.map(direction => direction.toString())).toEqual(['e', 's', 'w', 'n']);
    });

    it('should return a direction from a string', () => {
        expect(CardinalDirection.fromString('-')).toEqual(CardinalDirection.none);
        expect(CardinalDirection.fromString('e')).toEqual(CardinalDirection.east);
        expect(CardinalDirection.fromString('s')).toEqual(CardinalDirection.south);
        expect(CardinalDirection.fromString('w')).toEqual(CardinalDirection.west);
        expect(CardinalDirection.fromString('n')).toEqual(CardinalDirection.north);
    });

    it('should return a direction from a vector', () => {
        expect(CardinalDirection.fromVector(new Vector(0, 0))).toEqual(CardinalDirection.none);

        expect(CardinalDirection.fromVector(new Vector(1, 0))).toEqual(CardinalDirection.east);
        expect(CardinalDirection.fromVector(new Vector(0, 1))).toEqual(CardinalDirection.south);
        expect(CardinalDirection.fromVector(new Vector(-1, 0))).toEqual(CardinalDirection.west);
        expect(CardinalDirection.fromVector(new Vector(0, -1))).toEqual(CardinalDirection.north);

        expect(CardinalDirection.fromVector(new Vector(.5, 0))).toEqual(CardinalDirection.east);
        expect(CardinalDirection.fromVector(new Vector(0, .5))).toEqual(CardinalDirection.south);
        expect(CardinalDirection.fromVector(new Vector(-.5, 0))).toEqual(CardinalDirection.west);
        expect(CardinalDirection.fromVector(new Vector(0, -.5))).toEqual(CardinalDirection.north);
    });

    it('should be able to use getters', () => {
        expect(CardinalDirection.none.isNone).toEqual(true);
        expect(CardinalDirection.east.isEast).toEqual(true);
        expect(CardinalDirection.south.isSouth).toEqual(true);
        expect(CardinalDirection.west.isWest).toEqual(true);
        expect(CardinalDirection.north.isNorth).toEqual(true);
    });

    it('should be able to convert to a vector', () => {
        expect(CardinalDirection.none.vector).toEqual(new Vector(0, 0));
        expect(CardinalDirection.east.vector).toEqual(new Vector(1, 0));
        expect(CardinalDirection.south.vector).toEqual(new Vector(0, 1));
        expect(CardinalDirection.west.vector).toEqual(new Vector(-1, 0));
        expect(CardinalDirection.north.vector).toEqual(new Vector(0, -1));
    });

    it('should be able to be flipped', () => {
        expect(CardinalDirection.none.flip.equals(CardinalDirection.none)).toEqual(true);
        expect(CardinalDirection.east.flip.equals(CardinalDirection.west)).toEqual(true);
        expect(CardinalDirection.south.flip.equals(CardinalDirection.north)).toEqual(true);
        expect(CardinalDirection.west.flip.equals(CardinalDirection.east)).toEqual(true);
        expect(CardinalDirection.north.flip.equals(CardinalDirection.south)).toEqual(true);
    });

    it('should be able to be turned clockwise', () => {
        expect(CardinalDirection.none.clockwise.equals(CardinalDirection.none)).toEqual(true);
        expect(CardinalDirection.east.clockwise.equals(CardinalDirection.south)).toEqual(true);
        expect(CardinalDirection.south.clockwise.equals(CardinalDirection.west)).toEqual(true);
        expect(CardinalDirection.west.clockwise.equals(CardinalDirection.north)).toEqual(true);
        expect(CardinalDirection.north.clockwise.equals(CardinalDirection.east)).toEqual(true);
    });

    it('should be able to be turned counter-clockwise', () => {
        expect(CardinalDirection.none.counterClockwise.equals(CardinalDirection.none)).toEqual(true);
        expect(CardinalDirection.east.counterClockwise.equals(CardinalDirection.north)).toEqual(true);
        expect(CardinalDirection.south.counterClockwise.equals(CardinalDirection.east)).toEqual(true);
        expect(CardinalDirection.west.counterClockwise.equals(CardinalDirection.south)).toEqual(true);
        expect(CardinalDirection.north.counterClockwise.equals(CardinalDirection.west)).toEqual(true);
    });
});
