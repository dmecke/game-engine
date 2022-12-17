import Status from './Status';
import Tick from './Tick';

export default abstract class Node<T> {
    abstract description: string;
    private isOpen = false;
    abstract isLeaf: boolean;

    execute(tick: Tick<T>): Status {
        tick.enter();
        if (this.enter) {
            this.enter();
        }

        if (!this.isOpen) {
            this.isOpen = true;
            if (this.open) {
                this.open(tick);
            }
        }

        tick.beforeTick(this);
        const status = this.tick(tick);
        tick.afterTick(this, status);

        if (status !== Status.running) {
            this.isOpen = false;
            if (this.close) {
                this.close();
            }
        }

        tick.exit();
        if (this.exit) {
            this.exit();
        }

        return status;
    }

    protected enter?(): void;

    protected open?(tick: Tick<T>): void;

    protected abstract tick(tick: Tick<T>): Status;

    protected close?(): void;

    protected exit?(): void;
}
