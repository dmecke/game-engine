import FontFace from './FontFace';
import Glyph from './Glyph';
import ImageLoader from '../AssetLoader/ImageLoader';
import TextAlign from './TextAlign';
import Typist from './Typist';
import Vector from '../Math/Vector';

export default class Font {
    private position = Vector.null();
    private _align = TextAlign.left;
    private _width = new Map<string, number>();
    private _wrap: number|null = null;
    private _typist: Typist|null = null;
    private _text = '';

    private glyphs: Glyph[];

    constructor(
        private readonly fontFace: FontFace,
    ) {
        this.glyphs = fontFace.glyphs.flat();
    }

    at(position: Vector): this {
        this.position = position;

        return this;
    }

    wrap(width: number): this {
        this._wrap = width;
        return this;
    }

    typist(typist: Typist): this {
        this._typist = typist;
        return this;
    }

    align(alignment: TextAlign): this {
        this._align = alignment;

        return this;
    }

    alignLeft(): this {
        this._align = TextAlign.left;

        return this;
    }

    alignRight(): this {
        this._align = TextAlign.right;

        return this;
    }

    alignCenter(): this {
        this._align = TextAlign.center;

        return this;
    }

    text(text: string): this {
        this._text = text;

        return this;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        let position = new Vector(this.xStart, this.position.y);

        let lineWidth = 0;
        for (let i = 0; i < (this._typist ? this._typist.position : this._text.length); i++) {
            const glyph = this.getGlyph(this._text[i]);
            const isNewWordStart = i > 0 && this.getGlyph(this._text[i]).char !== ' ' && this.getGlyph(this._text[i - 1]).char === ' ';
            let upcomingWordWidth = 0;

            for (let j = 0; i + j < this._text.length && this._text[i + j] !== ' '; j++) {
                upcomingWordWidth += this.getGlyph(this._text[i + j]).width;
            }
            if (this._wrap !== null && isNewWordStart && lineWidth + upcomingWordWidth > this._wrap) {
                lineWidth = 0;
                position = new Vector(this.xStart, position.y + this.fontFace.height);
            } else {
                lineWidth += glyph.width + 1;
            }
            ImageLoader.instance.fromName(
                this.fontFace.image,
                this.getGlyphPosition(glyph),
                new Vector(glyph.width, this.fontFace.height),
                position,
            ).draw(ctx);
            position = position.addX(glyph.width + 1);
        }
    }

    private get xStart(): number {
        switch (this._align) {
            case TextAlign.left:
                return this.position.x;

            case TextAlign.right:
                if (this._wrap === null) {
                    return this.position.subtractX(this.width).x;
                } else {
                    return Math.min(this.position.subtractX(this.width).x, this._wrap);
                }

            case TextAlign.center:
                if (this._wrap === null) {
                    return this.position.subtractX(Math.floor(this.width / 2)).x;
                } else {
                    return Math.min(this.position.subtractX(Math.floor(this.width / 2)).x, this._wrap);
                }
        }

        throw new Error(`Invalid text align: "${this._align}".`);
    }

    private getGlyph(char: string): Glyph {
        if (char.length !== 1) {
            throw new Error('Can only get a glyph for a single char.');
        }

        if (this.glyphs.filter(glyph => glyph.char === char).length === 0) {
            throw new Error(`Char "${char}" does not exist in font face "${this.fontFace.constructor.name}".`);
        }

        return this.glyphs.filter(glyph => glyph.char === char)[0];
    }

    getGlyphPosition(glyph: Glyph): Vector {
        for (let i = 0; i < this.fontFace.glyphs.length; i++) {
            const glyphs = this.fontFace.glyphs[i];
            if (glyphs.includes(glyph)) {
                let x = 0;
                for (const g of glyphs) {
                    if (g.char === glyph.char) {
                        return new Vector(x, this.fontFace.height * i);
                    }
                    x += g.width + 1;
                }
            }
        }

        throw new Error(`Could not find glyph position of "${glyph.char}" in font face "${this.fontFace.constructor.name}".`);
    }

    private get width(): number {
        if (!this._width.has(this._text)) {
            let width = 0;
            for (let i = 0; i < this._text.length; i++) {
                width += this.getGlyph(this._text[i]).width;
                if (i < this._text.length - 1) {
                    width++;
                }
            }
            this._width.set(this._text, width);
        }

        return this._width?.get(this._text) ?? 0;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.fontFace.height;
    }
}
