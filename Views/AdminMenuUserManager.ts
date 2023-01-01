var readlineSync = require('readline-sync');
import { IdValidate, PasswordValidate } from "../Controller/AccountValidate";
import { AdminManager } from "../Controller/AdminManager";
import { User } from "../Models/User";
import { AdminMenu } from "./AdminMenu";


export class AdminMenuUserManager {
    menu: string = `
    ----------* User Manager *----------
    1. Show user list
    2. Add user
    3. Edit user
    4. Remove user
    5. Back
    `
    userManager = new AdminManager();

    adminMenuUserManager() {
        let back = new AdminMenu();
        console.log(this.menu)
        let choice = +readlineSync.question('Pick your choice: ');
        let inputId;
        let inputName;
        let inputPassword;
        let isIdExist;
        let no = -1;
        let idValidate = new IdValidate();
        let passwordValidate = new PasswordValidate();
        let isLoopPassword = true;

        switch (choice) {
            case 1:
                console.table(this.userManager.showList());
                this.adminMenuUserManager();
                break;

            case 2:

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
                while (isLoopPassword) {
                    inputPassword = readlineSync.question('Password: ');
                    if (passwordValidate.validate(inputPassword)) {
                        let inputName = readlineSync.question('Name: ');
                        let newUser = new User(inputId, inputName, inputPassword);
                        this.userManager.addUser(newUser);
                        console.log('!!! Add new user successful !!!');
                        this.adminMenuUserManager();
                    } else {
                        console.log('!!! Wrong type of password. Please try again');
                        continue;
                    }
                }
                this.adminMenuUserManager();
                break
            case 3:
                inputId = readlineSync.question('ID: ');
                isIdExist = this.userManager.findById(inputId);

                if (isIdExist == no) {
                    console.log('!!! This ID is unavailable. Please try again !!!');
                    this.adminMenuUserManager();
                    break;
                } else {
                    while (isLoopPassword) {
                        inputPassword = readlineSync.question('Password: ');
                        if (passwordValidate.validate(inputPassword)) {
                            isLoopPassword = false;
                            break;
                        } else {
                            console.log('!!! Wrong type of password. Please try again');
                        }
                    }
                    inputName = readlineSync.question('Name: ');
                    let updateUser = new User(inputId, inputName, inputPassword);
                    this.userManager.editUser(inputId, updateUser)
                    console.log('!!! Edit successful !!!');
                    this.adminMenuUserManager();
                }

            case 4:
                inputId = readlineSync.question('ID: ');
                isIdExist = this.userManager.findById(inputId);

                if (isIdExist == no) {
                    console.log('!!! This ID is not exist. Please try again !!!');
                    this.adminMenuUserManager();
                } else {
                    this.userManager.removeUser(inputId);
                    console.log('!!! Remove successful !!!');
                    this.adminMenuUserManager();
                }
                break;
            case 5:
                return back.adminMenu;
        }
    }
}

