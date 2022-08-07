const mw = (req, res, next) => {
    console.log("New request!");
    if(req.body.username === undefined ||
        (req.path !== "/exists" && req.body.password === undefined)) {
        res.status(400);
        return;
    }
    console.log("next");
    next();
};

module.exports = mw;