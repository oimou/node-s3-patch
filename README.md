# virtual-patch

virtual-patch is Node library which allows you to patch files on any system
by providing abstract CRUD APIs. This is designed especially for Amazon S3.

## How to install

```
$ npm install virtual-patch
```

## How to use

```
var patcher = require("virtual-patch");
var diff = "diff string here";

patcher.patch(
    // pass diff string of git style
    diff,

    // read a file of given filename
    function readFile(filename, cb) {
        someAsyncRead(filename, function (err, data) {
            cb(err, data);
        });
    },

    // write content to a file of given filename
    function writeFile(filename, content, cb) {
        someAsyncWrite(filename, content, function (err) {
            cb(err);
        });
    },

    // remove a file of given filename
    function unlink(filename, cb) {
        someAsyncUnlink(filename, function (err) {
            cb(err);
        });
    }
);
```

## Examples

See [examples](examples).

## License

MIT
