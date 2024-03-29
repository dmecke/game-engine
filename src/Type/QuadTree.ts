import Area from '../Math/Area';
import Circle from '../Math/Circle';
import Vector from '../Math/Vector';

export default class QuadTree<T> {
    private elements: ({ position: Vector, data: T })[] = [];
    private northWest: QuadTree<T>|null = null;
    private northEast: QuadTree<T>|null = null;
    private southEast: QuadTree<T>|null = null;
    private southWest: QuadTree<T>|null = null;

    constructor(
        private readonly area: Area,
        private readonly maxElements: number,
        private readonly depth = 1,
    ) {
    }

    insert(element: { position: Vector, data: T }): void {
        if (!this.area.contains(element.position)) {
            return;
        }

        if (!this.divided) {
            this.elements.push(element);
            if (this.elements.length > this.maxElements) {
                this.subdivide();
                this.northWest?.insert(element);
                this.northEast?.insert(element);
                this.southEast?.insert(element);
                this.southWest?.insert(element);
            }
        } else {
            this.northWest?.insert(element);
            this.northEast?.insert(element);
            this.southEast?.insert(element);
            this.southWest?.insert(element);
        }
    }

    queryPosition(position: Vector): ({ position: Vector, data: T })[] {
        if (!this.area.contains(position)) {
            return [];
        }

        let elements: ({ position: Vector, data: T })[] = [];
        this
            .elements
            .filter(element => position.equals(element.position))
            .forEach(element => elements.push(element))
        ;
        if (this.divided) {
            elements = elements.concat(this.northWest?.queryPosition(position) ?? []);
            elements = elements.concat(this.northEast?.queryPosition(position) ?? []);
            elements = elements.concat(this.southEast?.queryPosition(position) ?? []);
            elements = elements.concat(this.southWest?.queryPosition(position) ?? []);
        }

        return elements;
    }

    queryArea(area: Area): ({ position: Vector, data: T })[] {
        if (!this.area.overlaps(area)) {
            return [];
        }

        let elements: ({ position: Vector, data: T })[] = [];
        this
            .elements
            .filter(element => area.contains(element.position))
            .forEach(element => elements.push(element))
        ;
        if (this.divided) {
            elements = elements.concat(this.northWest?.queryArea(area) ?? []);
            elements = elements.concat(this.northEast?.queryArea(area) ?? []);
            elements = elements.concat(this.southEast?.queryArea(area) ?? []);
            elements = elements.concat(this.southWest?.queryArea(area) ?? []);
        }

        return elements;
    }

    queryCircle(circle: Circle): ({ position: Vector, data: T })[] {
        return this.queryArea(new Area(circle.position.subtract(new Vector(circle.radius, circle.radius)), new Vector(circle.diameter, circle.diameter)));
    }

    clear(): void {
        this.elements = [];
        if (this.divided) {
            this.northWest?.clear();
            this.northEast?.clear();
            this.southEast?.clear();
            this.southWest?.clear();
            this.northWest = null;
            this.northEast = null;
            this.southEast = null;
            this.southWest = null;
        }
    }

    get numberOfElements(): number {
        let elements = 0;
        elements += this.elements.length;
        if (this.divided) {
            elements += this.northWest?.numberOfElements ?? 0;
            elements += this.northEast?.numberOfElements ?? 0;
            elements += this.southEast?.numberOfElements ?? 0;
            elements += this.southWest?.numberOfElements ?? 0;
        }

        return elements;
    }

    private subdivide(): void {
        this.northWest = new QuadTree(new Area(new Vector(this.area.left, this.area.top), this.area.size.divide(2)), this.maxElements, this.depth + 1);
        this.northEast = new QuadTree(new Area(new Vector(this.area.center.x, this.area.top), this.area.size.divide(2)), this.maxElements, this.depth + 1);
        this.southEast = new QuadTree(new Area(this.area.center, this.area.size.divide(2)), this.maxElements, this.depth + 1);
        this.southWest = new QuadTree(new Area(new Vector(this.area.left, this.area.center.y), this.area.size.divide(2)), this.maxElements, this.depth + 1);
        this.elements.forEach(element => {
            this.northWest?.insert(element);
            this.northEast?.insert(element);
            this.southEast?.insert(element);
            this.southWest?.insert(element);
        });
        this.elements = [];
    }

    private get divided(): boolean {
        return this.northEast !== null;
    }
}
