export interface iAdmin<T> {
    id: string;
    name: string;
    role: string;

    addItem(id: string, nameItem: string, quantity: number): void;
    update(id: string, nameItem?: string, quantity?: number): void;
    delete(id: string): void;
    findByID(id: string): boolean;
    findByPassword(password: string): boolean;
}