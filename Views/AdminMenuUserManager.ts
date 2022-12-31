var readlineSync = require('readline-sync');
import { IdValidate, PasswordValidate } from "../Controller/AccountValidate";
import { UserManager } from "../Controller/UserManager";
import { User } from "../Models/User";
import { AdminMenu } from "./AdminMenu";
import { MainMenu } from "./MainMenu";

export class AdminMenuUserManager {
    menu: string = `
    ----------* User Manager *----------
    1. Show user list
    2. Add user
    3. Edit user
    4. Remove user
    5. Back
    `
    userManager = new UserManager();

    adminMenuUserManager() {
        let back = new AdminMenu();
        console.log(this.menu)
        let choice = +readlineSync.question('Pick your choice: ');
        let inputId;
        let inputName;
        let inputPassword;
        let isLoopAdminMenu = true;
        while (isLoopAdminMenu) {
            switch (choice) {
                case 1:
                    console.table(this.userManager.showList());
                    return this.adminMenuUserManager;
                
                case 2:
                    let idValidate = new IdValidate();
                    let passwordValidate = new PasswordValidate();
                    let isLoopId = true;
                    while (isLoopId) {
                        inputId = readlineSync.question('ID: ');
                        let isIdAvailable = this.userManager.findById(inputId)
                        if (!idValidate.validate(inputId)) {
                            console.log('!!! Wrong type of ID. Please try again');
                            continue;
                        } else if (isIdAvailable != -1) {
                            console.log('!!! This ID is unavailable. Please try again !!!');
                            continue;
                        } else {
                            isLoopId = false;
                        }
                    }
                    let isLoopPassword = true;
                    while (isLoopPassword) {
                        inputPassword = readlineSync.question('Password: ')
                        if (passwordValidate.validate(inputPassword)) {
                            let inputName = readlineSync.question('Name: ');
                            let newUser = new User(inputId, inputName, inputPassword);
                            this.userManager.addUser(newUser);
                            console.log('!!! Add new user successful !!!');
                            return this.adminMenuUserManager;
                        } else {
                            console.log('!!! Wrong type of password. Please try again');
                            continue;
                        }
                    }
                     return this.adminMenuUserManager;
                case 3:
                    inputId = readlineSync.question('ID: ');
                    let isIdAvailable = this.userManager.findById(inputId);
                    let no = -1;
                    if (isIdAvailable == no) {
                        console.log('!!! This ID is unavailable. Please try again !!!');
                        return this.adminMenuUserManager;
                    } else {
                        inputName = readlineSync.question('Name: ');
                        inputPassword = readlineSync.question('Password: ');
                        let updateUser = new User(inputId, inputName, inputPassword);
                        this.userManager.editUser(inputId, updateUser)
                        console.log('!!! Edit successful !!!');
                        return this.adminMenuUserManager;
                    }
                    break;
                case 4:
                    inputId = readlineSync.question('ID: ');
                    let isIdExist = this.userManager.findById(inputId);
                    no = -1;
                    if (isIdExist == no) {
                        console.log('!!! This ID is not exist. Please try again !!!');
                        return this.adminMenuUserManager;
                    } else {
                        this.userManager.removeUser(inputId);
                        console.log('!!! Remove successful !!!');
                        return this.adminMenuUserManager;
                    }
                case 5:
                    return back.adminMenu;
              
            }
        }

    }
}

