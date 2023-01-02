import { AdminManager } from "./Controller/AdminManager";
import { SupplyManager } from "./Controller/SupplyManager";
import { MainMenu } from "./Views/MainMenu";

let supplyManager = new SupplyManager();
let adminManager = new AdminManager();

let login = new MainMenu();
login.mainMenu()
