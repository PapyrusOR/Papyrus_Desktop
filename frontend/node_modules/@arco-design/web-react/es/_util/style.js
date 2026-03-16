var transformNames = [
    'transform',
    'WebkitTransform',
    'msTransform',
    'MozTransform',
    'OTransform',
];
export function fixedWidth(width) {
    return {
        maxWidth: width,
        minWidth: width,
        width: width,
    };
}
export function setTransformStyle(value) {
    var style = {};
    transformNames.forEach(function (name) {
        style[name] = value;
    });
    return style;
}
export function getStyle(element, prop) {
    if (!element || !prop)
        return null;
    var styleName = prop;
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        if (document.defaultView) {
            var computed = document.defaultView.getComputedStyle(element, '');
            return element.style[styleName] || computed ? computed[styleName] : '';
        }
    }
    catch (e) {
        return element.style[styleName];
    }
}
