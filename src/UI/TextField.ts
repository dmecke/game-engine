import Area from '../Math/Area';
import CanvasSprite from '../Canvas/CanvasSprite';
import Font from '../Font/Font';
import Mouse from '../Input/Mouse';
import PressedState from '../Input/PressedState';
import Vector from '../Math/Vector';

export default class TextField {
    private _selected = false;
    private readonly onChangeListeners: (() => void)[] = [];
    private readonly onSelectedListeners: (() => void)[] = [];

    constructor(
        private readonly font: Font,
        private readonly image: HTMLImageElement,
        private readonly position: Vector,
        private _value: string,
        private readonly mouse: Mouse,
        private readonly mouseState: PressedState,
    ) {
        window.addEventListener('keydown', e => {
            if (!this._selected) {
                return;
            }

            if (e.key === 'Backspace') {
                this.value = this.value.slice(0, -1);
            } else if (e.key.length === 1) { // avoid special keys
                const char = e.key.toLowerCase();

                if (!this.font.supportsCharacter(char)) {
                    return;
                }

                this.value = this.value += char.toLowerCase();
            }
        });
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if (this.isClicked) {
            this.selected = true;
        }

        new CanvasSprite(
            this.image,
            this.offset,
            this.size,
            this.position,
        ).draw(ctx);

        this.font.at(this.position.addX(4).addY(2)).alignLeft().text(this._value).draw(ctx);
    }

    trigger(): void {
        this.selected = true;
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
        this.onChangeListeners.forEach(listener => listener());
    }

    set selected(selected: boolean) {
        const oldValue = this._selected;
        this._selected = selected;
        if (selected && !oldValue) {
            this.onSelectedListeners.forEach(listener => listener());
        }
    }

    onSelected(callback: () => void): void {
        this.onSelectedListeners.push(callback);
    }

    onChange(callback: (value: string) => void): void {
        this.onChangeListeners.push(() => callback(this._value));
    }

    private get offset(): Vector {
        const y = this._selected ? this.size.y : 0;

        return new Vector(0, y);
    }

    private get size(): Vector {
        return new Vector(this.image.width, this.image.height / 2);
    }

    private get isClicked(): boolean {
        if (!this.isHovered) {
            return false;
        }

        return this.mouseState.once;
    }

    private get isHovered(): boolean {
        return new Area(this.position, this.size).contains(this.mouse.position);
    }
}
