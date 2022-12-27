import Area from '../Math/Area';
import CanvasSprite from '../Canvas/CanvasSprite';
import Mouse from '../Input/Mouse';
import PressedState from '../Input/PressedState';
import Vector from '../Math/Vector';

export default class Toggle {
    selected = false;
    enabled = true;

    constructor(
        private readonly imageEnabled: HTMLImageElement,
        private readonly imageDisabled: HTMLImageElement,
        private readonly mouse: Mouse,
        private readonly mouseState: PressedState,
        private readonly position: Vector,
        private readonly callback: () => void,
    ) {
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if (this.isClicked) {
            this.enabled = !this.enabled;
            this.callback();
        }

        new CanvasSprite(
            this.enabled ? this.imageEnabled : this.imageDisabled,
            this.offset,
            this.size,
            this.position.subtractX(this.size.x / 2),
        ).draw(ctx);
    }

    trigger(): void {
        this.enabled = !this.enabled;
        this.callback();
    }

    private get offset(): Vector {
        const x = this.selected ? this.size.x : 0;

        if (!this.isHovered) {
            return new Vector(x, 0);
        }

        return this.mouseState.permanent ? new Vector(x, this.size.y * 2) : new Vector(x, this.size.y);
    }

    private get isClicked(): boolean {
        if (!this.isHovered) {
            return false;
        }

        return this.mouseState.once;
    }

    protected get isHovered(): boolean {
        return new Area(this.position.subtractX(this.size.x / 2), this.size).contains(this.mouse.position);
    }

    private get size(): Vector {
        return new Vector(this.imageEnabled.width / 2, this.imageEnabled.height / 3);
    }
}
