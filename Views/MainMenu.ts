var readlineSync = require('readline-sync');

import { AdminManager } from "../Controller/AdminManager";
import { AdminMenu } from "./AdminMenu";
import { Signup } from "./SignUp";
import { UserMenu } from "./UserMenu";

export class MainMenu {
    
    menu = `
    ----------* Welcome to AGE-30 store *----------
    1. Login
    2. Signup
    3. Exit
    `

    mainMenu = () => {
        let isLoop = true;
        let inputId = '';
        let inputPassword = '';
        let choice = 0;
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
                        let checkLogin = AdminManager.checkLogin(inputId, inputPassword);
                        let idUnavailable = -1;
                        if (checkLogin == idUnavailable) {
                            console.log('[!!!] This ID is unavailable. Please try again');

                        } else {
                            console.log('[v] Login successful')
                            isLoop1 = false;
                        }
                    }

                    let indexOfId = AdminManager.findById(inputId);
                    let _user = 1;
                    let checkRole = AdminManager.userList[indexOfId].getRole()
                    if (checkRole == _user) {
                        userMenu.userMenu();
                    } else {
                        adminMenu.adminMenu();
                    }
                    break;
                case 2:
                    let signup = new Signup();
                    let newUser = signup.signup();
                    AdminManager.addUser(newUser);
                    break;
                case 3:
                    return false;
            }
        }

    }

}
