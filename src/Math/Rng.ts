// eslint-disable-next-line @typescript-eslint/no-var-requires
const seedrandom = require('seedrandom');

export default class Rng {
    static readonly instance = new Rng();

    private readonly rng: CallableFunction;

    private constructor() {
        this.rng = seedrandom(Math.random().toString());
    }

    randomInt(max: number): number {
        return Math.floor(this.rng() * max);
    }

    randomFloat(max: number): number {
        return this.rng() * max;
    }

    randomIntBetween(min: number, max: number): number {
        return Math.floor(this.rng() * (max - min + 1)) + min;
    }

    randomFloatBetween(min: number, max: number): number {
        return this.rng() * (max - min) + min;
    }

    chance(amount: number): boolean {
        return amount > this.randomFloat(100);
    }

    choose<T>(array: T[]): T {
        return array[this.randomInt(array.length)];
    }

    chooseMultiple<T>(array: T[], amount: number): T[] {
        const result: T[] = new Array(amount);
        let length = array.length;
        const taken = new Array(length);

        while (amount--) {
            const x = this.randomInt(length);
            result[amount] = array[x in taken ? taken[x] : x];
            taken[x] = --length in taken ? taken[length] : length;
        }

        return result;
    }
}
