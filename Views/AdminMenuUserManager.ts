var readlineSync = require('readline-sync');
import { UserManager } from "../Controller/UserManager";
import { User } from "../Models/User";

export class AdminMenuUserManager {
    menu: string = `
    1. Show user list
    2. Add user
    3. Edit user
    4. Remove user
    5. Exit
    `
    userManager = new UserManager();

    adminMenuUserManager() {
        console.log(this.menu)
        let choice = +readlineSync.question('')
        switch (choice) {
            case 1:
                console.table(this.userManager.showList());
                break;

            case 2:
                let inputId = readlineSync.question('ID: ');
                let inputName = readlineSync.question('Name: ');
                let inputPassword = readlineSync.question('Password: ');
                this.userManager.addUser(inputId, inputName, inputPassword);
                break;

            case 3:
                inputId = readlineSync.question('ID: ');
                inputName = readlineSync.question('Name: ');
                inputPassword = readlineSync.question('Password: ');
                let newUser = new User(inputId, inputName, inputPassword);
                this.userManager.editUser(inputId, newUser);
                break;

            case 4:
                inputId = readlineSync.question('ID: ');
                this.userManager.removeUser(inputId);
                break;
            case 5:
                return;
        }
    }
}