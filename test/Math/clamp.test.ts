import clamp from '../../src/Math/clamp';

describe('clamp', () => {
    it('should return the value if it is within the range of min and max', () => {
        expect(clamp(5, 1, 10)).toBe(5);
    });

    it('should return the min value if the value is less than the min value', () => {
        expect(clamp(0, 1, 10)).toBe(1);
    });

    it('should return the max value if the value is greater than the max value', () => {
        expect(clamp(11, 1, 10)).toBe(10);
    });
});
