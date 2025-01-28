"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var port = process.env.PORT || 3333;
var app = (0, express_1.default)();
app.get("/", function (req, res) {
    res.json({ msg: "Ola willian" });
});
app.listen(port, function () {
    console.log("Server is Running on port: ".concat(port));
});
