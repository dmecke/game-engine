import Decorator from '../Decorator';
import Node from '../../Node';
import Status from '../../Status';
import Tick from '../../Tick';

export default class Repeater<T> extends Decorator<T> {
    description = 'I do following thing x times.';
    private iteration = 0;

    constructor(
        child: Node<T>,
        private readonly iterations: number,
    ) {
        super(child);
    }

    tick(tick: Tick<T>): Status {
        const status = this.child.execute(tick);

        if (status === Status.running) {
            return Status.running;
        }

        this.iteration++;
        if (this.iteration >= this.iterations) {
            return Status.success;
        }

        return Status.running;
    }
}
