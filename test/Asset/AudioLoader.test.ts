import AudioLoader from '../../src/AssetLoader/AudioLoader';

describe('AudioLoader', () => {
    it('should resolve when all audio files are loaded', async () => {
        await AudioLoader.loadFiles([]);
        expect.anything();
    });
});
