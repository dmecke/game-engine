import {Howl} from 'howler';
import Progress from './Progress';

export default class AudioLoader {
    static readonly instance = new AudioLoader();
    private files: Map<string, Howl> = new Map();
    progress = new Progress(0);
    private onProgressCallbacks: ((progress: Progress) => void)[] = [];

    private constructor() {}

    static loadFiles(files: string[]): Promise<void> {
        AudioLoader.instance.progress = new Progress(files.length);

        return new Promise(resolve => {
            if (files.length === 0) {
                resolve();
            }

            for (const file of files) {
                const howl = new Howl({
                    src: `audio/${file}`,
                    onload: () => {
                        AudioLoader.instance.progress.increment();
                        AudioLoader.instance.onProgressCallbacks.forEach(callback => callback(AudioLoader.instance.progress));
                        if (AudioLoader.instance.progress.isDone()) {
                            resolve();
                        }
                    }
                });
                AudioLoader.instance.files.set(file, howl);
            }
        });
    }

    onProgress(callback: (progress: Progress) => void): void {
        this.onProgressCallbacks.push(callback);
    }

    getFile(file: string): Howl {
        const howl = this.files.get(file);
        if (!howl) {
            throw new Error(`Could not find audio file with name "${file}".`);
        }

        return howl;
    }

    getFileOrNull(file: string): Howl|null {
        const howl = this.files.get(file);
        if (!howl) {
            return null;
        }

        return howl;
    }
}
