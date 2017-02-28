import { ModelFuncs } from "./utils/model.funcs";
import { Collection, Db, ObjectID } from "mongodb";

import { BaseData } from "./base/base.data";

export class MongoDbData<T> implements BaseData<T> {
    db: Db;
    collection: Collection;
    modelFuncs: ModelFuncs<T>;

    constructor(db: Db, Klass: Function, modelFuncs: ModelFuncs<T>) {
        this.db = db;
        const collectionName = this.getCollectionName(Klass);
        this.collection = this.db.collection(collectionName);
        this.modelFuncs = modelFuncs;
    }
    getAll(): Promise<T[]> {
        return this.collection.find()
            .toArray()
            .then(models => models.map(model => this.modelFuncs.fromModel(model)));
    }

    findOne(query?: any): Promise<T> {
        return this.collection.findOne(query)
            .then(model => {
                if (model == null) {
                    return model;
                }
                return this.modelFuncs.fromModel(model);
            });
    }

    getById(id: string): Promise<T> {
        const objectId = new ObjectID(id);
        return this.collection.findOne({ _id: objectId })
            .then(model => this.modelFuncs.fromModel(model));
    }
    add(item: T): Promise<T> {
        return this.collection.insertOne(item)
            .then(result => {
                return item;
            });
    }

    private getCollectionName(Klass: Function): string {
        const klassName = Klass.prototype.constructor.name;
        return klassName.toLowerCase() + "s";
    }
}