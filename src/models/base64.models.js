export default class base64string {
    constructor(string) {
        if (string) {
            this.string = string;
            const matches = this.string.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                response = {};
            this.is_valid = matches & matches.length == 3;
            if (this.is_valid) {
                this.data = matches[2];
                this.type = matches[1].split('/')[0];
                this.extension = matches[1].split('/')[1]
            }
        } else {
            this.is_valid = false;
        }
    }

    toString() {
        return this.string;
    }
}