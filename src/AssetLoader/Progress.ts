export default class Progress {
    loaded = 0;

    constructor(
        readonly total: number,
    ) {
    }

    increment(): void {
        this.loaded++;
    }

    isDone(): boolean {
        return this.loaded >= this.total;
    }

    get percent(): number {
        if (this.total === 0) {
            return 100;
        }

        return this.loaded / this.total * 100;
    }
}
