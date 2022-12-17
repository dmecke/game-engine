import Node from '../Node';

export default abstract class Decorator<T> extends Node<T> {
    isLeaf = false;

    constructor(
        protected child: Node<T>,
    ) {
        super();
    }
}
