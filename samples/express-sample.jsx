import "console.jsx";
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
