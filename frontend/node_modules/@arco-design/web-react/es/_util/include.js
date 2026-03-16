// return an object with specify keys
export default function include(obj, keys) {
    var clone = {};
    Object.keys(obj).forEach(function (key) {
        if (keys.indexOf(key) !== -1) {
            clone[key] = obj[key];
        }
    });
    return clone;
}
