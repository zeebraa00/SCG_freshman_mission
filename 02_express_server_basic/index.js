const express = require("express");
const app =  express();

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/' + 'index.html');
    // __dirname : 현재폴더의 절대경로 반환
});

app.listen(80, () => console.log('Server listen on port 80'));