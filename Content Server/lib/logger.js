const fs = require('fs');
const path = require('path');

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
        this.createWriteStreams();
    }

    createWriteStreams() {
        const d = new Date();
        const dateString = d.toDateString().split(" ").join(".");
        const logDir = `logs/${dateString}`;
        if (!fs.existsSync(logDir)){
            fs.mkdirSync(logDir, {recursive: true});
        }
        this.logs = {
            infoLog: fs.createWriteStream(path.join(logDir, `${dateString}_info.log`), {flags:'a'}),
            warningLog: fs.createWriteStream(path.join(logDir, `${dateString}_warning.log`), {flags:'a'}),
            errorLog: fs.createWriteStream(path.join(logDir, `${dateString}_error.log`), {flags:'a'}),
            debugLog: fs.createWriteStream(path.join(logDir, `${dateString}_debug.log`), {flags:'a'}),
            allLog: fs.createWriteStream(path.join(logDir, `${dateString}_all.log`), {flags:'a'}),
            currentLogDate: d.getDate()
        }
    }

    getTime() {
        const d = new Date();
        const minutes = ('0'+d.getMinutes()).slice(-2);
        const hours = ('0'+d.getHours()).slice(-2);
        return `${hours}:${minutes}`;
    }

    writeToFile(message, logLevel) {
        const date = new Date().getDate();
        if (date != this.logs.currentLogDate) {
            this.createWriteStreams();
        }

        const time = this.getTime()
        if (logLevel === LEVEL.INFO) {
            this.logs.infoLog.write(`${time} > ${message}\n`);
        } else if (logLevel === LEVEL.WARNING) {
            this.logs.warningLog.write(`${time} > ${message}\n`);
        } else if (logLevel === LEVEL.ERROR) {
            this.logs.errorLog.write(`${time} > ${message}\n`);
        } else if (logLevel === LEVEL.DEBUG) {
            this.logs.debugLog.write(`${time} > ${message}\n`);
        }
        this.logs.allLog.write(`${time} > ${message}\n`);
    }
    
    INFO(message) {
        this.writeToFile(message, LEVEL.INFO);
        if (LEVEL.INFO <= this.logLevel) {
            console.log(`${COLOR.CYAN}${this.getTime()} > ${message}${COLOR.RESET}`);
        }
    }

    WARNING(message) {
        this.writeToFile(message, LEVEL.WARNING);
        if (LEVEL.WARNING <= this.logLevel) {
            console.log(`${COLOR.YELLOW}${this.getTime()} > WARNING: ${message}${COLOR.RESET}`);
        }
    }

    ERROR(message) {
        this.writeToFile(message, LEVEL.ERROR);
        if (LEVEL.ERROR <= this.logLevel) {
            console.log(`${COLOR.RED}${this.getTime()} > ${message}${COLOR.RESET}`);
        }
    }

    DEBUG(message) {
        this.writeToFile(message, LEVEL.DEBUG);
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

module.exports = Logger;