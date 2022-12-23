import Vector from '../Math/Vector';
import Viewport from './Viewport';

export default class Canvas {
    readonly canvas: HTMLCanvasElement;

    constructor(
        id: string,
        private readonly nativeResolution: Vector,
        private maxScale: number,
    ) {
        const canvas = document.getElementById(id) as HTMLCanvasElement|null;
        if (canvas === null) {
            throw new Error(`Could not find a canvas with id ${id}.`);
        }
        this.canvas = canvas;

        window.addEventListener('resize', () => this.resize());
        this.resize();
    }

    resize(): void {
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
    }

    get viewport(): Viewport {
        return new Viewport(this.nativeResolution);
    }

    private get size(): Vector {
        for (let scale = this.maxScale; scale >= 1; scale--) {
            if (window.innerWidth >= this.nativeResolution.multiply(scale).x) {
                return this.nativeResolution.multiply(scale);
            }
        }

        return this.nativeResolution;
    }

    private get width(): number {
        return this.size.x;
    }

    private get height(): number {
        return this.size.y;
    }
}
