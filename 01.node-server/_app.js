const http = require('http');

const PORT= 8080;

const server = http.createServer((req, res)=>{
    console.log(req.url);
    console.log(req.method);
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Authorization', 'Bearer Token')

    // res.writeHead(201, {'Content-type':'text/html', 'Authorization':'Bearer Token'})
    res.write('<h1>Hello world !</h1>')
    res.write('<p>Another paragraph </p>')
    res.end()
})

server.listen(PORT, console.log(`server is running on port ${PORT}`))