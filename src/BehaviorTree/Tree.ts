import Blackboard from './Blackboard';
import Node from './Node';
import Status from './Status';
import Tick from './Tick';

export default class Tree<T> {
    constructor(
        readonly name: string,
        private root: Node<T>,
    ) {
    }

    tick(
        owner: T,
        blackboard: Blackboard,
        debug = false,
        depth = 0,
        asSubtree = false,
    ): Status {
        const tick = new Tick<T>(owner, blackboard, depth, debug);
        if (debug && !asSubtree) {
            console.group(this.name);
        }

        const status = this.root.execute(tick);

        if (debug && !asSubtree) {
            console.groupEnd();
        }

        return status;
    }
}
