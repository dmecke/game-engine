import Area from '../Math/Area';
import ScreenShake from './ScreenShake';
import Vector from '../Math/Vector';
import clamp from '../Math/clamp';

export default class Camera {
    target: { position: Vector, id?: string }|null = null;
    position = Vector.null();
    screenShake = new ScreenShake(Vector.null(), 0);

    constructor(
        private readonly sizeConstraint: Vector, // size of the map
        private readonly viewport: Area,
        private readonly unit = 1, // the camera will snap to a multiple of this value
    ) {
    }
    
    update(): void {
        if (this.target === null) {
            return;
        }

        const center = this.viewport.center.divide(this.unit).floor().multiply(this.unit);
        this.position = new Vector(
            clamp(this.target.position.x - center.x, 0, Math.max(0, this.sizeConstraint.x - this.viewport.size.x)),
            clamp(this.target.position.y - center.y, 0, Math.max(0, this.sizeConstraint.y - this.viewport.size.y)),
        ).add(this.screenShake.offset);
    }

    get visibleArea(): Area {
        return new Area(this.position, this.viewport.size);
    }
}
