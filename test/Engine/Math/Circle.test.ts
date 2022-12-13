import Circle from '../../../src/Math/Circle';
import Vector from '../../../src/Math/Vector';

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
});
