import Layer from './Layer';
import Tile from './Tile';
import TileAnimation from './TileAnimation';
import Vector from '../Math/Vector';

export default class TileAnimationMap {
    private readonly animations: Map<string, string> = new Map();
    private readonly tileAnimations: Map<string, TileAnimation> = new Map();

    constructor(
        private readonly definitions: Map<string, unknown>,
    ) {
    }

    load(layer: Layer): void {
        for (const tile of layer.tiles.values()) {
            this.loadForTile(tile);
        }
    }

    get all(): TileAnimation[] {
        return [...this.animations.values()].map(animation => this.getAnimationByName(animation));
    }

    at(position: Vector): TileAnimation|null {
        const animation = this.animations.get(`${position.x}|${position.y}`);
        if (!animation) {
            return null;
        }

        return this.getAnimationByName(animation);
    }

    private loadForTile(tile: Tile): void {
        const tags = tile?.tags ?? [];
        const animations = tags.filter(tag => tag.startsWith('animation_')).map(tag => tag.replace('animation_', ''));
        const animation = animations.length > 0 ? animations[0] : null;
        if (animation) {
            this.animations.set(`${tile.position.x}|${tile.position.y}`, animation);
        }
    }

    private getAnimationByName(name: string): TileAnimation {
        let tileAnimation = this.tileAnimations.get(name);
        if (!tileAnimation) {
            const definition = this.definitions.get(name) as { name: string, frames: number, frameDuration: number, offset: { x: number, y: number } }|undefined;
            if (!definition) {
                throw new Error(`Unknown animation: "${name}".`);
            }

            tileAnimation = new TileAnimation(definition.frames, definition.frameDuration, new Vector(definition.offset.x, definition.offset.y));
            this.tileAnimations.set(name, tileAnimation);
        }

        return tileAnimation;
    }
}
