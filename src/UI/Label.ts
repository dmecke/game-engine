import Font from '../Font/Font';
import Vector from '../Math/Vector';

export default class Label {
    constructor(
        private readonly font: Font,
        private readonly text: string,
        private readonly position: Vector,
    ) {
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.font.at(this.position).alignCenter().text(this.text).draw(ctx);
    }
}
