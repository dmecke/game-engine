import Decorator from '../Decorator';
import Status from '../../Status';
import Tick from '../../Tick';

export default class Repeater<T> extends Decorator<T> {
    description = 'I do following thing until it fails.';

    tick(tick: Tick<T>): Status {
        const status = this.child.execute(tick);

        if (status === Status.failure) {
            return Status.success;
        }

        return Status.running;
    }
}
