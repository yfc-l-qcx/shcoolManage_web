import Cookies from 'js-cookie'
const SupportKey = 'supportKey';

export function getSupport() {
    return Cookies.get(SupportKey)
}

export function setSupport(isSupport) {
    //expires 创建有效期为3天
    return Cookies.set(SupportKey, isSupport, { expires: 3})
}

export function setCookie(key, value, expires) {
    console.log("===expires==", expires)
    console.log("===key==", key)
    console.log("===value==", value)
    return Cookies.set(key, value, { expires: expires})
}