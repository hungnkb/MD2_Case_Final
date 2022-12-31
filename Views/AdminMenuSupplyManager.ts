var readlineSync = require('readline-sync');
import { SupplyManager } from "../Controller/SupplyManager";
import { Supplies } from "../Models/Supplies";

export class AdminMenuSupplyManager {

    menu = `
    1. Show item list
    2. Add item
    3. Edit item
    4. Remove item
    5. Exit
    `

    adminMenuSupplyManager() {
        let supplyManager = new SupplyManager;
        let choice;
        let inCorrectChoice;
        let correctChoice;
        do {
            console.log(this.menu)
            choice = +readlineSync.question("Enter your choice");
            inCorrectChoice = choice <= 0 || choice >= 4;
            correctChoice = choice >= 1 || choice <= 3;
            if (inCorrectChoice) {
                console.log("Wrong choice. Please try again")
            }
        } while (correctChoice);

        switch (choice) {
            case 1:
                console.table(supplyManager.showList());
                break;
            case 2:
                let inputId = readlineSync.question('Id: ');
                let inputName = readlineSync.question('Name: ');
                let inputPrice = +readlineSync.question('Price: ');
                let inputQuantity = +readlineSync.question('Quantity: ');
                let newSupply = new Supplies(inputId, inputName, inputPrice, inputQuantity);
                supplyManager.addItem(inputId, newSupply);
                break;
            case 3:
            case 4:
            case 5:
                return;
        }

    }
}