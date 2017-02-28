export class Author {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    static toModel(obj: Author): any {
        return {
            name: obj.name
        };
    }

    static fromModel(model: any): Author {
        return new Author(model.name);
    }
}