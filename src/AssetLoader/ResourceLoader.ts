import AudioLoader from './AudioLoader';
import ImageLoader from './ImageLoader';
import Progress from './Progress';

export default class ResourceLoader {
    static readonly instance = new ResourceLoader();
    progress = new Progress(0);
    private onProgressCallbacks: ((progress: Progress) => void)[] = [];

    static load(images: string[], audio: string[]): Promise<[void, void]> {
        ResourceLoader.instance.progress = new Progress(images.length + audio.length);
        ImageLoader.instance.onProgress(() => {
            ResourceLoader.instance.progress.increment();
            ResourceLoader.instance.onProgressCallbacks.forEach(callback => callback(ResourceLoader.instance.progress));
        });
        AudioLoader.instance.onProgress(() => {
            ResourceLoader.instance.progress.increment();
            ResourceLoader.instance.onProgressCallbacks.forEach(callback => callback(ResourceLoader.instance.progress));
        });

        return Promise.all([
            ImageLoader.loadImages(images),
            AudioLoader.loadFiles(audio),
        ]);
    }

    onProgress(callback: (progress: Progress) => void): void {
        this.onProgressCallbacks.push(callback);
    }

    get imageProgress(): Progress {
        return ImageLoader.instance.progress;
    }

    get audioProgress(): Progress {
        return AudioLoader.instance.progress;
    }
}
