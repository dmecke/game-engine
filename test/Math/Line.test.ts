import Line from '../../src/Math/Line';
import Vector from '../../src/Math/Vector';

describe('Line', () => {
    it('returns the intersection point with another line', () => {
        const lineA = new Line(new Vector(0, -2), new Vector(3, 4));
        const lineB = new Line(new Vector(-2, 0), new Vector(6, 4));
        const intersection = new Vector(2, 2);

        expect(lineA.getIntersection(lineB)).toEqual(intersection);
    });
});
