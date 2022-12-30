var readlineSync = require('readline-sync');
import { UserManager } from "../Controller/UserManager";
import { LoginSignUp } from "./LoginSignup";
const fs = require('fs')

export class AdminMenu {

    userManager: UserManager = new UserManager();
    menu: string = `
    1. User Manager
    2. Supply Manager
    3. Exit
    `

    adminMenu() {
        console.log(this.menu)
        while (true) {
            let choice = +readlineSync.question('Pick your choice: ');
            switch (choice) {
                case 1:
                    this.userManager.showList()
                case 2:
                    let inputID = readlineSync.question('ID: ');
                    let inputPassword = readlineSync.question('Password: ');
                    let inputName = readlineSync.question('Name: ');
                    this.userManager.addUser(inputID, inputPassword, inputName);
                case 3:
                    inputID = readlineSync.question('ID: ');


                case 4:

                case 5:
            }
        }
    }
}