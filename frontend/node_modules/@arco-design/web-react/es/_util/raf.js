var target = typeof window === 'undefined' ? global : window;
var vendors = ['webkit', 'ms', 'moz', 'o'];
var raf = target.requestAnimationFrame; // eslint-disable-line
var caf = target.cancelAnimationFrame; // eslint-disable-line
if (!raf || !caf) {
    vendors.some(function (prefix) {
        raf = target[prefix + "RequestAnimationFrame"];
        caf = target[prefix + "CancelAnimationFrame"] || target[prefix + "CancelRequestAnimationFrame"];
        return raf && caf;
    });
    if (!raf || !caf) {
        var lastTime_1 = 0;
        raf = function (cb) {
            var currentTime = Date.now();
            var diff = Math.max(0, 16 - (currentTime - lastTime_1));
            var timer = setTimeout(function () {
                cb();
                lastTime_1 = currentTime + diff;
            }, diff);
            return timer;
        };
        caf = function (timer) {
            clearTimeout(timer);
        };
    }
}
raf = raf.bind(target);
caf = caf.bind(target);
export { raf, caf };
