export interface BaseValidator {
    isValid(value: string | number): boolean;
}