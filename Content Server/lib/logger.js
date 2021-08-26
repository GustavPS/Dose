const LEVEL = {
    INFO: 0,
    WARNING: 1,
    ERROR: 2,
    DEBUG: 3
}

const COLOR = {
    BLACK: "\x1b[30m",
    RED: "\x1b[31m",
    GREEN: "\x1b[32m",
    YELLOW: "\x1b[33m",
    BLUE: "\x1b[34m",
    MAGENTA: "\x1b[35m",
    CYAN: "\x1b[36m",
    WHITE: "\x1b[37m",
    RESET: "\x1b[0m"
}


class Logger {
    constructor() {
        this.logLevel = LEVEL.ERROR;
    }

    getTime() {
        const d = new Date();
        return `${d.getHours()}:${d.getMinutes()}`;
    }
    
    INFO(message) {

        if (LEVEL.INFO <= this.logLevel) {
            console.log(`${COLOR.CYAN}${this.getTime()} > ${message}${COLOR.RESET}`);
        }
    }

    WARNING(message) {
        if (LEVEL.WARNING <= this.logLevel) {
            console.log(`${COLOR.YELLOW}${this.getTime()} > ${message}${COLOR.RESET}`);
        }
    }

    ERROR(message) {
        if (LEVEL.ERROR <= this.logLevel) {
            console.log(`${COLOR.RED}${this.getTime()} > ${message}${COLOR.RESET}`);
        }
    }

    DEBUG(message) {
        if (LEVEL.DEBUG <= this.logLevel) {
            console.log(`${COLOR.MAGENTA}${this.getTime()} > ${message}${COLOR.RESET}`);
        }
    }
}

class Singleton {
    constructor () {
        if (!Singleton.instance) {
            Singleton.instance = new Logger();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;