var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

(function (root, port) {

    //
    // status code message map
    //
    var message = {
        200: "OK",
        404: "Not Found",
        500: "Internal Server Error",
        501: "Note Implemented"
    };

    //
    // mime type map
    //
    var mime = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".pdf": "text/javascript",
        ".bcmap": "application/octet-stream"
    };

    //
    // send requested file
    //
    function sendFile(req, res, filePath) {

        var data = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': mime[path.extname(filePath)] });
        res.end(data);

    }

    //
    // send error status
    //
    function sendError(req, res, statusCode) {
        res.writeHead(statusCode, {"Content-Type": "text/html"});
        res.write("<!DOCTYPE html><html><body><h1>" + message[statusCode] + "</h1></body></html>");
        res.end();
        console.log("<- " + message[statusCode] + ": " + req.method + " " + req.url);
    }

    //
    // request handler
    //
    function handleRequest(req, res, filePath) {

        fs.stat(filePath, function (err, stats) {
            if (err) {
                if ((/ENOENT/).test(err.message)) return sendError(req, res, 404);
                else return sendError(req, res, 500);
            }

            if (stats.isDirectory())
                return handleRequest(req, res, path.join(filePath, "index.html")); // try to handle request with index.html file
            else
                return sendFile(req, res, filePath);
        });
    }

    //
    // create and start the server
    //
    http.createServer(function (req, res) {

        var pathName = url.parse(req.url).pathname;
        console.log("-> " + req.method + " " + pathName);

        if (req.method === "GET")
            handleRequest(req, res, path.join(root, pathName));
        else
            sendError(req, res, 501);

    }).listen(port);

    //
    // initiation log
    //
    console.log("Http Server running at http://localhost:" + port + "/ (" + root + ")");

}(process.argv[2] || "./", process.argv[3] || "8888"));