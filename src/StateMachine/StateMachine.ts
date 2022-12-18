import State from './State';

export default class StateMachine<T> {
    private _previous: string;
    private _state: State<T>;

    constructor(
        private readonly entity: T,
        private readonly states = new Map<string, State<T>>(),
        startingStateName: string,
        data: unknown = null,
        private debug = false,
    ) {
        const state = this.states.get(startingStateName);
        if (!state) {
            throw new Error(`Invalid state "${startingStateName}".`);
        }
        this._state = state;
        this._previous = startingStateName;
        if (this._state.enter) {
            this._state.enter(this.entity, data);
        }
        this.log(`starting in state "${startingStateName}"`);
    }

    update(delta: number): void {
        if (this._state.update) {
            this._state.update(this.entity, delta);
        }
    }

    render(): void {
        if (this._state.render) {
            this._state.render(this.entity);
        }
    }

    changeTo(name: string, data: unknown = null): void {
        const state = this.states.get(name);
        if (!state) {
            throw new Error(`Invalid state "${name}".`);
        }

        if (this._state?.name === name) {
            return;
        }

        if (this._state.exit) {
            this._state.exit(this.entity);
        }

        this.log(`changing state from "${this._state.name}" to "${name}"`);
        this._previous = this._state.name;
        this._state = state;

        if (this._state.enter) {
            this._state.enter(this.entity, data);
        }
    }

    changeToPrevious(): void {
        this.changeTo(this._previous);
    }

    get state(): State<T> {
        return this._state;
    }

    private log(message: string): void {
        if (!this.debug) {
            return;
        }

        console.log(message);
    }
}
