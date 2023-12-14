import Vector from './Vector';

/**
 * Create a line between two points using Bresenham's line algorithm.
 * Can be used for line of sight calculations, lighting, etc.
 */
export default function (point1: Vector, point2: Vector): Vector[] {
    const result: Vector[] = [];

    const d = point2.subtract(point1);
    const ad = new Vector(Math.abs(d.x), Math.abs(d.y));
    const s = new Vector(point1.x < point2.x ? 1 : -1, point1.y < point2.y ? 1 : -1);
    let eps = 0;

    if (ad.x > ad.y) {
        for (let x = point1.x, y = point1.y; s.x < 0 ? x >= point2.x : x <= point2.x; x += s.x) {
            result.push(new Vector(x, y));
            eps += ad.y;
            if ((eps << 1) >= ad.x) {
                y += s.y;
                eps -= ad.x;
            }
        }
    } else {
        for (let x = point1.x, y = point1.y; s.y < 0 ? y >= point2.y : y <= point2.y; y += s.y) {
            result.push(new Vector(x, y));
            eps += ad.x;
            if ((eps << 1) >= ad.y) {
                x += s.x;
                eps -= ad.y;
            }
        }
    }

    return result;
}
