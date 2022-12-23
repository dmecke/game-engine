import Font from '../Font/Font';
import TextAlign from '../Font/TextAlign';
import Vector from '../Math/Vector';

export default class Label {
    constructor(
        private readonly font: Font,
        private readonly text: string,
        private readonly position: Vector,
        private readonly align: TextAlign = TextAlign.left,
    ) {
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.font.at(this.position).align(this.align).text(this.text).draw(ctx);
    }
}
