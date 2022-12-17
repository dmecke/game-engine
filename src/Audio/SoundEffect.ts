import {Howl} from 'howler';
import Vector from '../Math/Vector';

export default class SoundEffect {
    private readonly soundEffect: Howl;

    constructor(
        private readonly sound: string,
        loop = false,
        volume = 1,
    ) {
        this.soundEffect = new Howl({
            src: `audio/${sound}`,
            autoplay: true,
            loop,
            volume,
        });
        if (!loop) {
            this.soundEffect.on('end', () => this.soundEffect.unload());
        }
    }

    reset(): this {
        this.soundEffect.seek(0);

        return this;
    }

    volume(volume: number): this {
        this.soundEffect.volume(volume);

        return this;
    }

    play(): this {
        this.soundEffect.play();

        return this;
    }

    stop(): this {
        this.soundEffect.stop();
        this.soundEffect.pos()

        return this;
    }

    pitch(value: number): this {
        this.soundEffect.rate(value);

        return this;
    }

    fadeTo(volume: number, duration: number): this {
        this.soundEffect.fade(this.soundEffect.volume(), volume, duration);

        return this;
    }

    fadeIn(duration: number): this {
        return this.fadeTo(1, duration);
    }

    fadeOut(duration: number): this {
        return this.fadeTo(0, duration);
    }

    mute(mute: boolean): this {
        if (this.soundEffect.mute() !== mute) {
            this.soundEffect.mute(mute);
        }

        return this;
    }

    at(position: Vector, maxDistance: number): this {
        this.soundEffect.pos(position.x, position.y, -0.5);
        this.soundEffect.pannerAttr({
            panningModel: 'HRTF',
            distanceModel: 'linear',
            maxDistance,
        });

        return this;
    }
}
