import Area from '../Math/Area';
import Font from '../Font/Font';
import IconButton from './IconButton';
import Label from './Label';
import Mouse from '../Input/Mouse';
import NineSlice from './NineSlice';
import NineSliceMargin from './NineSliceMargin';
import PressedState from '../Input/PressedState';
import Range from '../Math/Range';
import Slider from './Slider';
import TextAlign from '../Font/TextAlign';
import TextButton from './TextButton';
import TextField from './TextField';
import Toggle from './Toggle';
import Vector from '../Math/Vector';

export default class UI {
    private _font: Font|null = null;
    private _mouse: Mouse|null = null;
    private _mouseState: PressedState|null = null;
    private _buttonImage: HTMLImageElement|null = null;
    private _textFieldImage: HTMLImageElement|null = null;
    private _panelImage: HTMLImageElement|null = null;
    private _panelMargin: NineSliceMargin|null = null;
    private _sliderImage: HTMLImageElement|null = null;
    private _sliderHandleImage: HTMLImageElement|null = null;

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

    set textFieldImage(textFieldImage: HTMLImageElement) {
        this._textFieldImage = textFieldImage;
    }

    get textFieldImage(): HTMLImageElement {
        if (this._textFieldImage === null) {
            throw new Error('UI: Text field image is not initialized.');
        }

        return this._textFieldImage;
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

    get sliderImage(): HTMLImageElement {
        if (this._sliderImage === null) {
            throw new Error('UI: Slider image is not initialized.');
        }

        return this._sliderImage;
    }

    set sliderImage(sliderImage: HTMLImageElement) {
        this._sliderImage = sliderImage;
    }

    get sliderHandleImage(): HTMLImageElement {
        if (this._sliderHandleImage === null) {
            throw new Error('UI: Slider handle image is not initialized.');
        }

        return this._sliderHandleImage;
    }

    set sliderHandleImage(sliderHandleImage: HTMLImageElement) {
        this._sliderHandleImage = sliderHandleImage;
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

    createPanel(area: Area): NineSlice {
        return new NineSlice(this.panelImage, this.panelMargin, area);
    }

    createLabel(text: string, position: Vector, align: TextAlign = TextAlign.left, style?: string): Label {
        return new Label(this.font, text, position, align, style ?? this.font.getStyle());
    }

    createTextButton(label: string, position: Vector, callback: () => void): TextButton {
        return new TextButton(this.font, this.buttonImage, this.mouse, this.mouseState, label, position, callback);
    }

    createIconButton(image: HTMLImageElement, position: Vector, callback: () => void): IconButton {
        return new IconButton(image, this.mouse, this.mouseState, position, callback);
    }

    createTextField(position: Vector, value: string): TextField {
        return new TextField(this.font, this.textFieldImage, position, value, this.mouse, this.mouseState);
    }

    createToggle(imageEnabled: HTMLImageElement, imageDisabled: HTMLImageElement, position: Vector, callback: () => void): Toggle {
        return new Toggle(imageEnabled, imageDisabled, this.mouse, this.mouseState, position, callback);
    }

    createSlider(position: Vector, range: Range, width: number, value: number): Slider {
        return new Slider(this.sliderImage, this.sliderHandleImage, this.mouse, this.mouseState, position, range, width, value);
    }
}
