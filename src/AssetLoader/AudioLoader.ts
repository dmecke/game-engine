import {Howl} from 'howler';

export default class AudioLoader {
    static readonly instance = new AudioLoader();
    private files: Map<string, Howl> = new Map();

    private constructor() {}

    static loadFiles(files: string[]): Promise<void> {
        return new Promise(resolve => {
            if (files.length === 0) {
                resolve();
            }

            let loaded = 0;
            for (const file of files) {
                const howl = new Howl({
                    src: `audio/${file}`,
                    onload: () => {
                        loaded++;
                        if (loaded === files.length) {
                            resolve();
                        }
                    }
                });
                AudioLoader.instance.files.set(file, howl);
            }
        });
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
