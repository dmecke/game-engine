import NineSliceMargin from './NineSliceMargin';
import Vector from '../Math/Vector';

export default class NineSlice {
    constructor(
        private readonly image: HTMLImageElement,
        private readonly margin: NineSliceMargin,
        private readonly position: Vector,
        private readonly size: Vector,
    ) {
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.drawCorners(ctx);
        this.drawEdges(ctx);
        this.drawMiddle(ctx);
    }

    private get left(): number {
        return this.margin.left;
    }

    private get right(): number {
        return this.margin.right;
    }

    private get top(): number {
        return this.margin.top;
    }

    private get bottom(): number {
        return this.margin.bottom;
    }

    private drawCorners(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, 0, 0, this.left, this.top, this.position.x, this.position.y, this.left, this.top); // top left
        ctx.drawImage(this.image, this.image.width - this.right, 0, this.right, this.top, this.position.x + this.size.x - this.right, this.position.y, this.right, this.top); // top right
        ctx.drawImage(this.image, 0, this.image.height - this.bottom, this.left, this.bottom, this.position.x, this.position.y + this.size.y - this.bottom, this.left, this.bottom); // bottom left
        ctx.drawImage(this.image, this.image.width - this.right, this.image.height - this.bottom, this.right, this.bottom, this.position.x + this.size.x - this.right, this.position.y + this.size.y - this.bottom, this.right, this.bottom); // bottom right
    }

    private drawEdges(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.left, 0, this.image.width - this.left - this.right, this.top, this.position.x + this.left, this.position.y, this.size.x - this.left - this.right, this.top); // top
        ctx.drawImage(this.image, this.left, this.image.height - this.bottom, this.image.width - this.left - this.right, this.bottom, this.position.x + this.left, this.position.y + this.size.y - this.bottom, this.size.x - this.left - this.right, this.bottom); // bottom
        ctx.drawImage(this.image, 0, this.top, this.left, this.image.height - this.top - this.bottom, this.position.x, this.position.y + this.top, this.left, this.size.y - this.top - this.bottom); // left
        ctx.drawImage(this.image, this.image.width - this.right, this.top, this.right, this.image.height - this.top - this.bottom, this.position.x + this.size.x - this.right, this.position.y + this.top, this.right, this.size.y - this.top - this.bottom); // right
    }

    private drawMiddle(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(
            this.image,
            this.left,
            this.top,
            this.image.width - this.left - this.right,
            this.image.height - this.top - this.bottom,
            this.position.x + this.left,
            this.position.y + this.top,
            this.size.x - this.left - this.right,
            this.size.y - this.top - this.bottom,
        );
    }
}
