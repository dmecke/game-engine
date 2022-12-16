export default class Listener {
    constructor(
        private readonly code: string,
        private readonly callback: () => void,
    ) {
    }

    handle(code: string): void {
        if (code !== this.code) {
            return;
        }

        this.callback();
    }
}
