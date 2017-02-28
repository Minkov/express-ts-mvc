export class User {
    id: string;
    username: string;
    password: string;

    constructor(id: string, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    static toModel(obj: User): any {
        return {
            username: obj.username,
            password: obj.password
        };
    }

    static fromModel(model: any): User {
        let id = model.id || model._id;
        let username = model.username;
        let password = model.password;
        return new User(id, username, password);
    }
}