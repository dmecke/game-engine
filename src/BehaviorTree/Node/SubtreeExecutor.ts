import Node from '../Node';
import Status from '../Status';
import Tick from '../Tick';
import Tree from '../Tree';

export default class SubtreeExecutor<T> extends Node<T> {
    isLeaf = false;

    constructor(
        private readonly tree: Tree<T>,
    ) {
        super();
    }

    protected tick(tick: Tick<T>): Status {
        return this.tree.tick(tick.owner, tick.blackboard, tick.debug, tick.depth, true);
    }

    get description(): string {
        return `I follow the subtree "${this.tree.name}".`;
    }
}
