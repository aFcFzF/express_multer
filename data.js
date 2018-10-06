const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const {urlencoded, text, json} = bodyParser;
app.use(urlencoded({extended: false}));
app.use(json());
app.use(text());


app.options('/dataAjax', (req, res) => {
    res.header({
        'access-control-allow-methods': 'get,post,put,delete'
    });
    res.status(200);
});

app.post('/dataAjax', (req, res) => {
    res.set('access-control-allow-origin', '*');
    const r = _ => req.body.auth ? res.send({status: 0, msg: 'success'}) : res.send({status: 1, msg: '未通过验证'});
    setTimeout(r ,30000);
});

app.get('/', (req, res) => {
    res.type('html');
    const html = `
        <h2>没错，我是data服务器</h2>
        <script src="https://cdn.bootcss.com/jquery/1.8.2/jquery.js"></script>
    `;
    res.send(html);
});

app.listen(3001);
console.info('server runing in 3001');