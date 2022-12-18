export default class GameLoop {
    private last = 0;

    private _update: ((delta: number) => void)|null = null;
    private _render: (() => void)|null = null;

    constructor(
    ) {
        requestAnimationFrame(time => this.loop(time));
    }

    /**
     * Called as soon as the browser is ready. This is dependent on the refresh rate of the monitor.
     * Should be used for everything to be put on the screen.
     */
    set render(callback: (() => void)) {
        this._render = callback;
    }

    /**
     * Called as soon as the browser is ready. This is dependent on the refresh rate of the monitor.
     * The given delta has to be taken into account for things like movement.
     *
     * Example: A character shall move 1px per frame.
     *
     * const movement = fps / 1000 * delta;
     *
     * If the game actually runs at 60 fps, update is called with a delta of 16.6:
     * const movement = 60 / 1000 * 16.6;
     * const movement = 1;
     *
     * If the game can only run at 30 fps, update is called with a delta of 33.3:
     * const movement = 60 / 1000 * 33.3;
     * const movement = 2;
     *
     * If the game runs at 144 fps (because of a higher refresh rate of the monitor), update is called with a delta of 6.94:
     * const movement = 60 / 1000 * 6.94;
     * const movement = 0.4164;
     *
     * In all cases the perceived movement speed of the character is the same, because the movement per second now is always constant.
     */
    set update(callback: ((delta: number) => void)) {
        this._update = callback;
    }

    /**
     * Called as often as specified with the fps parameter. This is independant of the refresh rate of the monitor.
     * It might be delayed if the game cannot catch up with its calculations.
     *
     * Example: Physics that must not be dependent on a too-high delta as it would cause objects glitching through walls etc.
     * FPS: 60
     *
     * Example: Calculating paths or AI behavior, that are fine to be not as real-time as other things and / or are cost-intensive.
     * FPS: 30, or even as low as 1
     */
    addFixedUpdate(callback: (() => void), fps: number) {
        const fixedUpdate = () => {
            const start = performance.now();
            callback();
            const delay = performance.now() - start;
            setTimeout(fixedUpdate, Math.max(0, 1000 / fps - delay));
        }

        setTimeout(fixedUpdate, 1000 / fps);
    }

    private loop(current: number): void {
        requestAnimationFrame(time => this.loop(time));

        const delta = current - this.last;
        if (this._update) {
            this._update(delta);
        }
        if (this._render) {
            this._render();
        }
        this.last = current;
    }
}
