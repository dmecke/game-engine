import Button from './Button';
import Mouse from '../Input/Mouse';
import PressedState from '../Input/PressedState';
import Vector from '../Math/Vector';

export default class IconButton extends Button {
    constructor(
        image: HTMLImageElement,
        mouse: Mouse,
        mouseState: PressedState,
        position: Vector,
        callback: () => void,
    ) {
        super(image, mouse, mouseState, position, callback);
    }
}
