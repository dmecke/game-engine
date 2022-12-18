export default interface State<T> {
    name: string;

    enter?(entity: T, data: unknown): void;

    update?(entity: T, delta: number): void;

    render?(entity: T): void;

    exit?(entity: T): void;
}
