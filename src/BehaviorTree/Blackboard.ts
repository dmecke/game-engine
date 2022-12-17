export default class Blackboard {
    private data = new Map<string, unknown>();

    set(key: string, value: unknown): void {
        this.data.set(key, value);
    }

    get(key: string): unknown {
        return this.data.get(key);
    }
}
