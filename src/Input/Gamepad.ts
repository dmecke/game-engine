import Listener from './Listener';
import Rumble from './Rumble';
import Vector from '../Math/Vector';

declare global {
    interface Gamepad {
        readonly vibrationActuator: GamepadHapticActuator;
    }

    interface GamepadHapticActuator {
        playEffect(type: string, params: {
            duration: number,
            startDelay: number,
            strongMagnitude: number,
            weakMagnitude: number,
        }): void;
    }
}

export default class Gamepad {
    private readonly interval: number;

    private pressedKeys = new Set<string>();
    private analog: Vector[] = [];

    private pressedListeners: Listener[] = [];
    private downListeners: Listener[] = [];
    private releasedListeners: Listener[] = [];

    private anyPressedCallbacks: ((code: string) => void)[] = [];
    private anyDownCallbacks: ((code: string) => void)[] = [];
    private anyReleasedCallbacks: ((code: string) => void)[] = [];

    constructor(
        private readonly index: number,
    ) {
        this.interval = window.setInterval(() => this.update(), 100);
    }

    onPressed(code: string, callback: () => void): void {
        this.pressedListeners.push(new Listener(code, callback));
    }

    onDown(code: string, callback: () => void): void {
        this.downListeners.push(new Listener(code, callback));
    }

    onReleased(code: string, callback: () => void): void {
        this.releasedListeners.push(new Listener(code, callback));
    }

    onPressedAny(callback: (index: string) => void): void {
        this.anyPressedCallbacks.push(callback);
    }

    onDownAny(callback: (index: string) => void): void {
        this.anyDownCallbacks.push(callback);
    }

    onReleasedAny(callback: (index: string) => void): void {
        this.anyReleasedCallbacks.push(callback);
    }

    getAnalog(index: number): Vector {
        if (!this.analog[index]) {
            return Vector.null();
        }

        return this.analog[index];
    }

    rumble(left: Rumble, right: Rumble): void {
        const nativeGamepad = navigator.getGamepads()[this.index];
        if (!nativeGamepad) {
            throw new Error(`Could not find gamepad with index ${this.index}.`);
        }

        if (!nativeGamepad.vibrationActuator) {
            return;
        }

        // individual channels for left and right is not yet supported by browsers, so take the higher values for strength and duration
        nativeGamepad.vibrationActuator.playEffect('dual-rumble', {
            startDelay: 0,
            duration: Math.max(left.duration, right.duration),
            weakMagnitude: Math.max(left.strength, right.strength),
            strongMagnitude: Math.max(left.strength, right.strength),
        });
    }

    disconnect(): void {
        this.pressedListeners = [];
        this.downListeners = [];
        this.releasedListeners = [];
        this.anyPressedCallbacks = [];
        this.anyDownCallbacks = [];
        this.anyReleasedCallbacks = [];
        window.clearInterval(this.interval);
    }

    private update(): void {
        const nativeGamepad = navigator.getGamepads()[this.index];
        if (!nativeGamepad) {
            throw new Error(`Could not find gamepad with index ${this.index}.`);
        }
        nativeGamepad.buttons.forEach((button, index) => this.handleButton(button, index.toString()));
        nativeGamepad.axes.forEach((axis, index) => this.handleAxis(axis, index));
    }

    private handleButton(button: GamepadButton, index: string) {
        if (button.pressed) {
            if (!this.pressedKeys.has(index)) {
                this.pressedListeners.forEach(listener => listener.handle(index));
                this.anyPressedCallbacks.forEach(callback => callback(index));
            }
            this.downListeners.forEach(listener => listener.handle(index));
            this.anyDownCallbacks.forEach(callback => callback(index));
            this.pressedKeys.add(index);
        } else {
            if (this.pressedKeys.has(index)) {
                this.releasedListeners.forEach(listener => listener.handle(index));
                this.anyReleasedCallbacks.forEach(callback => callback(index));
            }
            this.pressedKeys.delete(index);
        }
    }

    private handleAxis(axis: number, index: number): void {
        const analogIndex = Math.floor(index / 2);
        if (!this.analog[analogIndex]) {
            this.analog[analogIndex] = Vector.null();
        }

        this.analog[analogIndex] = new Vector(
            index % 2 === 0 ? axis : this.analog[analogIndex].x,
            index % 2 === 1 ? axis : this.analog[analogIndex].y,
        );
    }
}
