import { BaseValidator } from "./base/base.validator";
export class StringValidator implements BaseValidator {
    minLength: number;
    maxLength: number;
    chars: string[];
    constructor(minLength: number, maxLength?: number, chars?: string | string[]) {
        this.minLength = minLength;
        this.maxLength = maxLength;
        if (chars) {
            this.chars =
                Array.isArray(chars)
                    ? chars
                    : chars.split("");
        } else {
            this.chars = [""];
        }
    }

    public isValid(value: string | number): boolean {
        const isString = (typeof value === "string");
        if (!isString) {
            return false;
        }
        const str: string[] = (value + "").split("");

        const isLengthValid = str.length >= this.minLength &&
            str.length <= this.maxLength;

        if (!isLengthValid) {
            return false;
        }

        const doesContainValidChars = str.every(ch => this.chars.indexOf(ch) >= 0);
        return doesContainValidChars;
    }
}