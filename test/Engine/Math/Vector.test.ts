import Vector from '../../../src/Math/Vector';

describe('Vector', () => {
    it('should return a null vector', () => {
        expect(Vector.null()).toEqual(new Vector(0, 0));
    });

    it('should return a vector from direction and length', () => {
        expect(Vector.fromDirection(0, 1).x).toBeCloseTo(1);
        expect(Vector.fromDirection(0, 1).y).toBeCloseTo(0);

        expect(Vector.fromDirection(90, 1).x).toBeCloseTo(0);
        expect(Vector.fromDirection(90, 1).y).toBeCloseTo(-1);

        expect(Vector.fromDirection(180, 1).x).toBeCloseTo(-1);
        expect(Vector.fromDirection(180, 1).y).toBeCloseTo(0);

        expect(Vector.fromDirection(270, 1).x).toBeCloseTo(0);
        expect(Vector.fromDirection(270, 1).y).toBeCloseTo(1);
    });

    it('creates a vector with the correct x and y values', () => {
        const vector = new Vector(1, 2);

        expect(vector.x).toBe(1);
        expect(vector.y).toBe(2);
    });

    it('creates a copy of the vector with the correct x and y values', () => {
        const vector = new Vector(1, 2);
        const copiedVector = vector.copy();

        expect(copiedVector.x).toBe(1);
        expect(copiedVector.y).toBe(2);
    });

    it('returns the correct string representation of the vector', () => {
        const vector = new Vector(1, 2);

        expect(vector.toString()).toBe('1|2');
    });

    it('should return true if two vectors have the same x and y values', () => {
        const vector1 = new Vector(1, 2);
        const vector2 = new Vector(1, 2);

        expect(vector1.equals(vector2)).toBe(true);
    });

    it('should return false if vectors have different x or y values', () => {
        const vector1 = new Vector(1, 2);
        const vector2 = new Vector(3, 4);

        expect(vector1.equals(vector2)).toBe(false);
    });

    it('should return true for a null vector if vector is 0|0', () => {
        const vector = new Vector(0, 0);

        expect(vector.isNull()).toBe(true);
    });

    it('should return false for a null vector if vector is not 0|0', () => {
        const vector = new Vector(1, 2);

        expect(vector.isNull()).toBe(false);
    });

    it('should add another vector', () => {
        const vector = new Vector(1, 2);
        const result = vector.add(new Vector(3, 4));

        expect(result.x).toBe(4);
        expect(result.y).toBe(6);
    });

    it('should add a value to the x value', () => {
        const vector = new Vector(1, 2);
        const result = vector.addX(3);

        expect(result.x).toBe(4);
        expect(result.y).toBe(2);
    });

    it('should add a value to the y value', () => {
        const vector = new Vector(1, 2);
        const result = vector.addY(3);

        expect(result.x).toBe(1);
        expect(result.y).toBe(5);
    });

    it('should subtract another vector', () => {
        const vector = new Vector(1, 2);
        const result = vector.subtract(new Vector(3, 4));

        expect(result.x).toBe(-2);
        expect(result.y).toBe(-2);
    });

    it('should subtract a value to the x value', () => {
        const vector = new Vector(1, 2);
        const result = vector.subtractX(3);

        expect(result.x).toBe(-2);
        expect(result.y).toBe(2);
    });

    it('should subtract a value to the y value', () => {
        const vector = new Vector(1, 2);
        const result = vector.subtractY(3);

        expect(result.x).toBe(1);
        expect(result.y).toBe(-1);
    });
});
