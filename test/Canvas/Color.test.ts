import Color from '../../src/Canvas/Color';

describe('Color', () => {
    it('should convert the color to a hex string', () => {
        const color = Color.fromInts(255, 0, 0);

        expect(color).toBeInstanceOf(Color);
        expect(color.toString()).toEqual('#ff0000');
    });

    it('should pad the hex string with zeros if the value is less than 10', () => {
        const color = Color.fromInts(0, 0, 1);

        expect(color.toString()).toEqual('#000001');
    });

    it('should return the predefined colors', () => {
        expect(Color.black.toString()).toBe('#000000');
        expect(Color.white.toString()).toBe('#ffffff');
        expect(Color.red.toString()).toBe('#ff0000');
        expect(Color.green.toString()).toBe('#00ff00');
        expect(Color.blue.toString()).toBe('#0000ff');
        expect(Color.yellow.toString()).toBe('#ffff00');
        expect(Color.magenta.toString()).toBe('#ff00ff');
        expect(Color.cyan.toString()).toBe('#00ffff');
        expect(Color.olive.toString()).toBe('#808000');
        expect(Color.purple.toString()).toBe('#800080');
        expect(Color.teal.toString()).toBe('#008080');
    });

    describe('equals', () => {
        it('returns true when two colors are equal', () => {
            const color1 = Color.fromInts(255, 0, 0);
            const color2 = Color.fromInts(255, 0, 0);

            expect(color1.equals(color2)).toBe(true);
        });

        it('returns false when two colors are not equal', () => {
            const color1 = Color.fromInts(255, 0, 0);
            const color2 = Color.fromInts(0, 255, 0);

            expect(color1.equals(color2)).toBe(false);
        });
    });

    it('should merge two colors with a given ratio', () => {
        const mergedColor = Color.red.merge(Color.green, 0.5);

        expect(mergedColor.equals(Color.olive)).toBe(true);
    });
});
