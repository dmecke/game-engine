import Node from '../Node';

export default abstract class Composite<T> extends Node<T> {
    isLeaf = false;

    constructor(
        protected readonly compositeDescription: string,
        protected readonly children: Node<T>[],
    ) {
        super();
    }
}
