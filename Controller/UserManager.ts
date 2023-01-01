import { stringify } from "querystring";
import { Supplies } from "../Models/Supplies";
import { User } from "../Models/User";
import { SupplyManager } from "./SupplyManager";

export class UserManager {

    supplyManager = new SupplyManager();
    cart: Supplies[] = [];


    showSupplyList() {
        this.supplyManager.showList();
    }

    addItem(id: string,  quantity: number, newItem: Supplies): void {
        this.cart.push(newItem);
        this.supplyManager.editQuantity(id, quantity);
    }

    showCart() {
        return this.cart;
    }

    removeItemInCart(id:string ,quantity: number) {

    }
}