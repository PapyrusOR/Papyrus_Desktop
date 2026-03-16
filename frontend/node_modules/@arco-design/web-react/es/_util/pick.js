// pick item from object
export default function pick(obj, keys) {
    var clone = {};
    keys.forEach(function (key) {
        var k = key;
        if (key in obj) {
            clone[k] = obj[k];
        }
    });
    return clone;
}
export function pickDataAttributes(obj) {
    var clone = {};
    obj &&
        Object.keys(obj).forEach(function (key) {
            var k = String(key);
            if (k.indexOf('data-') === 0) {
                clone[k] = obj[k];
            }
            if (k.indexOf('aria-') === 0) {
                clone[k] = obj[k];
            }
        });
    return clone;
}
