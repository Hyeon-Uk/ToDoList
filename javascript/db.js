var http = require('http');
var url = require('url');

http.createServer((request, response) => {
    const _url=request.url;
    var pathname=url.parse(_url,true).pathname;
    if(pathname=='/'){
    response.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <form action="/db" method="POST">
                <input type="text" name="ip">
                <br/>
                <input type="submit">
            </form>
        </body>
        </html>
        `)
    }
    else if(pathname=='/db'){
        response.writeHead(200);
        response.end("welcome!");
    }
    else{
        response.writeHead(404);
        response.end();
    }
}).listen(8000);

