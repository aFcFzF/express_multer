(_ => {
    btn1 = $('.all').click(() => {
        $.post('/sendToAuthAjax', null)
        .then(data => {
            console.log(data);
        })
    });

    btn2 = $('.drag').click(() => {
        $.post('/dragModifyAjax', {itemkey: 0, itemlocation: '{"empty": "yes"}'})
        .then(data => {
            console.log(data);
        })
    });

    btn3 = $('.save').click(() => {
        // $.post('https://gitlab.jsplayer.cn/finishEditAjax', null)
        // .then(data => {
        //     console.log(data);
        // })
        $.ajax({
            url: 'https://gitlab.jsplayer.cn/finishEditAjax',
            type: 'post',
            data: {
                type1: 'string',
                type2: 'number',
                type3: 'boolean',
                type4: 'null',
                type5: 'undefined',
                type6: 'symbol'
            },
            contentType: 'application/x-www-form-urlencoded'
        })
        .then(data => console.log('结果是: ', data));
    });

    btn4 = $('.serverReq').click(() => {
        $.ajax({
            url: '/serverReq',
            type: 'post',
            data: JSON.stringify({action: 'serverReq'}),
            contentType: 'application/json'
        })
        .then(data => {
            console.log(data);
        })
    });
})();