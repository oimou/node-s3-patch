"use strict";

var parse = require('parse-diff');

exports.patch = function (diff, readFile, writeFile, unlink, finish) {

    var files = parse(diff);
    var counter = files.length;

    files.forEach(function(file) {
        var from, to;

        if (file.deleted) {
            unlink(file.from, function (err) {
                countDown();
            });

            return;
        }

        if (file.new) {
            from = null;
            to = [];

            _patch();

            return;
        }

        readFile(file.from, function (err, data) {
            from = data.toString().split("\n");
            to   = data.toString().split("\n");

            _patch();
        });

        function _patch() {
            file.chunks.forEach(function (chunk) {
                insertSpaceAfter(to, chunk.oldStart, chunk.newLines - chunk.oldLines);

                chunk.changes.forEach(function (c) {
                    switch (c.type) {
                    case "normal":
                        to[c.ln2 - 1] = c.content.substr(1);
                        break;

                    case "add":
                        to[c.ln - 1]  = c.content.substr(1);
                        break;
                    }
                });
            });

            writeFile(file.to, to.join("\n"), function (err) {
                countDown();
            });
        }

        function countDown() {
            counter--;

            if (!counter) {
                finish && finish();
            }
        }
    });

};

function insertSpaceAfter(arr, index, len) {
    var param = [index, 0];

    for (var i = 0; i < len; i++) {
        param.push(null);
    }

    arr.splice.apply(arr, param);

    return arr;
}
