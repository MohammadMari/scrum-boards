class Account {
    constructor(first_name, last_name, email, password_hash, salt) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password_hash = password_hash;
        this.salt = salt;
    }

    toString() {
        return this.first_name + " " + this.last_name + "\n" +
                    this.email + ", " + this.password_hash + ", " + this.salt;
    }
}

// Firestore data converter
const accountConverter = {
    toFirestore: (account) => {
        return {
            first_name: account.first_name,
            last_name: account.last_name,
            email: account.email,
            password_hash: account.password_hash,
            salt: account.salt
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Account(data.first_name, data.last_name, data.email, data.password_hash, data.salt);
    }
};

export {accountConverter};