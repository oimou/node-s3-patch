"use strict";

var expect = require("chai").expect;

describe("virtual-patch", function () {
    var patcher = require("../");

    var diffStr = [
        "diff --git a/z b/z",
        "index 0000000..0000000 100777",
        "--- a/z",
        "+++ b/z",
        "@@ -1,3 +1,3 @@",
        "-a",
        "+z",
        " b",
        " c",
        "diff --git a/x b/x",
        "deleted file mode 100777",
        "index 0000000..0000000"
    ].join("\n");

    var pass = function () {
        arguments[arguments.length - 1](null, "");
    };

    it("#readFile", function (done) {
        patcher.patch(
            diffStr,

            function (filename, cb) {
                expect(filename).to.equal("z");
                cb(null, "");
            },

            pass,

            pass,

            done
        );
    });

    it("#writeFile", function (done) {
        patcher.patch(
            diffStr,

            pass,

            function (filename, content, cb) {
                expect(filename).to.equal("z");
                expect(content).to.be.a("string");
                cb(null);
            },

            pass,

            done
        );
    });

    it("#unlink", function (done) {
        patcher.patch(
            diffStr,

            pass,

            pass,

            function (filename, cb) {
                expect(filename).to.equal("x");
                cb(null);
            },

            done
        );
    });
});
