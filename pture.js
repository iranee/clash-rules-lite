// 加油卡请求，自动保存 Cookie 和 user-sign
function xorDecode(str) {
    if (!str) return '';
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += String.fromCharCode(str.charCodeAt(i) ^ 0x58);
    }
    return result;
}

const headers  = $request.headers;
const body     = $request.body || '';
const cookie   = headers['Cookie'] || headers['cookie'] || '';
const userSign = headers['user-sign'] || '';
const decoded  = xorDecode(body);

const match  = decoded.match(/cardNo=(\d+)/);
const cardNo = match ? match[1] : '';

if (cookie && userSign) {
    if (cardNo === '1000114400032535985') {
        $persistentStore.write(cookie,   'sinopec_cookie_card1');
        $persistentStore.write(userSign, 'sinopec_sign_card1');
        console.log('✅ 已保存油卡1 token');
    } else if (cardNo === '1000114400031361307') {
        $persistentStore.write(cookie,   'sinopec_cookie_card2');
        $persistentStore.write(userSign, 'sinopec_sign_card2');
        console.log('✅ 已保存油卡2 token');
    } else {
        $persistentStore.write(cookie,   'sinopec_cookie_latest');
        $persistentStore.write(userSign, 'sinopec_sign_latest');
        console.log('✅ 已保存通用 token | ' + decoded.slice(0, 40));
    }
}

$done({});
