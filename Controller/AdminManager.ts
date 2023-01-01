import { User } from "../Models/User";

export class AdminManager {

    role: number = 1;
    userList: User[] = [];

    constructor() {
        this.userList.push(new User('hung', 'Hung', '123', 0))
        this.userList.push(new User('hung2', 'Hung2', '123'))
        this.userList.push(new User('hung3', 'Hung3', '123'))
        this.userList.push(new User('hung4', 'Hung4', '123'))
        this.userList.push(new User('hung5', 'Hung5', '123'))
    }

    showList() {
        return this.userList;
    }

    addUser(newUser: User) {
        this.userList.push(newUser)
    }

    editUser(id: string, updateUser: User) {
        let index = this.findById(id)
        if (index != -1) {
            this.userList[index] = updateUser;
        }
    }

    removeUser(id: string) {
        let index = this.findById(id)
        if (index != -1) {
            this.userList.splice(index, 1)
        } else {
            return 'This user is not exist. Please try again'
        }
    }

    findById(id: string) {
        for (let i in this.userList) {
            if (id == this.userList[i].getId()) {
                return +i;
            }
        }
        return -1;
    }

    checkLogin(id: string, password: string) {
        let checkId = this.findById(id);
        if (checkId != -1) {
            for (let i in this.userList[checkId]) {
                if (password == this.userList[checkId].getPassword()) {
                    return +i;
                }
            }
        } return -1;
    }

    checkAdmin(user: User) {
        if (user.role == 1) {
            return 1
        } return 0
    }
}