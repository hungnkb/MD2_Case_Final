import { UserCart } from "../Models/UserCart";
import { UserMenu } from "./UserMenu";
var readlineSync = require('readline-sync');

export class UserCartMenu {
    userCart = new UserCart();
    // back = new UserMenu();
    menu = `
    1. Show cart
    2. Edit cart
    3. Pay
    4. Back
    `

    userCartMenu() {
        while (true) {
            console.log(this.menu);
            let choice = +readlineSync.question('Pick your choice: ')
            switch (choice) {
                case 1:
                    console.table(this.userCart.showList());
                    break;
                case 2:
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
                                this.userCartMenu();
                            } else {
                                this.userCart.itemList[index].quantity = this.userCart.itemList[index].quantity - inputQuantity;
                                console.log('!!! Edit cart successful');
                                this.userCartMenu();
                            }
                        }
                    }
                    break;
                case 3:
                    this.userCart.bill();
                    break;
                case 4:
                    return;
            }
        }

    }
}