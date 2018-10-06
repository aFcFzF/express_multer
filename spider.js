const request = require('request');
const url = 'http://www.ziroom.com/z/nl/duanzu/d23008611-kl-m1.html';

const get = p =>
    Reflect.construct(Promise, [(r, j) => {
        request.get(url + '?p=' + p, (err, resp, body) => {
            err && j(err);
            if (!err && resp.statusCode === 200) {
                r(body);
            }
        });
    }]);

const getData = async function (pages) {
    const ps = [];
    for (let p of pages) {
        ps.push(await get(p));
    }
    return ps;
};

getData([1, 2])
.then(data => console.log(data));
