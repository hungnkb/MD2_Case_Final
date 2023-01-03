import { User } from "../Models/User";

export class AdminManager {

    role: number = 1;
    static userList: User[] = [];

    constructor() {
        AdminManager.userList.push(new User('hung', 'Hung', '123', 0));
        AdminManager.userList.push(new User('hung2', 'Hung2', '123'));
        AdminManager.userList.push(new User('hung3', 'Hung3', '123'));
        AdminManager.userList.push(new User('hung4', 'Hung4', '123'));
        AdminManager.userList.push(new User('hung5', 'Hung5', '123'));
    }

    static showList() {
        return AdminManager.userList;
    }

    static addUser(newUser: User) {
        AdminManager.userList.push(newUser);
    }

    static editUser(id: string, updateUser: User) {
        let index = this.findById(id)
        let notExist = -1;
        if (index != notExist) {
            AdminManager.userList[index] = updateUser;
        }
    }

    static removeUser(id: string) {
        let index = this.findById(id)
        let notExist = -1;
        if (index != notExist) {
            AdminManager.userList.splice(index, 1)
        } else {
            return;
        }
    }

    static findById(id: string) {
        for (let i in AdminManager.userList) {
            if (id == AdminManager.userList[i].getId()) {
                return +i;
            }
        }
        return -1;
    }

    static checkLogin(id: string, password: string) {
        let checkId = this.findById(id);
        let notExist = -1;
        if (checkId != notExist) {
            for (let i in AdminManager.userList[checkId]) {
                if (password == AdminManager.userList[checkId].getPassword()) {
                    return +i;
                }
            }
        } return -1;
    }

    static checkAdmin(user: User) {
        if (user.role == 1) {
            return 1;
        } return 0;
    }
}