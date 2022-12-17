import Area from '../Math/Area';
import Entity from './Entity';
import {LayerInstance} from './quicktype';
import Tile from './Tile';
import Tileset from './Tileset';
import Vector from '../Math/Vector';

export default class Layer {
    readonly tiles: Map<string, Tile> = new Map();

    constructor(
        private readonly layer: LayerInstance,
        readonly tileset: Tileset|null,
    ) {
        const tiles = this.layer.autoLayerTiles.concat(this.layer.gridTiles);
        tiles.forEach(tile => {
            const position = new Vector(tile.px[0] / this.layer.__gridSize, tile.px[1] / this.layer.__gridSize);
            const offset = new Vector(tile.src[0] / this.layer.__gridSize, tile.src[1] / this.layer.__gridSize);
            const metadata = tileset?.getMetadataFor(tile.t) ?? {};
            this.tiles.set(position.toString(), new Tile(offset.x + offset.y * this.layer.__cWid, position, offset, metadata));
        });
    }

    get id(): string {
        return this.layer.iid;
    }

    get name(): string {
        return this.layer.__identifier;
    }

    get size(): Vector {
        return new Vector(this.layer.__cWid, this.layer.__cHei);
    }

    get gridSize(): number {
        return this.layer.__gridSize;
    }

    get positions(): Vector[] {
        const positions = [];
        for (let y = 0; y < this.size.y; y++) {
            for (let x = 0; x < this.size.x; x++) {
                positions.push(new Vector(x, y));
            }
        }

        return positions;
    }

    get visible(): boolean {
        return this.layer.visible;
    }

    get entities(): Entity[] {
        return this.layer.entityInstances.map(entity => {
            const properties: Record<string, unknown> = {};
            for (const fieldInstance of entity.fieldInstances) {
                properties[fieldInstance.__identifier] = fieldInstance.__value;
            }

            return new Entity(
                entity.iid,
                entity.__identifier,
                new Vector(entity.px[0], entity.px[1]),
                new Vector(entity.__pivot[0] * entity.width, entity.__pivot[1] * entity.height),
                entity.__tile ? new Area(new Vector(entity.__tile.x, entity.__tile.y), new Vector(entity.__tile.w, entity.__tile.h)) : null,
                properties
            );
        });
    }

    getTileAt(position: Vector): Tile|null {
        return this.tiles.get(position.toString()) ?? null;
    }

    getIntAt(position: Vector): number {
        return this.layer.intGridCsv[position.x + position.y * this.layer.__cWid] ?? 0;
    }

    getEntities(name: string): Entity[] {
        return this
            .entities
            .filter(entity => entity.name === name)
        ;
    }
}
