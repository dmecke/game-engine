import Node from '../Node';

export default abstract class Leaf<T> extends Node<T> {
    isLeaf = true;
}
