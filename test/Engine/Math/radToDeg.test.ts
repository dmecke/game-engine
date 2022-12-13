import radToDeg from '../../../src/Math/radToDeg';

describe('radToDeg', () => {
    it('converts radians to degrees', () => {
        expect(radToDeg(0)).toBe(0);
        expect(radToDeg(Math.PI)).toBe(180);
        expect(radToDeg(Math.PI / 2)).toBe(90);
        expect(radToDeg(Math.PI / 4)).toBe(45);
    });
});
