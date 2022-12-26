import Button from './Button';
import Font from '../Font/Font';
import Mouse from '../Input/Mouse';
import PressedState from '../Input/PressedState';
import Vector from '../Math/Vector';

export default class TextButton extends Button {
    constructor(
        private readonly font: Font,
        image: HTMLImageElement,
        mouse: Mouse,
        mouseState: PressedState,
        private readonly label: string,
        position: Vector,
        callback: () => void,
    ) {
        super(image, mouse, mouseState, position, callback);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        this.font.alignCenter().at(this.position.addY(4).addY(this.textOffset)).text(this.label).draw(ctx);
    }

    private get textOffset(): number {
        if (!this.isHovered) {
            return 0;
        }

        return this.mouseState.permanent ? 1 : 0;
    }
}
