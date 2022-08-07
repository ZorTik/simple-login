const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const defaults = require("./defaults");
const config = require("../config.json");
const dsName = config["data-source"]
const loadDataSource = require("./loadDataSource");
let database = loadDataSource();

if(database === undefined) {
    database = defaults.DATA_SOURCE;
}

database.name = dsName;

console.log("Loaded data source " + dsName);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

const loginRouter = express.Router();

const loginRequestChecker = require("./middleware/loginRequestChecker");

loginRouter.use(loginRequestChecker);

function handleResponse(req, res, err) {
    console.log("Handle");
    const body = {
        success: err == null,
        message: err || "Success"
    };
    if(err === null) {
        body.token = database.getTokens(req.body.username);
    }
    res.send(JSON.stringify(body));
}

loginRouter.post("/register", (req, res) => {
    const body = req.body;
    const err = database.register(body.username, body.password);
    handleResponse(req, res, err);
});

loginRouter.post("/login", (req, res) => {
    const body = req.body;
    const err = database.login(body.username, body.password);
    handleResponse(req, res, err);
});

loginRouter.get("/exists/:username", (req, res) => {
    const username = req.params.username;
    res.send(JSON.stringify({
        exists: database.exists(username)
    }));
});

app.use("/auth", loginRouter);

app.listen(config.port, () => {
    console.log(`Listening on ${config.port}!`);
});