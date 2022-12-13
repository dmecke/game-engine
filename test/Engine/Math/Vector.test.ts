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

    it('should multiply a value', () => {
        const vector = new Vector(1, 2);
        const result = vector.multiply(3);

        expect(result.x).toBe(3);
        expect(result.y).toBe(6);
    });

    it('should multiply the x value', () => {
        const vector = new Vector(1, 2);
        const result = vector.multiplyX(3);

        expect(result.x).toBe(3);
        expect(result.y).toBe(2);
    });

    it('should multiply the y value', () => {
        const vector = new Vector(1, 2);
        const result = vector.multiplyY(3);

        expect(result.x).toBe(1);
        expect(result.y).toBe(6);
    });

    it('should divide the vector by the given divisor', () => {
        const vector = new Vector(4, 8);

        expect(vector.divide(2)).toEqual(new Vector(2, 4));
    });

    it('should throw an error if the divisor is 0', () => {
        const vector = new Vector(4, 8);

        expect(() => vector.divide(0)).toThrowError('Cannot divide by zero.');
    });

    it('returns the length of the vector', () => {
        const vector = new Vector(3, 4);

        expect(vector.length).toBe(5);
    });

    describe('normalize', () => {
        it('returns a normalized vector', () => {
            const vector = new Vector(3, 4);

            expect(vector.normalize()).toEqual(new Vector(0.6, 0.8));
        });

        it('returns a null vector if the length is 0', () => {
            const vector = new Vector(0, 0);

            expect(vector.normalize()).toEqual(Vector.null());
        });
    });

    it('should return a new vector that is perpendicular to the original vector', () => {
        const vector = new Vector(1, 2);
        const perpendicularVector = vector.perpendicular();

        expect(perpendicularVector.x).toBe(2);
        expect(perpendicularVector.y).toBe(1);
    });

    it('calculates the distance to another vector', () => {
        const vector1 = new Vector(1, 1);
        const vector2 = new Vector(4, 5);

        expect(vector1.distanceTo(vector2)).toBe(5);
    });

    it('calculates the distance squared to another vector', () => {
        const vector1 = new Vector(1, 1);
        const vector2 = new Vector(4, 5);

        expect(vector1.distanceSquaredTo(vector2)).toBe(25);
    });

    it('should round values correctly', () => {
        const vector = new Vector(1.5, 2.5);
        const roundedVector = vector.round();

        expect(roundedVector.x).toBe(2);
        expect(roundedVector.y).toBe(3);
    });

    it('should floor values correctly', () => {
        const vector = new Vector(1.9, 2.9);
        const flooredVector = vector.floor();

        expect(flooredVector.x).toBe(1);
        expect(flooredVector.y).toBe(2);
    });

    it('should ceil values correctly', () => {
        const vector = new Vector(1.1, 2.1);
        const ceiledVector = vector.ceil();

        expect(ceiledVector.x).toBe(2);
        expect(ceiledVector.y).toBe(3);
    });

    it('should create a square around Vector instance with given size', () => {
        const vector = new Vector(1, 2);
        const square = vector.squareAround(10);

        expect(square.position.x).toBe(-4);
        expect(square.position.y).toBe(-3);
        expect(square.size.x).toBe(10);
        expect(square.size.y).toBe(10);
    });

    it('should create a circle around Vector instance with given radius', () => {
        const vector = new Vector(1, 2);
        const circle = vector.circleAround(10);

        expect(circle.position.x).toBe(1);
        expect(circle.position.y).toBe(2);
        expect(circle.radius).toBe(10);
    });

    it('should return the correct direction to another vector', () => {
        const vector1 = new Vector(10, 10);
        const vector2 = new Vector(20, 20);
        const direction = vector1.directionTo(vector2);

        expect(direction).toBe(315);
    });

    it('should return the correct lerp value to another vector', () => {
        const vector1 = new Vector(10, 10);
        const vector2 = new Vector(20, 20);
        const lerpVector = vector1.lerpTo(vector2, 0.5);

        expect(lerpVector).toEqual(new Vector(15, 15));
    });
});
