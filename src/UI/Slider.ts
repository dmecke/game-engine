import Area from '../Math/Area';
import CanvasSprite from '../Canvas/CanvasSprite';
import Mouse from '../Input/Mouse';
import PressedState from '../Input/PressedState';
import Range from '../Math/Range';
import Vector from '../Math/Vector';

export default class Slider {
    private readonly onChangeListeners: (() => void)[] = [];
    selected = false;

    private readonly backgroundLeft: CanvasSprite;
    private readonly backgroundCenter: CanvasSprite;
    private readonly backgroundRight: CanvasSprite;
    private readonly backgroundEndOffset = 8;

    constructor(
        background: HTMLImageElement,
        private readonly handle: HTMLImageElement,
        private readonly mouse: Mouse,
        private readonly mouseState: PressedState,
        private readonly position: Vector,
        private readonly range: Range,
        private readonly width: number,
        private _value: number,
    ) {
        const backgroundWidth = background.width / 3;
        const size = new Vector(backgroundWidth, background.height);
        this.backgroundLeft = new CanvasSprite(background, Vector.null(), size, position);
        this.backgroundCenter = new CanvasSprite(background, new Vector(backgroundWidth, 0), size, position.addX(backgroundWidth));
        this.backgroundRight = new CanvasSprite(background, new Vector(backgroundWidth * 2, 0), size, position.addX(this.width - backgroundWidth));
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = this.range.clamp(value);
        this.onChangeListeners.forEach(listener => listener());
    }

    onChange(callback: (value: number) => void): void {
        this.onChangeListeners.push(() => callback(this._value));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if (this.isDragging) {
            this.value = this.range.min + (this.mouse.position.x - this.position.x - this.backgroundEndOffset) / (this.width - this.backgroundEndOffset * 2) * (this.range.max - this.range.min);
        }

        const backgroundWidth = this.backgroundLeft.image.width / 3;
        this.backgroundLeft.draw(ctx);
        ctx.drawImage(this.backgroundCenter.image, backgroundWidth, 0, backgroundWidth, this.backgroundCenter.image.height, this.position.x + backgroundWidth, this.position.y, this.width - 2 * backgroundWidth, this.backgroundCenter.image.height);
        this.backgroundRight.draw(ctx);

        new CanvasSprite(
            this.handle,
            this.isHovered || this.selected ? new Vector(this.handle.width / 2, 0) : Vector.null(),
            new Vector(this.handle.width / 2, this.handle.height),
            this.handlePosition,
        ).draw(ctx);
    }

    private get isDragging(): boolean {
        if (!this.isHovered) {
            return false;
        }

        return this.mouseState.permanent;
    }

    private get isHovered(): boolean {
        return new Area(this.handlePosition, new Vector(this.handle.width / 2, this.handle.height)).contains(this.mouse.position);
    }

    private get handlePosition(): Vector {
        const normalizedValue = (this.value - this.range.min) / (this.range.max - this.range.min);

        return this.position.addX(normalizedValue * (this.width - this.backgroundEndOffset * 2) + this.backgroundEndOffset - this.handle.width / 2 / 2);
    }
}
