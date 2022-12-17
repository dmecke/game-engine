import {Convert, Coordinate} from './quicktype';
import Area from '../Math/Area';
import Level from './Level';
import Tileset from './Tileset';
import Vector from '../Math/Vector';

export default class World {
    private readonly world: Coordinate;

    constructor(world: string) {
        this.world = Convert.toCoordinate(world);
    }

    getLevel(name: string): Level {
        return new Level(this.world.levels.filter(level => level.identifier === name)[0], this.tilesets);
    }

    hasLevel(name: string): boolean {
        return this.world.levels.filter(level => level.identifier === name).length > 0;
    }

    getLevelAt(worldPosition: Vector): Level {
        return new Level(this.world.levels.filter(level => new Area(new Vector(level.worldX, level.worldY), new Vector(level.pxWid, level.pxHei)).contains(worldPosition))[0], this.tilesets);
    }

    getLevelsWithEntity(name: string): Level[] {
        return this
            .world
            .levels
            .map(level => new Level(level, this.tilesets))
            .filter(level => level.layers.filter(layer => layer.getEntities(name).length > 0).length > 0)
        ;
    }

    private get tilesets(): Tileset[] {
        return this.world.defs.tilesets.map(tileset => new Tileset(tileset));
    }
}
