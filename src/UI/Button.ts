import Area from '../Math/Area';
import CanvasSprite from '../Canvas/CanvasSprite';
import Mouse from '../Input/Mouse';
import PressedState from '../Input/PressedState';
import Vector from '../Math/Vector';

export default abstract class Button {
    selected = false;

    protected constructor(
        private readonly image: HTMLImageElement,
        private readonly mouse: Mouse,
        protected readonly mouseState: PressedState,
        protected readonly position: Vector,
        private readonly callback: () => void,
    ) {
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if (this.isClicked) {
            this.callback();
        }

        new CanvasSprite(
            this.image,
            this.offset,
            this.size,
            this.position.subtractX(this.size.x / 2),
        ).draw(ctx);
    }

    trigger(): void {
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
        return new Vector(this.image.width / 2, this.image.height / 3);
    }
}
