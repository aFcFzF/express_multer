var http = require('http');
var Express = require('express');
var multer = require('multer');
var path = require('path');
var sendToAuthAjax = require('./sendToAuthAjax.json');
var bodyParser = require('body-parser');
var cookie = require('cookie-parser');
var socketio = require('socket.io');
var quest = require('request');


var app = new Express;
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text());
app.use(Express.static(path.join(__dirname, 'assets')));
app.use(cookie());

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
    console.log('user connected');

    socket.on('disconnect', () => {
        console.log('a user go out');
    });

    socket.on('message', obj => {
        setTimeout(_ => {
            io.emit('message', {msg: obj.msg + '呵呵呵呵呵呵'});
        }, 3000);
    });
});

app.get('/imRoom', (req, res) => {
    res.render('socket', {title: 'socket聊天室'});
});

var storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.resolve(__dirname, 'uploads'));
    },
    filename(req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({storage}).single('lice_pic');

app.post('/sendToAuthAjax', function(req, res){
    upload(req, res, function(err) {
        if (err) {
            console.log('错误: ', err);
        }
        // return res.sendStatus(412);
        console.log('请求: ', req.body.callbackkey)
        res.set('access-control-allow-origin', '*');
        res.charset = 'utf-8';
        setTimeout(() => {
            res.send(sendToAuthAjax)
        }, 1000);
    })
});

let i = 1;

app.post('/dragModifyAjax', (req, res) => {
    const ret = {};
    const {itemkey, itemlocation} = req.body;
    const location = JSON.parse(itemlocation);
    // Object.keys(location).forEach(e => e === 'width' ||　e === 'height' ? location[e] = ~~(Math.random() * 30) + +location[e] : location[e]);
    ret[itemkey] = {
        name: itemkey + '的名',
        words: '返回的识别字符 （拖拽识别次数： ' + i++ + ' 次）',
        location
    };

    res.charset = 'utf-8';
    res.set('cache-control', 'max-age=' + 24 * 3600)
    setTimeout(() => {
        res.send({
            status: 0,
            msg: '不正常了',
            data: ret
        })
    }, 1)
})

app.post('/finishEditAjax', (req, res) =>{
    console.log(req);
    res.set('access-control-allow-origin', '*');
    res.send({
        status: 0,
        msg: '不行啊'
    })
})

app.post('/sendToAuditAjax', (req, res) =>{
    res.send({
        status: 0,
        msg: '不行啊'
    })
});

app.post('/serverReq', (req, res) => {
    quest.post('https://gitlab.jsplayer.cn/sendToAuditAjax', {action: 'quest'}, (err, serverRes) => {
        res.send(JSON.parse(serverRes.body));
    });
});

app.get('/', (req, res) => {
    res.cookie('name', 'baidu', {
        expires: new Date(Date.now() + 3600),
        // httpOnly: true
        // secure: true
    })
    res.render('index', {title: 'test', content: '智能核验'})
});

server.listen(8898);