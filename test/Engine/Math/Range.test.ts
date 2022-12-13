import Range from '../../../src/Math/Range';

describe('Range', () => {
    it('throws an error if min value is greater than max value', () => {
        expect(() => new Range(5, 3)).toThrowError('Min value of range must not be bigger than max value: 5 -> 3.');
    });

    it('generates a random float between min and max values', () => {
        const range = new Range(3, 5);

        for (let i = 0; i < 10; i++) {
            const randomFloat = range.randomFloatBetween();

            expect(randomFloat).toBeGreaterThanOrEqual(range.min);
            expect(randomFloat).toBeLessThanOrEqual(range.max);
        }
    });
});
