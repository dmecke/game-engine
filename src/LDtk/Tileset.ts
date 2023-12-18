import {TilesetDefinition} from './quicktype';

export default class Tileset {
    private readonly enumTags = new Map<string, number[]>();
    private metadata = new Map<number, Record<string, unknown>>();

    constructor(
        private readonly tileset: TilesetDefinition,
    ) {
        this.tileset.enumTags.forEach(enumTag => this.enumTags.set(enumTag.enumValueId, enumTag.tileIds));
        this.tileset.customData.forEach(customData => {
            try {
                this.metadata.set(customData.tileId, JSON.parse(customData.data));
            } catch (e) {
                console.error(`Could not parse custom data:\n${customData.data}`);
                throw e;
            }
        });
    }

    get uid(): number {
        return this.tileset.uid;
    }

    getTagsFor(tileId: number): string[] {
        const tags: string[] = [];
        this.enumTags.forEach((tileIds, tag) => {
            if (tileIds.includes(tileId)) {
                tags.push(tag);
            }
        });

        return tags;
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
