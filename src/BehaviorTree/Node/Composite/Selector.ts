import Composite from '../Composite';
import Status from '../../Status';
import Tick from '../../Tick';

export default class Selector<T> extends Composite<T> {
    private runningChild = 0;

    override open(): void {
        this.runningChild = 0;
    }

    tick(tick: Tick<T>): Status {
        for (let i = this.runningChild; i < this.children.length; i++) {
            const child = this.children[i];
            const status = child.execute(tick);

            if (status === Status.running) {
                this.runningChild = i;
            }

            if (status !== Status.failure) {
                return status;
            }
        }

        return Status.failure;
    }

    get description(): string {
        return `Select best to "${this.compositeDescription}".`;
    }
}
