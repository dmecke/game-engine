import Composite from '../Composite';
import Node from '../../Node';
import Status from '../../Status';
import Tick from '../../Tick';

export default class RandomSelector<T> extends Composite<T> {
    private runningChild = 0;
    private readonly shuffledChildren: Node<T>[];

    constructor(
        compositeDescription: string,
        children: Node<T>[],
    ) {
        super(compositeDescription, children);
        this.shuffledChildren = children.slice(0).sort(() => 0.5 - Math.random());
    }

    override open(): void {
        this.runningChild = 0;
    }

    tick(tick: Tick<T>): Status {
        for (let i = this.runningChild; i < this.shuffledChildren.length; i++) {
            const child = this.shuffledChildren[i];
            const status = child.execute(tick);

            if (status === Status.running) {
                this.runningChild = i;
            }

            if (status !== Status.failure) {
                return status;
            }
        }

        return Status.failure;
    }

    get description(): string {
        return `Select a random one to "${this.compositeDescription}".`;
    }
}
