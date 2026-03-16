// Replace empty string to &nbsp;
export default function (str) {
    return typeof str === 'string'
        ? str.replace(/(\s{2,})|(\s{1,}$)/g, function ($0) { return '\u00A0'.repeat($0.length); })
        : str;
}
