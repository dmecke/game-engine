import Font from '../Font/Font';
import Label from './Label';
import Mouse from '../Input/Mouse';
import NineSlice from './NineSlice';
import NineSliceMargin from './NineSliceMargin';
import PressedState from '../Input/PressedState';
import TextButton from './TextButton';
import Vector from '../Math/Vector';

export default class UI {
    private _font: Font|null = null;
    private _mouse: Mouse|null = null;
    private _mouseState: PressedState|null = null;
    private _buttonImage: HTMLImageElement|null = null;
    private _panelImage: HTMLImageElement|null = null;
    private _panelMargin: NineSliceMargin|null = null;

    set font(font: Font) {
        this._font = font;
    }

    get font(): Font {
        if (this._font === null) {
            throw new Error('UI: Font is not initialized.');
        }

        return this._font;
    }

    set mouse(mouse: Mouse) {
        this._mouse = mouse;
    }

    get mouse(): Mouse {
        if (this._mouse === null) {
            throw new Error('UI: Mouse is not initialized.');
        }

        return this._mouse;
    }

    set mouseState(mouseState: PressedState) {
        this._mouseState = mouseState;
    }

    get mouseState(): PressedState {
        if (this._mouseState === null) {
            throw new Error('UI: Mouse state is not initialized.');
        }

        return this._mouseState;
    }

    set buttonImage(buttonImage: HTMLImageElement) {
        this._buttonImage = buttonImage;
    }

    get buttonImage(): HTMLImageElement {
        if (this._buttonImage === null) {
            throw new Error('UI: Button image is not initialized.');
        }

        return this._buttonImage;
    }

    set panelImage(panelImage: HTMLImageElement) {
        this._panelImage = panelImage;
    }

    get panelImage(): HTMLImageElement {
        if (this._panelImage === null) {
            throw new Error('UI: Panel image is not initialized.');
        }

        return this._panelImage;
    }

    set panelMargin(panelMargin: NineSliceMargin) {
        this._panelMargin = panelMargin;
    }

    get panelMargin(): NineSliceMargin {
        if (this._panelMargin === null) {
            throw new Error('UI: Panel margin is not initialized.');
        }

        return this._panelMargin;
    }

    createPanel(position: Vector, size: Vector): NineSlice {
        return new NineSlice(this.panelImage, this.panelMargin, position, size);
    }

    createLabel(text: string, position: Vector): Label {
        return new Label(this.font, text, position);
    }

    createTextButton(label: string, position: Vector, callback: () => void): TextButton {
        return new TextButton(this.font, this.buttonImage, this.mouse, this.mouseState, label, position, callback);
    }
}