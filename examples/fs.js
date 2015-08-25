"use strict";

var patcher = require("../");
var fs = require('fs');
var diff = fs.readFileSync("./diff.txt").toString();

patcher.patch(
    diff,
    function readFile(filename, callback) {
        fs.readFile("./target/" + filename, function (err, data) {
            callback(err, data);
        });
    },
    function writeFile(filename, content, callback) {
        fs.writeFile("./dest/" + filename, content, function (err, data) {
            callback(err, data);
        });
    },
    function unlink(filename, callback) {
        fs.unlink("./dest/" + filename, function (err) {
            callback(err);
        });
    }
);
