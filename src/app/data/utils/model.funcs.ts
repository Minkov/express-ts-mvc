export interface ModelFuncs<T> {
    toModel(obj: T): any;
    fromModel(model: any): T;
}