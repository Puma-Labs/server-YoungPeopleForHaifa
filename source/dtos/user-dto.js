module.exports = class AdminDto {
    id;
    email;
    name;
    role;

    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.name = model.name;
        this.role = model.role;
    }
}
