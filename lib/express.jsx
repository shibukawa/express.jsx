/**
 * JSX wrapper for express
 *
 * [sample] This comment is document for class. You can use some HTML tags.
 *
 * @author shibukawa
 *
 * @see git@github.com:shibukawa/express.jsx.git
 */

import "js/nodejs.jsx";

/**
 * express serer generate class.
 */
native class express
{
    /**
     * <codeblock><pre>
     * import "express";
     *
     * class _Main {
     *     static function main(argv : string[]) : void
     *     {
     *         var app = express.create();
     *         app.get('/', function (req : Request, res : Response) : void {
     *             res.send('hello world');
     *         });
     *
     *         app.listen(3000);
     *     }
     * }
     * </pre></codeblock>
     */
    static function create() : Application;
    /**
     * Return middleware for serving files in specific folder:
     * <codeblock><pre>
     * // GET /javascripts/jquery.js
     * // GET /style.css
     * // GET /favicon.ico
     * app.use(express.static(node.__dirname + '/public'));
     * </pre></codeblock>
     */
    static function static_(path : string) : (Request, Response, ()->void) -> void;
} = '''
{
    create: require('express'),
    static_: require('express').static
}
''';

native __fake__ class RouteKey
{
    var name : string;
    var optional : boolean;
}

native __fake__ class Route
{
    var path : string;
    var method : string;
    var callbacks : Array.<(Request, Response) -> void>;
    var keys : RouteKey[];
    var regexp : RegExp;
    var params : Map.<string>;
}

native __fake__ class Application
{
    /**
     * Assigns setting <code>name</code> to <code>value</code>.
     * 
     * <codeblock><pre>
     * app.set('title', 'My Site');
     * app.get('title');
     * // => "My Site"
     * </pre></codeblock>
     */
    function set(name : string, value : variant) : void;

    /**
     * Get setting <code>name</code> value. 
     * <codeblock><pre>
     * app.get('title');
     * // => undefined
     * 
     * app.set('title', 'My Site');
     * app.get('title');
     * // => "My Site"
     * </pre></codeblock>
     */
    function get(name : string) : variant;

    /**
     * Set setting <code>name</code> to true. 
     * <codeblock><pre>
     * app.enable('trust proxy');
     * app.get('trust proxy');
     * // => true
     * </pre></codeblock>
     */
    function enable(name : string) : void;

    /**
     * Set setting <code>name</code> to <code>false</code>.
     * <codeblock><pre>
     * app.disable('trust proxy');
     * app.get('trust proxy');
     * // => false
     * </pre></codeblock>
     */
    function disable(name : string) : void;

    /**
     * Check if setting <code>name</code> is enabled.
     * <codeblock><pre>
     * app.enabled('trust proxy');
     * // => false
     *
     * app.enable('trust proxy');
     * app.enabled('trust proxy');
     * // => true
     * </pre></codeblock>
     */
    function enabled(name : string) : boolean;

    /**
     * Check if setting <code>name</code> is disabled.
     * <codeblock><pre>
     * app.disabled('trust proxy');
     * // => true
     * 
     * app.enable('trust proxy');
     * app.disabled('trust proxy');
     * // => false
     * </pre></codeblock>
     */
    function disabled(name : string) : boolean;

    /**
     * Conditionally invoke <code>callback</code> when <code>env</code> matches <code>app.get('env')</code>, aka
     * <code>process.env.NODE_ENV</cdoe>. This method remains for legacy reason, and is
     * effectively an <code>if</code> statement as illustrated in the following snippets. These
     * functions are <b>not</b> required in order to use <code>app.set()</code> and other configuration methods.
     * <codeblock><pre>
     * // all environments
     * app.configure(function(){
     *   app.set('title', 'My Application');
     * })
     *
     * // development only
     * app.configure('development', function(){
     *   app.set('db uri', 'localhost/dev');
     * })
     *
     * // production only
     * app.configure('production', function(){
     *   app.set('db uri', 'n.n.n.n/prod');
     * })
     * </pre></codeblock>
     * effectively sugar for:
     * <codeblock><pre>
     * // all environments
     * app.set('title', 'My Application');
     *
     * // development only
     * if ('development' == app.get('env')) {
     *   app.set('db uri', 'localhost/dev');
     * }
     *
     * // production only
     * if ('production' == app.get('env')) {
     *   app.set('db uri', 'n.n.n.n/prod');
     * }
     * </pre></codeblock>
     */
    function configure(env : string, callback : () -> void) : void;
    function configure(callback : () -> void) : void;

    /**
     * Use the given middleware <code>function</code>, with optional mount <code>path</code>, defaulting
     * to <code>"/"</code>.
     * <codeblock><pre>
     * import "express.jsx";
     *
     * class _Main {
     *   static function main(argv : string[]) : void
     *   {
     *     var app = express.create();
     *
     *     // simple logger
     *     app.use(function(req, res, next){
     *       console.log('%s %s', req.method, req.url);
     *       next();
     *     });
     *     
     *     // respond
     *     app.use(function(req, res, next){
     *       res.send('Hello World');
     *     });
     *     
     *     app.listen(3000);
     *   }
     * }
     * </pre></codeblock>
     * <p>The "mount" path is stripped and is <b>not</b> visible to the middleware <code>function.</code>
     * The main effect of this feature is that mounted middleware may operate
     * without code changes regardless of its "prefix" pathname.
     a </p>
     * <p>Here's a concrete example, take the typical use-case of serving files in <code>./public</code>
     * using the <code>express.static()</code> middleware:
     * </p>
     * <codeblock><pre>
     * // GET /javascripts/jquery.js
     * // GET /style.css
     * // GET /favicon.ico
     * app.use(express.static_(node.__dirname + '/public'));
     * </pre></codeblock>
     * <p>
     * Say for example you wanted to prefix all static files with <code>"/static"</code>, you could use
     * the "mounting" feature to support this. Mounted middleware functions are <b>not</b>
     * invoked unless the <code>req.url</code> contains this prefix, at which point it is stripped
     * when the function is invoked. This affects this function only, subsequent
     * middleware will see <code>req.url</code> with <code>"/static"</code> included unless they are mounted
     * as well.
     * </p>
     * <codeblock><pre>
     * // GET /static/javascripts/jquery.js
     * // GET /static/style.css
     * // GET /static/favicon.ico
     * app.use('/static', express.static_(node.__dirname + '/public'));
     * </pre></codeblock>
     * <p>
     * The order of which middleware are "defined" using <code>app.use()</code> is very
     * important, they are invoked sequentially, thus this defines middleware
     * precedence. For example usually <code>express.logger()</code> is the very
     * first middleware you would use, logging every request:
     * </p>
     * <codeblock><pre>
     * app.use(express.logger());
     * app.use(express.static_(node.__dirname + '/public'));
     * app.use(function(req, res){
     *   res.send('Hello');
     * });
     * </pre></codeblock>
     * <p>Now suppose you wanted ignore logging requests for static files, but to
     * continue logging routes and middleware defined after <code>logger()</code>, you would
     * simply move <code>static()</code> above:</p>
     * <codeblock><pre>
     * app.use(express.static_(node.__dirname + '/public'));
     * app.use(express.logger());
     * app.use(function(req, res){
     *   res.send('Hello');
     * });
     * </pre></codeblock>
     * <p>Another concrete example would be serving files from multiple directories,
     * giving precedence to <code>"./public"</code> over the others:</p>
     * <codeblock><pre>
     * app.use(express.static_(node.__dirname + '/public'));
     * app.use(express.static_(node.__dirname + '/files'));
     * app.use(express.static_(node.__dirname + '/uploads'));
     * </pre></codeblock>
     */
    function use(path : string, callback : (Request, Response, ()->void) -> void) : void;
    function use(callback : (Request, Response, ()->void) -> void) : void;

    /**
     * Register the given template engine <code>callback</code> as <code>ext</code> By default will
     * <code>require()</code> the engine based on the file extension. For example if you try to
     * render a <code>"foo.jade"</code> file Express will invoke the following internally,
     * and cache the <code>require()</code> on subsequent calls to increase performance.
     * <codeblock><pre>
     * app.engine('jade', node.require('jade')['__express'] as (string, variant, (Error, string)->void ) -> void);
     * </pre></codeblock>
     * For engines that do not provide <code>.__express</code> out of the box - or if you wish to
     * "map" a different extension to the template engine you may use this method.
     * For example mapping the EJS template engine to ".html" files:
     * <codeblock><pre>
     * app.engine('html', node.require('ejs')['renderFile'] as (string, variant, (Error, string)->void ) -> void); 
     * </pre></codeblock>
     * <p>In this case EJS provides a <code>.renderFile()</code> method with the same signature
     * that Express expects: <code>(path, options, callback)</code>, though note that it aliases
     * this method as <code>ejs.__express</code> internally so if you're using ".ejs" extensions
     * you dont need to do anything.</p>
     * <p>Some template engines do not follow this convention, the
     * <a href="https://github.com/visionmedia/consolidate.js">consolidate.js</a> library was
     * created to map all of node's popular template engines to follow this convention,
     * thus allowing them to work seemlessly within Express.</p>
     * <codeblock><pre>
     * var engines = require('consolidate');
     * app.engine('haml', engines.haml);
     * app.engine('html', engines.hogan);
     * </pre></codeblock>
     */
    function engine(ext : string, callback : (string, variant, (Error, string)->void ) -> void) : void;

    /**
     * 
     * <codeblock><pre>
     * </pre></codeblock>
     */
    function param(callback : (Request, Response, (Error)->void, string) -> void) : void;
    function param(callback : (Request, Response, ()->void, string) -> void) : void;

    /**
     * <codeblock><pre>
     * </pre></codeblock>
     */
    function all(path : string, callback : Array.<(Request, Response) -> void>) : void;
    function all(path : string, ...callback : (Request, Response) -> void) : void;
    function get(path : string, callback : Array.<(Request, Response) -> void>) : void;
    function get(path : string, ...callback : (Request, Response) -> void) : void;
    function put(path : string, callback : Array.<(Request, Response) -> void>) : void;
    function put(path : string, ...callback : (Request, Response) -> void) : void;
    function post(path : string, callback : Array.<(Request, Response) -> void>) : void;
    function post(path : string, ...callback : (Request, Response) -> void) : void;
    function delete(path : string, callback : Array.<(Request, Response) -> void>) : void;
    function delete(path : string, ...callback : (Request, Response) -> void) : void;

    var locals : Map.<variant>;

    /**
     * 
     * <codeblock><pre>
     * </pre></codeblock>
     */
    function render(view : string, data : variant, callback : (Error, string) -> void) : void;
    function render(view : string, callback : (Error, string) -> void) : void;
    /**
     * 
     * <codeblock><pre>
     * </pre></codeblock>
     */
    var routes : Map.<Route[]>;

    /** 
     * <codeblock><pre>
     * </pre></codeblock>
     */
    function listen (port : int) : void;
    /**
     * 
     * <codeblock><pre>
     * </pre></codeblock>
     */
    /**
     * 
     * <codeblock><pre>
     * </pre></codeblock>
     */
}

native __fake__ class File
{
    var size : int;
    var path : string;
    var name : string;
    var type : string;
    var hash : boolean;
    var lastModifiedData : boolean;
    var _writeStream : variant;
    var length : int;
    var filename : string;
    var mime : string;
}

native __fake__ class RequestAccepted
{
    var value : string;
    var quality : int;
    var type : string;
    var subtype : string;
}

native __fake__ class Request
{
    var params : Map.<string>;
    var query : Map.<string>;
    var body : Map.<variant>;
    var files : Map.<File>;
    var route : Route;
    var cookies : Map.<string>;
    var signedCookies : Map.<string>;
    var accepted : RequestAccepted[];
    var ip : string;
    var ips : string[];
    var path : string;
    var host : string;
    var fresh : boolean;
    var stale : boolean;
    var xhr : boolean;
    var protocol : string;
    var secure : boolean;
    var subdomains : string[];
    var originalUrl : string;
    var acceptedLanguages : string[];
    var acceptedCharsets : string[];

    function param(name : string) : string;
    function get(name : string) : string;
    function accept(...types : string) : void;
    function accept(types : string[]) : void;
    function is(type : string) : boolean;
    function acceptsCharset(charset : string) : boolean;
    function acceptsLanguage(lang : string) : boolean;
}

native __fake__ class Response
{
    var charset : string;

    function status(code : int) : Response;
    function set(field : string, value : string) : Response;
    function set(fields : Map.<string>) : Response;
    function get(field : string) : string;
    function cookie(name : string, value : string) : Response;
    function cookie(name : string, value : string, options : Map.<variant>) : Response;
    function clearCookie(name : string) : Response;
    function clearCookie(name : string, options : Map.<variant>) : Response;
    function redirect(status : int, url : string) : void;
    function redirect(url : string) : void;
    function location(loc : string) : Response;
    function send(status : int) : Response;
    function send(status : int, body : string) : Response;
    function send(status : int, body : variant) : Response;
    function send(status : int, body : Buffer) : Response;
    function send(body : string) : Response;
    function send(body : variant) : Response;
    function send(body : Buffer) : Response;
    function json(status : int, body : variant) : Response;
    function json(body : variant) : Response;
    function jsonp(status : int, body : variant) : Response;
    function jsonp(body : variant) : Response;
    function type(type : string) : Response;
    function format(format : Map.<()->void>) : Response;
    function attachment() : Response;
    function attachment(path : string) : Response;
}
