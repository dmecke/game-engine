import PressedState from './PressedState';

export default class DeviceState {
    private state = new Map<string, PressedState>();

    activate(code: string): void {
        if (!this.state.has(code)) {
            this.state.set(code, new PressedState());
        }

        this.state.get(code)?.activate();
    }

    reset(code: string): void {
        if (!this.state.has(code)) {
            this.state.set(code, new PressedState());
        }

        this.state.get(code)?.reset();
    }

    update(): void {
        this.state.forEach(state => state.update());
    }

    get(code: string): PressedState {
        return this.state.get(code) ?? new PressedState();
    }
}
