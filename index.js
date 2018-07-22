var Express = require('express');
var multer = require('multer');
var path = require('path');
var sendToAuthAjax = require('./sendToAuthAjax.json');
var bodyParser = require('body-parser');

var app = new Express;
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(Express.static(path.join(__dirname, 'assets')));

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

app.get('/', (req, res) => {
    res.render('index', {title: 'test', content: '智能核验'})
});



app.listen(8898)