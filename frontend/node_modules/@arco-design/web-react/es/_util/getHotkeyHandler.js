var stringifyHotkey = function (k) {
    return JSON.stringify({
        code: k.code,
        ctrl: !!k.ctrl,
        shift: !!k.shift,
        alt: !!k.alt,
        meta: !!k.meta,
    });
};
/**
 * @param hotkeyMap - 快捷键描述对象
 */
export default function getHotkeyHandler(hotkeyMap) {
    var map = {};
    hotkeyMap.forEach(function (callback, hotkey) {
        hotkey = typeof hotkey === 'number' ? { code: hotkey } : hotkey;
        map[stringifyHotkey(hotkey)] = callback;
    });
    return function (event) {
        var key = stringifyHotkey({
            code: event.keyCode || event.which,
            ctrl: !!event.ctrlKey,
            shift: !!event.shiftKey,
            alt: !!event.altKey,
            meta: !!event.metaKey,
        });
        var callback = map[key];
        if (callback) {
            event.stopPropagation();
            if (callback(event) === false) {
                event.preventDefault();
            }
        }
    };
}
