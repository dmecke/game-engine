import Font from '../Font/Font';
import Label from './Label';
import Mouse from '../Input/Mouse';
import PressedState from '../Input/PressedState';
import TextButton from './TextButton';
import Vector from '../Math/Vector';

export default class UI {
    constructor(
        private readonly font: Font,
        private readonly mouse: Mouse,
        private readonly mouseState: PressedState,
        private readonly buttonImage: HTMLImageElement,
    ) {
    }

    createLabel(text: string, position: Vector): Label {
        return new Label(this.font, text, position);
    }

    createTextButton(label: string, position: Vector, callback: () => void): TextButton {
        return new TextButton(this.font, this.buttonImage, this.mouse, this.mouseState, label, position, callback);
    }
}
