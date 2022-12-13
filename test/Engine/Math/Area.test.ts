import Area from '../../../src/Math/Area';
import Vector from '../../../src/Math/Vector';

describe('Area', () => {
    it('should create an Area object with the given position and size', () => {
        const position = new Vector(1, 2);
        const size = new Vector(3, 4);
        const area = new Area(position, size);

        expect(area.position).toEqual(position);
        expect(area.size).toEqual(size);
    });

    it('should create an Area object around the given position and range', () => {
        const position = new Vector(1, 2);
        const range = 5;
        const area = Area.around(position, range);

        expect(area.position).toEqual(new Vector(-4, -3));
        expect(area.size).toEqual(new Vector(10, 10));
    });

    it('should add a position to the current position', () => {
        const position = new Vector(1, 2);
        const size = new Vector(3, 4);
        const area = new Area(position, size);

        const result = area.add(new Vector(2, 3));

        expect(result.position).toEqual(new Vector(3, 5));
        expect(result.size).toEqual(size);
    });

    it('should subtract a position from the current position', () => {
        const position = new Vector(1, 2);
        const size = new Vector(3, 4);
        const area = new Area(position, size);

        const result = area.subtract(new Vector(2, 3));

        expect(result.position).toEqual(new Vector(-1, -1));
        expect(result.size).toEqual(size);
    });

    it('should divide the current position and size by the given divisor', () => {
        const position = new Vector(1, 2);
        const size = new Vector(3, 4);
        const area = new Area(position, size);

        const result = area.divide(2);

        expect(result.position).toEqual(new Vector(0.5, 1));
        expect(result.size).toEqual(new Vector(1.5, 2));
    });

    it('should throw an error when dividing by zero', () => {
        const position = new Vector(1, 2);
        const size = new Vector(3, 4);
        const area = new Area(position, size);

        expect(() => area.divide(0)).toThrow('Cannot divide by zero.');
    });

    it('should return a new Area with the position values floored', () => {
        const area = new Area(new Vector(1.5, 2.5), new Vector(3.5, 4.5));
        const floored = area.floor();

        expect(floored.position).toEqual(new Vector(1, 2));
        expect(floored.size).toEqual(new Vector(3.5, 4.5));
    });

    it('should return true if the given position is within the Area', () => {
        const area = new Area(new Vector(1, 2), new Vector(3, 4));
        const inArea = area.contains(new Vector(2, 3));
        const onEdgeOfArea = area.contains(new Vector(4, 5));
        const outOfArea = area.contains(new Vector(5, 5));

        expect(inArea).toBe(true);
        expect(onEdgeOfArea).toBe(false);
        expect(outOfArea).toBe(false);
    });

    it('should return true if the area contains at least one of the positions', () => {
        const area = new Area(new Vector(0, 0), new Vector(10, 10));
        const positionsWithAtLeastOneInArea = [new Vector(5, 5), new Vector(11, 11)];
        const positionsWithNoneInArea = [new Vector(11, 11), new Vector(12, 12)];

        expect(area.containsOneOf(positionsWithAtLeastOneInArea)).toBe(true);
        expect(area.containsOneOf(positionsWithNoneInArea)).toBe(false);
    });

    it('returns the correct value for left', () => {
        const area = new Area(new Vector(10, 10), new Vector(20, 20));

        expect(area.left).toEqual(10);
    });

    it('returns the correct value for right', () => {
        const area = new Area(new Vector(10, 10), new Vector(20, 20));

        expect(area.right).toEqual(30);
    });

    it('returns the correct value for top', () => {
        const area = new Area(new Vector(10, 10), new Vector(20, 20));

        expect(area.top).toEqual(10);
    });

    it('returns the correct value for bottom', () => {
        const area = new Area(new Vector(10, 10), new Vector(20, 20));

        expect(area.bottom).toEqual(30);
    });

    it('returns the correct value for center', () => {
        const area = new Area(new Vector(10, 10), new Vector(20, 20));

        expect(area.center).toEqual(new Vector(20, 20));
    });

    it('should return the intersection of two areas', () => {
        const area1 = new Area(new Vector(10, 10), new Vector(10, 10));
        const area2 = new Area(new Vector(15, 15), new Vector(10, 10));
        const intersectedArea = area1.intersection(area2);

        expect(intersectedArea.position.x).toEqual(15);
        expect(intersectedArea.position.y).toEqual(15);
        expect(intersectedArea.size.x).toEqual(5);
        expect(intersectedArea.size.y).toEqual(5);
    });

    it('should throw an error when calculating the intersection and the areas do not overlap', () => {
        const area1 = new Area(new Vector(10, 10), new Vector(10, 10));
        const area2 = new Area(new Vector(20, 20), new Vector(10, 10));

        expect(() => area1.intersection(area2)).toThrow('Areas do not overlap.');
    });

    it('should return true if the areas overlap', () => {
        const area1 = new Area(new Vector(10, 10), new Vector(10, 10));
        const area2 = new Area(new Vector(15, 15), new Vector(10, 10));
        const area3 = new Area(new Vector(20, 20), new Vector(10, 10));

        expect(area1.overlaps(area2)).toEqual(true);
        expect(area1.overlaps(area3)).toEqual(false);
    });

    it('should have an area equal to the size x multiplied by the size y', () => {
        const position = new Vector(0, 0);
        const size = new Vector(10, 5);
        const area = new Area(position, size);

        expect(area.area).toEqual(50);
    });

    it('should return a string with the position and size in the expected format', () => {
        const position = new Vector(0, 0);
        const size = new Vector(10, 5);
        const area = new Area(position, size);

        expect(area.toString()).toEqual('0|0 - 9|4');
    });

    it('should return a random point inside the area', () => {
        const area = new Area(new Vector(10, 10), new Vector(20, 20));
        for (let i = 0; i < 10; i++) {
            const point = area.getRandomPoint();

            expect(point.x).toBeGreaterThanOrEqual(area.position.x);
            expect(point.x).toBeLessThanOrEqual(area.position.x + area.size.x - 1);
            expect(point.y).toBeGreaterThanOrEqual(area.position.y);
            expect(point.y).toBeLessThanOrEqual(area.position.y + area.size.y - 1);
        }
    });
});
