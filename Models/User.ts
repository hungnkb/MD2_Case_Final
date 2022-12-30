import { iUser } from "./Interface/IUser";

export class User implements iUser {
    id;
    name;
    password;
    role;

    constructor(id: string, name: string, password: string, role:number = 1) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.role = 1;
    }

    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getPassword() {
        return this.password
    }
}