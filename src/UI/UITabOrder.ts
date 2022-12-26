import PressedState from '../Input/PressedState';

export default class UITabOrder {
    private nodes: { selected: boolean, trigger: () => void }[] = [];
    private index = 0;

    add(node: { selected: boolean, trigger: () => void }): void {
        this.nodes.push(node);
    }

    update(next: PressedState, previous: PressedState, trigger: PressedState): void {
        if (next.once) {
            this.index++;
        }
        if (previous.once) {
            this.index--;
        }

        if (this.index < 0) {
            this.index = this.nodes.length - 1;
        }
        if (this.index > this.nodes.length - 1) {
            this.index = 0;
        }

        this.nodes.forEach((node, index) => node.selected = this.index === index);

        if (trigger.once) {
            this.nodes[this.index].trigger();
        }
    }
}
