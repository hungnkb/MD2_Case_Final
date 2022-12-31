import { Supplies } from "../Models/Supplies";

export class SupplyManager {
    private supplyList: Supplies[] = [];

    constructor() {
        this.supplyList.push(new Supplies('S001', 'Snack 001', 0.5, 1000));
        this.supplyList.push(new Supplies('S002', 'Snack 002', 0.3, 1000));
        this.supplyList.push(new Supplies('S003', 'Snack 003', 0.1, 1000));
        this.supplyList.push(new Supplies('B003', 'Beer 003', 0.8, 1000));
        this.supplyList.push(new Supplies('B003', 'Beer 003', 1, 1000));
        this.supplyList.push(new Supplies('B003', 'Beer 003', 1.2, 1000));
    }

    showList() {
        return this.supplyList;
    }

    addItem(id: string, newItem: Supplies) {
        let index = this.findById(id)
        if (index == -1) {
            this.supplyList.push(newItem)
        } else {
            return 'This ID is unvailable. Please try again'
        }
    }

    editItem(id: string, updateItem: Supplies) {
        let index = this.findById(id)
        if (index != -1) {
            this.supplyList[index] = updateItem;
        } else {
            return 'This item is not exist. Please try again'
        }
    }

    removeItem(id: string) {
        let index = this.findById(id)
        if(index != -1) {
            this.supplyList.splice(index, 1)
        } else {
            return 'This item is not exist. Please try again'
        }
    }

    findById(id: string) {
        for (let i in this.supplyList) {
            if (id == this.supplyList[i].getId()) {
                return +i
            }
        }
        return -1;
    }

    checkQuantity(id: string) {
        this.findById(id)
        for (let i in this.supplyList) {

        }
    }
}