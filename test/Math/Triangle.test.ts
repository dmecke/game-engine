import Line from '../../src/Math/Line';
import Triangle from '../../src/Math/Triangle';
import Vector from '../../src/Math/Vector';

describe('Triangle', () => {
    it('can return its vertices', () => {
        const vertex1 = new Vector(0, 0);
        const vertex2 = new Vector(1, 0);
        const vertex3 = new Vector(0, 1);

        const triangle = new Triangle(vertex1, vertex2, vertex3);

        expect(triangle.vertices).toEqual([vertex1, vertex2, vertex3]);
    });

    it('can return its lines', () => {
        const vertex1 = new Vector(0, 0);
        const vertex2 = new Vector(1, 0);
        const vertex3 = new Vector(0, 1);

        const triangle = new Triangle(vertex1, vertex2, vertex3);

        expect(triangle.lines).toEqual([
            new Line(vertex1, vertex2),
            new Line(vertex2, vertex3),
            new Line(vertex3, vertex1),
        ]);
    });

    it('can calculate its area', () => {
        const vertex1 = new Vector(0, 0);
        const vertex2 = new Vector(1, 0);
        const vertex3 = new Vector(0, 1);

        const triangle = new Triangle(vertex1, vertex2, vertex3);

        expect(triangle.area).toBe(0.5);
    });
});
