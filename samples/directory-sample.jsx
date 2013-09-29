import "console.jsx";
import "express.jsx";

/**
 * Run this sample at express.jsx root folder (it contains package.json).
 */
class _Main {
    static function main(argv : string[]) : void
    {
        var app = express.create();

        app.use(express.directory('samples'));
        app.use(express.static_('samples'));

        console.log("running at port 3000");
        app.listen(3000);
    }
}
