const http = require("http");
const fs = require("fs");

const server = http.createServer((req,res) => {
    fs.readFile('index.html', (e,data) => {
        res.writeHead(200);
        res.end(data);
    })
})

server.listen(80, () => console.log('Server is running on port 80'));