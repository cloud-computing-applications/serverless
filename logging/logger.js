const winston = require('winston');

const timezone = () => {
    return new Date().toISOString();
}

const capitalizeLevels = winston.format(info => {
    info.severity = info.level.toUpperCase();
    delete info.level;
    return info;
})

const Logger = winston.createLogger({
  format: winston.format.combine (
    winston.format.timestamp({ format: timezone }),
    capitalizeLevels(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console({ format: winston.format.json() })]
});

module.exports = Logger;