const fs = require("fs");
const md5 = require("blueimp-md5");
const dataPath = process.cwd() + "/data.json";

function edit(editFunc = (json) => {}) {
    const json = read();
    editFunc(json);
    fs.writeFileSync(dataPath, JSON.stringify(json));
}

function read() {
    const str = fs.readFileSync(dataPath, {
        encoding: "utf-8"
    });
    return JSON.parse(str);
}

const DEFAULT_DATA_SOURCE = {
    register: (usr, pw) => {
        if(DEFAULT_DATA_SOURCE.exists(usr)) {
            return "User is already registered!";
        } else if(pw.length === 0) {
            return "Password can't be empty!";
        }
        edit((json) => json[usr] = {
            hash: md5(pw),
            tokens: [
                Math.random().toString(36).substring(3,9)
            ]
        });
    },
    login: (usr, pw) => {
        if(!DEFAULT_DATA_SOURCE.exists(usr)) {
            return "User is not registered!";
        }
        if(!md5(pw) === read()[usr].hash) {
            return "Password is incorrect!";
        }
    },
    exists: (usr) => {
        return Object.keys(read()).includes(usr);
    },
    getTokens: (usr) => {
        if(!DEFAULT_DATA_SOURCE.exists(usr)) {
            return "User is not registered!";
        }
        return read()[usr].tokens;
    }
}

module.exports = {
    DATA_SOURCE: DEFAULT_DATA_SOURCE
}