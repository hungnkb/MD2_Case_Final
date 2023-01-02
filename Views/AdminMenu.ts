var readlineSync = require('readline-sync');
import { MainMenu } from "./MainMenu";
import { AdminMenuUserManager } from "./AdminMenuUserManager";
import { AdminMenuSupplyManager } from "./AdminMenuSupplyManager"

export class AdminMenu {

    adminMenuUserManager = new AdminMenuUserManager();
    adminMenuSupplyManager = new AdminMenuSupplyManager();
    menu = `
    ----------* Administrator Menu *----------
    1. User Manager
    2. Supply Manager
    3. Logout
    `

    adminMenu() {
        let logout = new MainMenu();

            while (true) {
                console.log(this.menu);
                let choice = +readlineSync.question('Pick your choice: ');
                switch (choice) {
                    case 1:
                        this.adminMenuUserManager.adminMenuUserManager();
                        break;
                    case 2:
                        this.adminMenuSupplyManager.adminMenuSupplyManager();
                        break;
                    case 3:
                        return logout.mainMenu   
                }
            }
    }
}