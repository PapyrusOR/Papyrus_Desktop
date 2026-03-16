import pick from './pick';
export var NOOP = function () { };
export function newArray(length) {
    return Array.apply(null, Array(length));
}
export function pickTriggerPropsFromRest(rest) {
    return pick(rest, [
        'onMouseEnter',
        'onMouseLeave',
        'onMouseMove',
        'onContextMenu',
        'onClick',
        'onFocus',
        'onBlur',
        'tabIndex',
    ]);
}
