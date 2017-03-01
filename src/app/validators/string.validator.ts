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
        return (typeof value === "string") &&
            value.length >= this.minLength &&
            value.length <= this.maxLength;
    }
}