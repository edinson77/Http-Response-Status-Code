var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

function send404(response) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.write('Error 404: Resource not found.');
    response.end();
}

var mimeLookup = {
    '.js': 'application/javascript',
    '.html': 'text/html',
    '.css': 'text/css'
};

var server = http.createServer(function (req, res) {
    console.log(req.url, req.method)
	

  var q = url.parse(req.url, true).query;
  
  if  (q.status!==undefined){
	  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(q.status+" " +q.message); 
  res.write(	'  <a href="/">Go Back</a>' ); 
  res.end(); //end the response
	  
	  
	 
	  
  }
  
  else {

    if (req.method == 'GET') {
        var fileurl = '/index.html';
        if (req.url == '/')
            fileurl = '/index.html';
        else
            fileurl = req.url;
        var filepath = path.resolve('./public' + fileurl);

        var fileExt = path.extname(filepath);
        var mimeType = mimeLookup[fileExt];
        if (!mimeType) {
            send404(res);
            return;
        }
        fs.exists(filepath, function (exists) {
            if (!exists) {
                send404(res);
                return;
            };
            res.writeHead(200, { 'content-type': mimeType });
            fs.createReadStream(filepath).pipe(res);
        });
    } else {
        send404(res);
    }
	}
}).listen(3030);

console.log('server running on port 3030'); 




