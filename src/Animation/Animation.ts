import AnimationType from './AnimationType';

export default class Animation {
    private timer = 0;
    private frameChangedCallbacks: ((frame: number) => void)[] = [];
    private endedCallbacks: (() => void)[] = [];

    constructor(
        private _type: AnimationType,
    ) {
    }

    onFrameChanged(callback: (frame: number) => void): void {
        this.frameChangedCallbacks.push(callback);
    }

    onEnded(callback: () => void): void {
        this.endedCallbacks.push(callback);
    }

    update(): void {
        this.timer++;
        if (this.timer % this.type.frameDuration === 0) {
            this.frameChangedCallbacks.forEach(callback => callback(this.index));
        }
        if (this.timer % (this.type.frames * this.type.frameDuration) === 0) {
            this.endedCallbacks.forEach(callback => callback());
        }
    }

    get index(): number {
        return Math.floor(this.timer / this.type.frameDuration) % this.type.frames;
    }

    get type(): AnimationType {
        return this._type;
    }

    set type(type: AnimationType) {
        if (this._type.name === type.name) {
            return;
        }

        this._type = type;
        this.timer = 0;
        this.frameChangedCallbacks = [];
        this.endedCallbacks = [];
    }
}
