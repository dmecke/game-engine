import {TilesetDefinition} from './quicktype';

export default class Tileset {
    private metadata = new Map<number, Record<string, unknown>>();

    constructor(
        private readonly tileset: TilesetDefinition,
    ) {
        this.tileset.customData.forEach(customData => {
            try {
                const metadata = this.metadata.get(customData.tileId) ?? {};
                metadata['customData'] = JSON.parse(customData.data);
                this.metadata.set(customData.tileId, metadata);
            } catch (e) {
                console.error(`Could not parse custom data:\n${customData.data}`);
                throw e;
            }
        });
    }

    get uid(): number {
        return this.tileset.uid;
    }

    getMetadataFor(tileId: number): Record<string, unknown> {
        if (!this.metadata.has(tileId)) {
            return {};
        }

        return this.metadata.get(tileId) as Record<string, unknown>;
    }

    get name(): string {
        return this.tileset.identifier;
    }

    get path(): string {
        return this.tileset.relPath ?? '';
    }
}
