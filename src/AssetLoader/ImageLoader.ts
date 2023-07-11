import CanvasSprite from '../Canvas/CanvasSprite';
import Progress from './Progress';
import Vector from '../Math/Vector';

export default class ImageLoader {
    static readonly instance = new ImageLoader();
    private images: Map<string, HTMLImageElement> = new Map();
    progress = new Progress(0);
    private onProgressCallbacks: ((progress: Progress) => void)[] = [];

    private constructor() {}

    static loadImages(images: string[]): Promise<void> {
        ImageLoader.instance.progress = new Progress(images.length);

        return new Promise(resolve => {
            if (images.length === 0) {
                resolve();
            }

            for (const image of images) {
                const img = new Image();
                img.src = `images/${image}`;
                img.onload = () => {
                    ImageLoader.instance.progress.increment();
                    ImageLoader.instance.onProgressCallbacks.forEach(callback => callback(ImageLoader.instance.progress));
                    if (ImageLoader.instance.progress.isDone()) {
                        resolve();
                    }
                }
                ImageLoader.instance.images.set(image, img);
            }
        });
    }

    onProgress(callback: (progress: Progress) => void): void {
        this.onProgressCallbacks.push(callback);
    }

    fromName(image: string, offset: Vector, size: Vector, position: Vector): CanvasSprite {
        return new CanvasSprite(ImageLoader.instance.getImage(image), offset, size, position);
    }

    getImage(image: string): HTMLImageElement {
        const element = this.images.get(image);

        if (!element) {
            throw new Error(`Could not find image with name "${image}".`);
        }

        return element;
    }
}
