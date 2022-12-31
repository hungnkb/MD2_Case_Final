var readlineSync = require('readline-sync');
import { UserManager } from "../Controller/UserManager";
import { User } from "../Models/User";
import { AdminMenu } from "./AdminMenu";
import { AdminMenuUserManager } from "./AdminMenuUserManager";
import { UserMenu } from "./UserMenu";

export class MainMenu {
    userManager = new UserManager();
    ;
    menu: string = `
    ----------* Welcome to AGE-30 store *----------
    1. Login
    2. Sign up
    3. Exit
    `

    mainMenu = () => {
        let isLoop = true;
        let choice;
            while (isLoop) {
                console.log(this.menu);
                choice = +readlineSync.question("Enter your choice: ");
                console.log(choice);
                
                let inputId;
                let inputPassword;
                let inputName;
                switch (choice) {
                    case 1:
                        let adminMenu = new AdminMenu();
                        let userMenu = new UserMenu();
                        let isLoop1 = true;
                        while (isLoop1) {
                            inputId = readlineSync.question('ID: ');
                            inputPassword = readlineSync.question('Password: ');
                            let checkLogin = this.userManager.checkLogin(inputId, inputPassword);
                            if (checkLogin == -1) {
                                console.log('This ID is unavailable. Please try again');
    
                            } else {
                                console.log('Login successful')
                                isLoop1 = false;
                            }
                        }
    
                        let indexOfId = this.userManager.findById(inputId);
                        if (this.userManager.userList[indexOfId].getRole() == 1) {
                            userMenu.userMenu();
                        } else {
                            adminMenu.adminMenu();
                        }
                        break;
                    case 2:
                        inputId = readlineSync.question('ID: ');
                        inputPassword = readlineSync.question('Password: ');
                        inputName = readlineSync.question('Name: ')
                        let newUser = new User(inputId, inputName, inputPassword)
                        this.userManager.addUser(newUser);
                        break;
                    case 3:
                     return  false;
                }
            }
        
    }

}
