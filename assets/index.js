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
        $.post('/finishEditAjax', null)
        .then(data => {
            console.log(data);
        })
    })
})();