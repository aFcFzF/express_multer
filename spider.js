/**
 * @file: spider.js
 * @author: jialipeng
 * @File Created: Sunday, 7th October 2018 12:06:01 am
 */

const request = require('request');
const {load: $load} = require('cheerio');

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const init = [
    '昌平京投银泰公园悦府',
    '昌平金榜园',
    '昌平金域华府二期',
    // '昌平云趣园一区',
    '昌平天通西苑三区',
    '昌平佳运园二期',
    '昌平天通苑东三区',
    '昌平名流花园',
    '昌平天通苑东二区',
    '昌平西湖新村',
    '昌平天鑫家园'
];

const url = 'http://www.ziroom.com/z/nl/duanzu/d23008611-kl-m1.html';

const get = (p, onlyPage) =>
    Reflect.construct(Promise, [(r, j) => {
        const u = onlyPage ? url : url + '?p=' + p;
        request.get(u, (err, resp, body) => {
            err && j(err);
            if (!err && resp.statusCode === 200) {
                let $ = $load(body);
                if (onlyPage) {
                    let count = 1;
                    const $page = $('#page > span');
                    $page.each((_, e) => {
                        const re = /共(\d+)页/;
                        const text = $(e).text();
                        if (re.test(text)) {
                            count = +text.match(re)[1];
                            return false;
                        }
                    });
                    r(count);
                }
                else {
                    const info = $('.xuanPic .xuanPicbox .t1').map((i, e) => $(e).text().replace('房屋地址：', ''));
                    r(info.toArray());
                }
            }
        });
    }]);

const getData = async function () {
    const n = await get(url, true);
    // console.log('几页? ', n);
    const ps = [];
    let i = 0;
    while (i++ < n) {
        ps.push(await get(i));
    }
    return ps;
};

const diff = (prev, curr) => {
    const f = [];
    for (let item of curr) {
        prev.indexOf(item) === -1 && (f.push(item));
    }
    return f;
};


const smtpTrans = nodemailer.createTransport(smtpTransport({
    service: config.service,
    auth: {
        user: config.user,
        pass: config.pass
    }
}));

const sendMail = function (recipient, subject, html) {

    smtpTrans.sendMail({

        from: config.user,
        to: recipient,
        subject: subject,
        html: html

    }, function (error, response) {
        if (error) {
            return console.log('错误：', error);
        }
        console.log('发送成功');
    });
};
// mail end

const check = _ => {
    getData()
    .then(args => {
        let rooms = args.reduce((a, b) => a.concat(b), []);
        rooms = [...new Set(rooms)];
        const add = diff(init, rooms);
        if (add.length > 0) {
            sendMail('9301462@qq.com', '有新房了', (new Date()).toLocaleString() + ' --- ' + JSON.stringify(add));
            init.push(...add);
        }
    });
};

setInterval(check, 3000);

