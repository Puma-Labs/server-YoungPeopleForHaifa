function digit(num) {
    return num.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')
}

function toStr(num){
    num = String(num);
    num = num.replace(/\d(?=(?:\d{3})+(?!\d))/g, '$&,');
    return num;
}

module.exports = {digit, toStr}
