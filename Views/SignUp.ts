import { IdValidate, PasswordValidate } from "../Controller/AccountValidate";
import { AdminManager } from "../Controller/AdminManager";
import { User } from "../Models/User";
import { MainMenu } from "./MainMenu";
var readlineSync = require('readline-sync');

export class Signup {
    idValidate = new IdValidate();
    passwordValidate = new PasswordValidate();
    adminManager = new AdminManager();
    back = new MainMenu()


    signup(): User | any {
        let inputId: string = '';
        let isLoop = true;
        let newUser: User;
        while (isLoop) {
            console.log('ID need at least 2 words, not include symbol');
            inputId = readlineSync.question('Id: ');
            if (this.idValidate.validate(inputId)) {
                let yes = -1;
                let isIdAvailable = this.adminManager.findById(inputId);
                if (isIdAvailable == yes) {
                    isLoop = false;
                } else {
                    console.log('!!! This ID is unavailable. Please try again');
                    continue;
                }
            } else {
                console.log('!!! Wrong type of ID. Please try again');
                continue;
            }
        }

        let isLoop2 = true;
        while (isLoop2) {
            console.log('Password need at lease 6 words, include alphabet and at lease 1 symbol [#?!@$%^&*-]');
            let inputPassword = readlineSync.question('Password: ');
            if (this.passwordValidate.validate(inputPassword)) {
                let inputName = readlineSync.question('Name: ');
                newUser = new User(inputId, inputName, inputPassword)
                return newUser;
            } else {
                console.log('!!! Wrong type of password. Please try again');
                continue;
            }
        }
      
    }
}