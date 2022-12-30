export interface iSupplies {
    id: string;
    name: string;
    quantity: number;
    price: number;

    getId(): string;
    getName(): string;
    getPrice(): number;
    getQuantity(): number;
    setId(id: string): void;
    setName(name: string): void;
    setQuantity(quantity: number): void;
    setPrice(price: number): void;
}