import CanvasSprite from '../../src/Canvas/CanvasSprite';
import Vector from '../../src/Math/Vector';

describe('CanvasSprite', () => {
    it('should draw the sprite on the canvas', () => {
        const image = new Image();
        const offset = new Vector(0, 0);
        const size = new Vector(10, 10);
        const position = new Vector(5, 5);
        const sprite = new CanvasSprite(image, offset, size, position);

        const ctx = {
            drawImage: jest.fn(),
        } as unknown as CanvasRenderingContext2D;

        sprite.draw(ctx);

        expect(ctx.drawImage).toHaveBeenCalledWith(image, 0, 0, 10, 10, 5, 5, 10, 10);
    });
});
