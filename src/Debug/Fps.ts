export default class Fps {
    private readonly times: number[] = [];

    tick(): void {
        const now = performance.now();
        while (this.times.length > 0 && this.times[0] <= now - 1000) {
            this.times.shift();
        }
        this.times.push(now);
    }

    get fps(): number {
        return this.times.length;
    }
}
