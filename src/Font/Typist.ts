import Range from '../Math/Range';
import Rng from '../Math/Rng';
import SoundEffect from '../Audio/SoundEffect';

export default class Typist {
    private speed = 0.5;
    private pitch = new Range(0.9, 1.1);
    private overlap = 50;
    private _position = 0;
    private _sound: string|null = null;
    private lastSound: number|null = null;

    constructor(
        private readonly text: string,
    ) {
    }

    sound(sound: string): void {
        this._sound = sound;
    }

    get isComplete(): boolean {
        return this._position === this.text.length;
    }

    get position(): number {
        return this._position;
    }

    skip(): void {
        this._position = this.text.length;
    }

    update(): void {
        if (this.isComplete) {
            return;
        }

        this._position += this.speed;
        if (this._sound !== null && this._position % 1 === 0) {
            const now = performance.now();
            if (this.lastSound === null || now - this.lastSound > this.overlap) {
                new SoundEffect(this._sound).pitch(Rng.instance.randomFloatBetween(this.pitch.min, this.pitch.max));
                this.lastSound = now;
            }
        }
    }
}
