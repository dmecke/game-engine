import ImageLoader from '../../src/AssetLoader/ImageLoader';

describe('ImageLoader', () => {
    it('should resolve when images are loaded', async () => {
        await ImageLoader.loadImages([]);
        expect.anything();
    });
});
