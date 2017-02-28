export class Book {
    id: string;
    title: string;
    description: string;
    imgUrl: string;

    constructor(id: string, title: string, description: string, imgUrl: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }

    static fromModel(model: any): Book {
        const id = model.id || model._id;
        const title = model.title;
        const description = model.description;
        const imgUrl = model.imgUrl;

        return new Book(id, title, description, imgUrl);
    }

    static toModel(obj: Book): any {
        return {
            title: obj.title,
            description: obj.description,
            imgUrl: obj.imgUrl
        };
    }
}