var readlineSync = require('readline-sync');
import { SupplyManager } from "../Controller/SupplyManager";
import { Supplies } from "../Models/Supplies";
import { UserCart } from "../Models/UserCart";
import { MainMenu } from "./MainMenu";
import { UserCartMenu } from "./UserCartMenu";


export class UserMenu {
    supplyManager = new SupplyManager();
    userCart = new UserCart('', '', 0, 0);
    userCartMenu = new UserCartMenu();
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
        let isIdExistSupply: number;
        let isIdExistCart: number;
        let no = -1;
        let indexSupply: number;
        let indexCart: number;
        let inputQuantity: number = 0;

        while (true) {
            console.log(this.menu);
            let choice = +readlineSync.question('Pick your choice: ');
            switch (choice) {
                case 1:
                    console.table(this.supplyManager.supplyList);
                    break;
                case 2:
                    let inputId = readlineSync.question('Id item: ');
                    while (true) {
                        isIdExistSupply = indexSupply = this.supplyManager.findById(inputId);
                        isIdExistCart = indexCart = this.userCart.findById(inputId);
                        if (isIdExistSupply == no) {
                            console.log('!!! This item is not exist. Please try again');
                            break;
                        } else {
                            let isLoop = true;
                            while (isLoop) {
                                inputQuantity = +readlineSync.question('Quantity: ');
                                if (isIdExistCart == no) {

                                    let itemSupply: any = this.supplyManager.checkQuantity(inputId);
                                    if (inputQuantity > itemSupply) {
                                        console.log('!!! Storage is not enough. Please try again');
                                        break;

                                    } else {
                                        let newItem = new Supplies(inputId, this.supplyManager.supplyList[indexSupply].name, this.supplyManager.supplyList[indexSupply].price, inputQuantity)
                                        this.userCart.addItem(newItem);
                                        this.supplyManager.supplyList[indexSupply].quantity = this.supplyManager.supplyList[indexSupply].quantity - inputQuantity;
                                        console.log('!!! Add item to cart successful');
                                        this.userMenu();
                                        break;
                                    }
                                }
                                else {
                                    this.userCart.itemList[indexCart].quantity = this.userCart.itemList[indexCart].quantity + inputQuantity;
                                    this.supplyManager.supplyList[indexSupply].quantity = this.supplyManager.supplyList[indexSupply].quantity - inputQuantity;
                                    console.log('!!! Add item to cart successful');
                                    this.userMenu();
                                    break;
                                }
                            }
                        }
                    }
                    break;
                case 3:
                    console.table(this.userCart.showList());
                    break;
                case 4:
                    while (true) {
                        let inputId = readlineSync.question('Id: ');
                        let index = this.userCart.findById(inputId);

                        let notExist = -1;
                        if (index == notExist) {
                            console.log('!!! This item is not exist in cart. Please try again');
                            break;
                        } else {
                            let inputQuantity = +readlineSync.question('Quantity: ');
                            if (inputQuantity >= this.userCart.itemList[index].quantity) {
                                this.userCart.itemList[index].quantity = 0;
                                console.log('!!! Edit cart successful');
                                this.userMenu();
                                break;
                            } else {
                                this.userCart.itemList[index].quantity = this.userCart.itemList[index].quantity - inputQuantity;
                                console.log('!!! Edit cart successful');
                                this.userMenu();
                                break;
                            }
                        }
                    }
                    break;
                case 5:
                    console.log('$' + this.userCart.bill());
                    console.log('!!! Payment has been done. Thank you');
                    break;
                case 6:
                    return this.logout.mainMenu;
            }
        }


    }
}