export default class Account {
    constructor(vals, uid) {
       // console.log(vals)
        this.first_name = vals[1];
        this.last_name = vals[2];
        this.email = vals[0];
        this.tables = vals[3];
        this.uid = uid;
    }
}