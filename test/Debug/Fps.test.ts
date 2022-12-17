import Fps from '../../src/Debug/Fps';

describe('Fps', () => {
    it('should initialize with zero frames', () => {
        const fps = new Fps();
        expect(fps.fps).toEqual(0);
    });

    it('should add the current time to the times array on tick', () => {
        const fps = new Fps();
        fps.tick();

        expect(fps.fps).toEqual(1);
    });
});
