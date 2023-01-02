var readlineSync = require('readline-sync');
import { SupplyManager } from "../Controller/SupplyManager";
import { Supplies } from "../Models/Supplies";
import { AdminMenu } from "./AdminMenu";

export class AdminMenuSupplyManager {

    menu = `
    1. Show item list
    2. Add item
    3. Edit item
    4. Remove item
    5. Back
    `

    adminMenuSupplyManager() {
        let supplyManager = new SupplyManager();
        let inCorrectChoice: any;
        let correctChoice: any;
        let back = new AdminMenu();
        let inputId: string;
        let inputName: string;
        let inputPrice: number;
        let inputQuantity: number;
        let no: number;
        let isIdAvailable: number;

        do {
            console.log(this.menu)
            let choice = +readlineSync.question("Enter your choice: ");
            inCorrectChoice = choice <= 0 || choice >= 6;
            correctChoice = choice >= 1 || choice <= 5;
            if (inCorrectChoice) {
                console.log("!!! Wrong choice. Please try again")
            } else {
                switch (choice) {
                    case 1:
                        console.table(supplyManager.showList());
                        break;
                    case 2:
                        inputId = readlineSync.question('Id: ');
                        isIdAvailable = supplyManager.findById(inputId);
                        let yes = -1;
                        if (isIdAvailable == yes) {
                            inputName = readlineSync.question('Name: ');
                            inputPrice = +readlineSync.question('Price: ');
                            inputQuantity = +readlineSync.question('Quantity: ');
                            let newSupply = new Supplies(inputId, inputName, inputPrice, inputQuantity);
                            supplyManager.addItem(newSupply);
                            console.log('!!! Add item successful');
                        } else {
                            console.log('!!! This item is unavailable. Please try again');
                        }
                        break;

                    case 3:
                        inputId = readlineSync.question('ID: ');
                        no = -1;
                        let isIdExist = supplyManager.findById(inputId);
                        if (isIdExist == no) {
                            console.log('!!! This ID is not exist. Please try again');
                        } else {
                            inputName = readlineSync.question('Name: ');
                            inputPrice = +readlineSync.question('Price: ');
                            inputQuantity = +readlineSync.question('Quantity: ');
                            let updateItem = new Supplies(inputId, inputName, inputPrice, inputQuantity);
                            supplyManager.editItem(inputId, updateItem);
                        }
                        break;

                    case 4:
                        inputId = readlineSync.question('ID: ');
                        no = -1;
                        isIdAvailable = supplyManager.findById(inputId);
                        if (isIdAvailable == no) {
                            console.log('!!! This ID is not exist. Please try again');
                        } else {
                            supplyManager.removeItem(inputId);
                            console.log('!!! Remove successful')
                        }
                        break;
                        
                    case 5:
                        return back.adminMenu;
                }
            }
        } while (correctChoice);
    }
}