var Express = require('express');
var multer = require('multer');
var path = require('path');
var sendToAuthAjax = require('./sendToAuthAjax.json');
var dragModifyAjax = require('./dragModifyAjax.json');


var app = new Express;
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

app.post('/dragModifyAjax', (req, res) => {
    res.charset = 'utf-8';
    res.send(dragModifyAjax)
})

app.listen(8898)