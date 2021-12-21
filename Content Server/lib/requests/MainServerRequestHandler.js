const db = require('../db');
const crypto = require('crypto');

class MainServerRequestHandler {

    constructor() {
    }

    #generateRequestId() {
        const length = 50;
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0, length);   /** return required number of characters */
    }

    async #getUniqueRequestId() {
        let id = this.#generateRequestId();
        while (await this.requestIdExist(id)) {
            id = this.#generateRequestId();
        }
        return id;
    }

    removeExpectedRequest(id) {
        db.none(`DELETE FROM main_server_requests WHERE id = $1`, [id]);
    }

    requestIdExist(id) {
        return new Promise(resolve => {
            db.any(`SELECT * FROM main_server_requests WHERE id = $1`, [id]).then(result => {
                resolve(result.length > 0);
            });
        });
    }

    async addExpectedRequest() {
        const id = await this.#getUniqueRequestId();
        await db.none(`INSERT INTO main_server_requests (id) VALUES ($1)`, [id]);
        setTimeout(this.removeExpectedRequest, 5000, id);
        return id;
    }
}

module.exports = MainServerRequestHandler;