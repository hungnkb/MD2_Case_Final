export interface iUser {
    id: string;
    name: string;
    password: string;
    role: number;

    getId();
    getName();
    getPassword();
}