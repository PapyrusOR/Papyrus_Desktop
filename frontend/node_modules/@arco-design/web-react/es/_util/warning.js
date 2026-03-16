export default function warning(condition, message) {
    var extra = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        extra[_i - 2] = arguments[_i];
    }
    if (process.env.NODE_ENV !== 'production' && console) {
        if (condition) {
            return console.error("[@arco-design/web-react]: " + message, extra ? { detail: extra } : undefined);
        }
    }
}
