"use strict";

var parser = require("./lib/parser");
var fs = require('fs');
var diff = fs.readFileSync("./diff.txt").toString();

parser.parse(
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
