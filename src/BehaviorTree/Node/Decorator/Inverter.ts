import Decorator from '../Decorator';
import Status from '../../Status';
import Tick from '../../Tick';

export default class Inverter<T> extends Decorator<T> {
    description = 'I try to fail at the following thing.';

    tick(tick: Tick<T>): Status {
        const status = this.child.execute(tick);

        if (status === Status.success) {
            return Status.failure;
        }

        if (status === Status.failure) {
            return Status.success;
        }

        return status;
    }
}
