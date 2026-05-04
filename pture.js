// sinopec_capture.js
// 拦截 App 请求，自动保存 Cookie 和 user-sign

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

// 从 body 里提取卡号
const match = decoded.match(/cardNo=(\d+)/);
const cardNo = match ? match[1] : '';

if (cookie && userSign) {
    if (cardNo === '1000114400032535985') {
        $persistentStore.write(cookie,   'sinopec_cookie_card1');
        $persistentStore.write(userSign, 'sinopec_sign_card1');
        console.log('已保存站前加油站 token');
    } else if (cardNo === '1000114400031361307') {
        $persistentStore.write(cookie,   'sinopec_cookie_card2');
        $persistentStore.write(userSign, 'sinopec_sign_card2');
        console.log('已保存瑶台加油站 token');
    } else {
        // action=refresh 等其他请求，也保存，作为备用
        $persistentStore.write(cookie,   'sinopec_cookie_latest');
        $persistentStore.write(userSign, 'sinopec_sign_latest');
        console.log('已保存通用 token，body=' + decoded.slice(0, 30));
    }
}

// 不修改请求，原样放行
$done({});
