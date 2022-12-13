import Rng from '../../../src/Math/Rng';

describe('Rng', () => {
    it('should create a new instance of Rng', () => {
        expect(Rng.instance).toBeInstanceOf(Rng);
    });

    it('should return a random integer between 0 and the max value', () => {
        const max = 10;

        for (let i = 0; i < 10; i++) {
            const result = Rng.instance.randomInt(max);

            expect(result).toBeLessThanOrEqual(max);
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toEqual(Math.floor(result));
        }
    });

    it('should return a random float between 0 and the max vlaue', () => {
        const max = 10.0;

        for (let i = 0; i < 10; i++) {
            const result = Rng.instance.randomFloat(max);

            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThan(max);
        }
    });

    it('should return a random integer between the given min and max values', () => {
        const min = 1;
        const max = 10;

        for (let i = 0; i < 10; i++) {
            const result = Rng.instance.randomIntBetween(min, max);

            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
            expect(result).toEqual(Math.floor(result));
        }
    });

    it('should return a random float between the given min and max values', () => {
        const min = 1.0;
        const max = 10.0;

        for (let i = 0; i < 10; i++) {
            const result = Rng.instance.randomFloatBetween(min, max);

            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        }
    });

    describe('chance', () => {
        it('has chance method that returns a boolean', () => {
            const result = Rng.instance.chance(50);

            expect(typeof result).toBe('boolean');
        });

        it('has returns true for a chance of 100', () => {
            const result = Rng.instance.chance(100);

            expect(result).toBe(true);
        });

        it('has returns false for a chance of 0', () => {
            const result = Rng.instance.chance(0);

            expect(result).toBe(false);
        });
    });

    it('returns a random element from an array', () => {
        const result = Rng.instance.choose(['apple', 'banana', 'orange']);
        expect(['apple', 'banana', 'orange']).toContain(result);
    });
});
