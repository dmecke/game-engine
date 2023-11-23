import Glyph from './Glyph';

export default interface FontFace {
    readonly name: string;
    readonly glyphs: Glyph[][];
    readonly height: number;
}
