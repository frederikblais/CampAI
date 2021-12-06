export type iUsers = {
    name: string
    password: string
}

export class User implements iUsers {
    name: string;
    password: string;

    constructor(args) {
        this.name = args.name;
        this.password = args.password;
    }
}