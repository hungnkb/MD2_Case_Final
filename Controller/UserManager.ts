import { User } from "../Models/User";

export class UserManager {

    role: number = 1;
    userList: User[] = [];

    showList() {
        return this.userList;
    }

    addUser(id: string, name: string, newUser: User) {
        let index = this.findById(id)
        if (index == -1) {
            this.userList.push(newUser)
        } else {
            return 'This ID is unvailable. Please try again'
        }
    }

    editUser(id: string, updateUser: User) {
        let index = this.findById(id)
        if (index != -1) {
            this.userList[index] = updateUser;
        } else {
            return 'This user is not exist. Please try again'
        }
    }

    removeUser(id: string) {
        let index = this.findById(id)
        if(index != -1) {
            this.userList.splice(index, 1)
        } else {
            return 'This user is not exist. Please try again'
        }
    }

    findById(id: string) {
        for (let i in this.userList) {
            if (id == this.userList[i].getId()) {
                return +i
            }
        }
        return -1;
    }

    checkLogin(password: string, id: string) {
        let checkId = this.findById(id);
        if (checkId != -1) {
            for (let i in this.userList[checkId]) {
                if (password == this.userList[checkId].getPassword()) {
                    return
                }
            } return -1;
        }
    }

    checkAdmin(user: User) {
        if (user.role == 1) {
            return 1
        } return 0
    }
}