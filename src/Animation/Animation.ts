import AnimationType from './AnimationType';

export default class Animation {
    timer = 0;
    private frameChangedCallbacks: ((frame: number) => void)[] = [];
    private frameChangedToCallbacks: Map<number, (() => void)[]> = new Map();
    private endedCallbacks: (() => void)[] = [];
    private ended = false;

    constructor(
        private _type: AnimationType,
    ) {
    }

    onFrameChanged(callback: (frame: number) => void): void {
        this.frameChangedCallbacks.push(callback);
    }

    onFrameChangedTo(frame: number, callback: () => void): void {
        let map = this.frameChangedToCallbacks.get(frame);
        if (!map) {
            map = [];
        }
        map.push(callback);

        this.frameChangedToCallbacks.set(frame, map);
    }

    onEnded(callback: () => void): void {
        this.endedCallbacks.push(callback);
    }

    update(): void {
        if (this.ended) {
            return;
        }

        this.timer++;
        if (this.timer % this.type.frameDuration === 0) {
            this.frameChangedCallbacks.forEach(callback => callback(this.index));
            const map = this.frameChangedToCallbacks.get(this.index);
            if (map) {
                map.forEach(callback => callback());
            }
        }
        if (this.timer % (this.type.frames * this.type.frameDuration) === 0) {
            this.endedCallbacks.forEach(callback => callback());
            if (!this._type.loops) {
                this.ended = true;
                this.timer--;
            }
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
        this.frameChangedToCallbacks = new Map();
        this.endedCallbacks = [];
        this.ended = false;
    }
}
