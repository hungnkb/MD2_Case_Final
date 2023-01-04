import { Supplies } from "../Models/Supplies";

export class SupplyManager {
    static supplyList: Supplies[] = [];
    static revenue = 0;

    constructor() {
        SupplyManager.supplyList.push(new Supplies('S001', 'Snack 001', 0.5, 1000));
        SupplyManager.supplyList.push(new Supplies('S002', 'Snack 002', 0.3, 1000));
        SupplyManager.supplyList.push(new Supplies('S003', 'Snack 003', 0.1, 1000));
        SupplyManager.supplyList.push(new Supplies('B001', 'Beer 001', 0.8, 1000));
        SupplyManager.supplyList.push(new Supplies('B002', 'Beer 002', 1, 1000));
        SupplyManager.supplyList.push(new Supplies('B003', 'Beer 003', 1.2, 1000));
    }

    static showList(): Supplies[] {
        return SupplyManager.supplyList;
    }

    static showRevenue() {
        return SupplyManager.revenue;
    }

    static addItem(newItem: Supplies): void {
        SupplyManager.supplyList.push(newItem);
    }

    static editItem(id: string, updateItem: Supplies): void {
        let index = this.findById(id)
        if (index != -1) {
            SupplyManager.supplyList[index] = updateItem;
        } 
    }

    static editQuantity(id: string, quantity: number): void {
        let index = this.findById(id);
        SupplyManager.supplyList[index].quantity -= quantity;
    }

    static removeItem(id: string): void {
        let index = this.findById(id)
        if (index != -1) {
            SupplyManager.supplyList.splice(index, 1)
        }
    }

    static findById(id: string): number {
        for (let i in SupplyManager.supplyList) {
            if (id == SupplyManager.supplyList[i].getId()) {
                return +i;
            }
        }
        return -1;
    }

    static checkQuantity(id: string): number | any {
        this.findById(id)
        let quantity = 0;
        for (let i in SupplyManager.supplyList) {
            if (SupplyManager.supplyList[i].quantity > 0) {
                return quantity += SupplyManager.supplyList[i].quantity;
            }
            return -1;
        }
    }
}