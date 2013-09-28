express.jsx
===========================================

Synopsis
---------------

JSX wrapper for express web application server.

Code Example
---------------

```js
import "express.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        var app = express.create();
        app.get('/', function (req : Request, res : Response) : void {
            res.send('hello world');
        });

        app.listen(3000);
    }
}
```

Installation
---------------

```sh
$ npm install express --save
$ npm install express.jsx --save
```

Add express.jsx's `lib` folder to search path.

API Reference
------------------

Almost all APIs are same as origin API (http://expressjs.com/api.html).

Only `express()` has different API:

* `express.create()`

  Creates `Application` object.

Development
-------------

## Repository

* Repository: git@github.com:shibukawa/express.jsx.git
* Issues: https://github.com/shibukawa/express.jsx.git/issues

## Run Test

```sh
$ grunt test
```

## Build

```sh
# Generate API reference
$ grunt doc

# Build application or library for JS project
$ grunt build
```

Author
---------

* shibukawa / yoshiki@shibu.jp

License
------------

MIT

Complete license is written in `LICENSE.md`.
