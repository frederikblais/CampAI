export type iChat = {
    sender: string;
    text: string;
    sentOn: Date;
}

export class Chat implements iChat {
    sender: string;
    text: string;
    sentOn: Date;

    constructor(args) {
        this.sender = args.sender;
        this.text = args.text;
        this.sentOn = args.sentOn;
    }
}