const config = require("../config.json");
const fs = require("fs");

function checkFuncs(obj) {
    return (typeof obj.register) === "function"
    && (typeof obj.login) === "function"
    && (typeof obj.exists) === "function";
}

function load() {
    const ds = config["data-source"];
    try {
        const path = `../data-sources/${ds}/index.js`;
        if(fs.existsSync(path)) {
            const dsObj = require(path);
            if(checkFuncs(dsObj)) {
                return dsObj;
            }
        }
    } catch(e) {
        console.log(e);
    }
    return undefined;
}

module.exports = load;