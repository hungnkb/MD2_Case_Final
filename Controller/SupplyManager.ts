import { Supplies } from "../Models/Supplies";

export class SupplyManager {
    supplyList: Supplies[] = [];

    constructor() {
        this.supplyList.push(new Supplies('S001', 'Snack 001', 0.5, 1000));
        this.supplyList.push(new Supplies('S002', 'Snack 002', 0.3, 1000));
        this.supplyList.push(new Supplies('S003', 'Snack 003', 0.1, 1000));
        this.supplyList.push(new Supplies('B001', 'Beer 003', 0.8, 1000));
        this.supplyList.push(new Supplies('B002', 'Beer 003', 1, 1000));
        this.supplyList.push(new Supplies('B003', 'Beer 003', 1.2, 1000));
    }

    showList(): Supplies[] {
        return this.supplyList;
    }

    addItem(newItem: Supplies): void {
        this.supplyList.push(newItem);
    }

    editItem(id: string, updateItem: Supplies): void {
        let index = this.findById(id)
        if (index != -1) {
            this.supplyList[index] = updateItem;
        } 
    }

    editQuantity(id: string, quantity: number) {
        let index = this.findById(id);
        this.supplyList[index].quantity -= quantity;
    }

    removeItem(id: string): void {
        let index = this.findById(id)
        if (index != -1) {
            this.supplyList.splice(index, 1)
        }
    }

    findById(id: string): number {
        for (let i in this.supplyList) {
            if (id == this.supplyList[i].getId()) {
                return +i;
            }
        }
        return -1;
    }

    checkQuantity(id: string): number | any {
        this.findById(id)
        let quantity = 0;
        for (let i in this.supplyList) {
            if (this.supplyList[i].quantity > 0) {
                return quantity += this.supplyList[i].quantity;
            }
            return -1;
        }
    }
}