var readlineSync = require('readline-sync');
import { AdminManager } from "../Controller/AdminManager";
import { User } from "../Models/User";
import { AdminMenu } from "./AdminMenu";
import { AdminMenuUserManager } from "./AdminMenuUserManager";
import { Signup } from "./SignUp";
import { UserMenu } from "./UserMenu";

export class MainMenu {
    adminManager = new AdminManager();
    ;
    menu: string = `
    ----------* Welcome to AGE-30 store *----------
    1. Login
    2. Signup
    3. Exit
    `

    mainMenu = () => {
        let isLoop = true;
        let inputId: string = '';
        let inputPassword: string;
        let inputName: string;
        let choice;
        while (isLoop) {
            console.log(this.menu);
            choice = +readlineSync.question("Enter your choice: ");


            switch (choice) {
                case 1:
                    let adminMenu = new AdminMenu();
                    let userMenu = new UserMenu();
                    let isLoop1 = true;
                    while (isLoop1) {
                        inputId = readlineSync.question('ID: ');
                        inputPassword = readlineSync.question('Password: ');
                        let checkLogin = this.adminManager.checkLogin(inputId, inputPassword);
                        if (checkLogin == -1) {
                            console.log('!!! This ID is unavailable. Please try again');

                        } else {
                            console.log('!!! Login successful')
                            isLoop1 = false;
                        }
                    }

                    let indexOfId = this.adminManager.findById(inputId);
                    if (this.adminManager.userList[indexOfId].getRole() == 1) {
                        userMenu.userMenu();
                    } else {
                        adminMenu.adminMenu();
                    }
                    break;
                case 2:
                    let signup = new Signup();
                    let newUser = signup.signup();
                    this.adminManager.addUser(newUser);
                    break;
                case 3:
                    return false;
            }
        }

    }

}
