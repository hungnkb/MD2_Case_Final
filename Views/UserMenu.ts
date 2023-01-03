var readlineSync = require('readline-sync');
import { SupplyManager } from "../Controller/SupplyManager";
import { Supplies } from "../Models/Supplies";
import { UserCart } from "../Controller/UserCart";
import { MainMenu } from "./MainMenu";

export class UserMenu {
    userCart = new UserCart('', '', 0, 0);
    logout = new MainMenu();
    menu = `
    ----------* User Menu *----------
    1. Supply list
    2. Add item
    3. Show cart
    4. Edit cart
    5. Pay cart
    6. Logout
    `

    userMenu() {
        let isIdExistSupply = 0;
        let isIdExistCart = 0;
        let no = -1;
        let indexSupply = 0;
        let indexCart = 0;
        let inputQuantity = 0;

        while (true) {
            console.log(this.menu);
            let choice = +readlineSync.question('Pick your choice: ');
            switch (choice) {
                case 1:
                    console.table(SupplyManager.supplyList);
                    break;
                case 2:
                    let inputId = readlineSync.question('Id item: ');
                    let isLoop = true;
                    while (isLoop) {
                        isIdExistSupply = indexSupply = SupplyManager.findById(inputId);
                        isIdExistCart = indexCart = this.userCart.findById(inputId);
                        if (isIdExistSupply == no) {
                            console.log('[!!!] This item is not exist. Please try again');
                            break;
                        } else {
                            let isLoop2 = true;
                            while (isLoop2) {
                                inputQuantity = +readlineSync.question('Quantity: ');
                                if (isIdExistCart == no) {
                                    let itemSupply: any = SupplyManager.checkQuantity(inputId);
                                    if (inputQuantity > itemSupply) {
                                        console.log('[!!!] Storage is not enough. Please try again');
                                        break;
                                    } else {
                                        this.addItemNoExistCart(inputId, inputQuantity, indexSupply);
                                        console.log('[v] Add item to cart successful');
                                        isLoop2 = false;
                                    }
                                }
                                else {
                                    this.addItemExistCart(indexCart, inputQuantity, indexSupply);
                                    console.log('[v] Add item to cart successful');
                                    isLoop2 = false;
                                }
                            }
                            isLoop = false;
                        }
                    }
                    break;
                case 3:
                    console.table(this.userCart.showList());
                    break;
                case 4:
                    let isLoop3 = true;
                    while (isLoop3) {
                        let inputId = readlineSync.question('Id: ');
                        let indexCart = this.userCart.findById(inputId);
                        let indexSupply = SupplyManager.findById(inputId);
                        let notExist = -1;
                        if (indexCart == notExist) {
                            console.log('[!!!] This item is not exist in cart. Please try again');
                            break;
                        } else {
                            let inputQuantity = +readlineSync.question('Quantity: ');
                            let removeItemInCart = inputQuantity >= this.userCart.itemList[indexCart].quantity;
                            let itemInCartQuantity = this.userCart.itemList[indexCart].quantity;
                            if (removeItemInCart) {
                                let clearCart = 0;
                                this.userCart.itemList[indexCart].quantity = clearCart;
                                this.addItemBackSupply(indexSupply, inputQuantity);
                                console.log('[v] Edit cart successful');
                                isLoop3 = false;
                            } else {
                                this.userCart.itemList[indexCart].quantity = itemInCartQuantity - inputQuantity;
                                this.addItemBackSupply(indexSupply, inputQuantity);
                                console.log('[v] Edit cart successful');
                                isLoop3 = false;
                            }
                        }
                    }
                    break;
                case 5:
                    console.log('$' + this.userCart.bill());
                    console.log('[v] Payment has been done. Thank you');
                    break;
                case 6:
                    return this.logout.mainMenu;
            }
        }
    }

    addItemExistCart(indexCart: number, inputQuantity: number, indexSupply: number) {
        this.userCart.itemList[indexCart].quantity = this.userCart.itemList[indexCart].quantity + inputQuantity;
        SupplyManager.supplyList[indexSupply].quantity = SupplyManager.supplyList[indexSupply].quantity - inputQuantity;
    }

    addItemNoExistCart(inputId: string, inputQuantity: number, indexSupply: number) {
        let newItem = new Supplies(inputId, SupplyManager.supplyList[indexSupply].name, SupplyManager.supplyList[indexSupply].price, inputQuantity)
        this.userCart.addItem(newItem);
        SupplyManager.supplyList[indexSupply].quantity = SupplyManager.supplyList[indexSupply].quantity - inputQuantity;
    }

    addItemBackSupply(indexSupply: number, inputQuantity: number) {
        SupplyManager.supplyList[indexSupply].quantity = SupplyManager.supplyList[indexSupply].quantity + inputQuantity;
    }
}

