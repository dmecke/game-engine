import Circle from '../../src/Math/Circle';
import Line from '../../src/Math/Line';
import Vector from '../../src/Math/Vector';

describe('Circle', () => {
    it('has a diameter equal to twice its radius', () => {
        const circle = new Circle(new Vector(0, 0), 5);

        expect(circle.diameter).toBe(10);
    });

    it('contains a position within its radius', () => {
        const circle = new Circle(new Vector(0, 0), 5);

        expect(circle.contains(new Vector(0, 0))).toBe(true);
        expect(circle.contains(new Vector(2, 2))).toBe(true);
        expect(circle.contains(new Vector(5, 5))).toBe(false);
        expect(circle.contains(new Vector(-5, -5))).toBe(false);
    });

    it('generates a random point within its radius', () => {
        const circle = new Circle(new Vector(0, 0), 5);

        for (let i = 0; i < 10; i++) {
            const randomPoint = circle.randomPoint();

            expect(circle.contains(randomPoint)).toBe(true);
        }
    });

    describe('getIntersectionsWithLine', () => {
        it('returns no intersections if the line does not intersect the circle', () => {
            const circle = new Circle(new Vector(0, 0), 5);
            const line = new Line(new Vector(-10, 10), new Vector(10, 10));

            expect(circle.getIntersectionsWithLine(line)).toEqual([]);
        });

        it('returns one intersection if the line intersects the circle once', () => {
            const circle = new Circle(new Vector(0, 0), 5);
            const line = new Line(new Vector(-10, 5), new Vector(10, 5));
            const intersection = new Vector(0, 5);

            expect(circle.getIntersectionsWithLine(line)).toEqual([intersection]);
        });

        it('returns two intersections if the line intersects the circle twice', () => {
            const circle = new Circle(new Vector(0, 0), 5);
            const line = new Line(new Vector(-10, 0), new Vector(10, 0));
            const intersectionA = new Vector(5, 0);
            const intersectionB = new Vector(-5, 0);

            expect(circle.getIntersectionsWithLine(line)).toEqual([intersectionA, intersectionB]);
        });
    });
});
