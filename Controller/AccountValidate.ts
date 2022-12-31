export class IdValidate {
    idValidate: RegExp = /^[a-z0-9_]{2,}$/

    validate(id: string): boolean {
        return this.idValidate.test(id);
    }
}

export class PasswordValidate {
    passwordValidate: RegExp = /^(?=.*?[a-zA-Z0-9])(?=.*?[#?!@$%^&*-]).{6,}$/

    validate(password: string): boolean {
        return this.passwordValidate.test(password);
    }
}

