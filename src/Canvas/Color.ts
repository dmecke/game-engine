export default class Color {
    private constructor(
        private readonly red: number,
        private readonly green: number,
        private readonly blue: number,
    ) {
    }

    static fromInts(red: number, green: number, blue: number): Color {
        return new Color(Math.round(red), Math.round(green), Math.round(blue));
    }

    static get black(): Color {
        return new Color(0, 0, 0);
    }

    static get white(): Color {
        return new Color(255, 255, 255);
    }

    static get red(): Color {
        return new Color(255, 0, 0);
    }

    static get green(): Color {
        return new Color(0, 255, 0);
    }

    static get blue(): Color {
        return new Color(0, 0, 255);
    }

    static get yellow(): Color {
        return new Color(255, 255, 0);
    }

    static get magenta(): Color {
        return new Color(255, 0, 255);
    }

    static get cyan(): Color {
        return new Color(0, 255, 255);
    }

    static get olive(): Color {
        return new Color(128, 128, 0);
    }

    static get purple(): Color {
        return new Color(128, 0, 128);
    }

    static get teal(): Color {
        return new Color(0, 128, 128);
    }

    merge(other: Color, ratio: number): Color {
        return Color.fromInts(
            this.red * (1 - ratio) + other.red * ratio,
            this.green * (1 - ratio) + other.green * ratio,
            this.blue * (1 - ratio) + other.blue * ratio,
        );
    }

    equals(other: Color): boolean {
        return this.toString() === other.toString();
    }

    toString(): string {
        const red = this.red.toString(16).padStart(2, '0');
        const green = this.green.toString(16).padStart(2, '0');
        const blue = this.blue.toString(16).padStart(2, '0');

        return `#${red}${green}${blue}`;
    }
}
