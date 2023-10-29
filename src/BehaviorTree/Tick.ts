import Blackboard from './Blackboard';
import Node from './Node';
import Status from './Status';

export default class Tick<T> {
    constructor(
        readonly owner: T,
        readonly blackboard: Blackboard,
        private _depth: number,
        readonly debug: boolean,
    ) {
    }

    get depth(): number {
        return this._depth;
    }

    enter(): void {
        this._depth++;
    }

    beforeTick(node: Node<T>): void {
        if (this.debug) {
            if (!node.isLeaf) {
                console.group(`${node.description}`);
            }
        }
    }

    afterTick(node: Node<T>, status: Status) {
        if (this.debug) {
            if (node.isLeaf) {
                console.log(`%c${this.getName(status)} ${node.description}`, `color: ${this.getColor(status)}`);
            } else {
                console.groupEnd();
            }
        }
    }

    exit(): void {
        this._depth--;
    }

    private getColor(status: Status): string {
        switch (status) {
            case Status.success:
                return '#44a421';

            case Status.failure:
                return '#ff560d';

            case Status.running:
                return '#3d8ddc';

            default:
                throw new Error(`Invalid status "${status}".`);
        }
    }

    private getName(status: Status): string {
        switch (status) {
            case Status.success:
                return 'SUCCESS';

            case Status.failure:
                return 'FAILURE';

            case Status.running:
                return 'RUNNING';

            default:
                throw new Error(`Invalid status "${status}".`);
        }
    }
}
