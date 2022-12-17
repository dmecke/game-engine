import Entity from './Entity';
import Layer from './Layer';
import Tileset from './Tileset';
import Vector from '../Math/Vector';
import {Level as qtLevel} from './quicktype';

export default class Level {
    readonly layers: Layer[];

    constructor(
        private readonly level: qtLevel,
        private readonly tilesets: Tileset[],
    ) {
        this.layers = this.level.layerInstances?.map(layer => {
            const tilesets = this.tilesets.filter(tileset => layer.__tilesetDefUid === tileset.uid);
            const tileset = tilesets.length === 0 ? null : tilesets[0];
            return new Layer(layer, tileset);
        }).reverse() ?? [];
    }

    get name(): string {
        return this.level.identifier;
    }

    get size(): Vector {
        return new Vector(this.level.pxWid, this.level.pxHei);
    }

    get entities(): Entity[] {
        let entities: Entity[] = [];

        this.layers.forEach(layer => entities = entities.concat(layer.entities));

        return entities;
    }

    get collisionLayer(): Layer {
        const layers = this.layers.filter(layer => layer.name === 'collision');
        if (layers.length === 0) {
            throw new Error('Could not find collision layer.');
        }

        return layers[0];
    }

    get groundLayer(): Layer {
        const layers = this.layers.filter(layer => layer.name === 'ground');
        if (layers.length === 0) {
            throw new Error('Could not find ground layer.');
        }

        return layers[0];
    }
}
