export interface BaseController<T> {
    getAll(req, res);
    getById(req, res);
    add(req, res);
    getForm(req, res);
}