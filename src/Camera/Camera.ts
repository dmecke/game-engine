import Area from '../Math/Area';
import ScreenShake from './ScreenShake';
import Vector from '../Math/Vector';
import clamp from '../Math/clamp';

export default class Camera {
    target: { position: Vector }|null = null;
    position = Vector.null();
    screenShake = new ScreenShake(Vector.null(), 0);

    constructor(
        private readonly sizeConstraint: Vector, // size of the map
        private readonly size: Vector, // size of the camera viewport
    ) {
    }
    
    update(): void {
        if (this.target === null) {
            return;
        }
        
        const viewport = window.canvas.viewport;
        this.position = new Vector(
            clamp(this.target.position.x - viewport.center.x, 0, Math.max(0, this.sizeConstraint.x - viewport.size.x)),
            clamp(this.target.position.y - viewport.center.y, 0, Math.max(0, this.sizeConstraint.y - viewport.size.y)),
        ).add(this.screenShake.offset);
    }

    get visibleArea(): Area {
        return new Area(this.position, this.size);
    }
}
