import lerp from '../../../src/Math/lerp';

describe('lerp', () => {
    it('should return the correct interpolated value between a and b', () => {
        expect(lerp(0, 10, 0.5)).toEqual(5);
        expect(lerp(5, 15, 0.25)).toEqual(7.5);
        expect(lerp(-2, 2, 0.75)).toEqual(1);
    });
});
