var readlineSync = require('readline-sync');
import { UserManager } from "../Controller/UserManager";
import { User } from "../Models/User";
import { AdminMenu } from "./AdminMenu";
import { AdminMenuUserManager } from "./AdminMenuUserManager";
import { UserMenu } from "./UserMenu";

export class LoginSignUp {
    userManager = new UserManager();
    ;
    menu: string = `
    1. Login
    2. Sign up
    3. Exit
    `

    loginSignUpMenu = () => {
        let isLoop = true;
        let choice;
        let inCorrectChoice;

        while (isLoop) {
            do {
                console.log(this.menu);
                choice = +readlineSync.question("Enter your choice: ");
                inCorrectChoice = choice <= 0 || choice >= 4;
                if (inCorrectChoice) {
                    console.log("Wrong choice. Please try again")
                }
            } while (inCorrectChoice);

            let inputId;
            let inputPassword;
            let checkId;
            let inputName;
            switch (choice) {
                case 1:
                    let adminMenu = new AdminMenu;
                    let userMenu = new UserMenu;

                    do {
                        inputId = readlineSync.question('ID: ');
                        inputPassword = readlineSync.question('Password: ');
                        checkId = this.userManager.findById(inputId);
                        if (checkId != -1) {
                            console.log('This ID is unavailable. Please try again')
                        }
                    } while (checkId == -1);
                    let checkPassword = this.userManager.checkLogin(inputId, inputPassword)
                    if (checkPassword != -1) {
                        if (this.userManager.userList[checkId].role == 0) {
                            adminMenu.adminMenu();
                        } else {
                            userMenu.userMenu();
                        }
                    }
                case 2:
                    inputId = readlineSync.question('ID: ');
                    inputPassword = readlineSync.question('Password: ');
                    inputName = readlineSync.question('Name: ')
                    this.userManager.addUser(inputId, inputName, inputPassword);
                    break;
                case 3:
                    return isLoop = false;
            }


        }
    }
}

let login = new LoginSignUp();
login.loginSignUpMenu()

