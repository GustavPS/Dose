const Browser = require('./browser');

class DefaultBrowser extends Browser {
    constructor() {
        super(0, [], [], "unknown");
    }
}

module.exports = DefaultBrowser;