import Decorator from '../Decorator';
import Status from '../../Status';
import Tick from '../../Tick';

export default class Succeeder<T> extends Decorator<T> {
    description = 'I am successful no matter what.';

    tick(tick: Tick<T>): Status {
        this.child.execute(tick);

        return Status.success;
    }
}
