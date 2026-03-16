// https://github.com/ant-design/ant-design/blob/master/components/_util/responsiveObserve.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export var responsiveArray = ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
export var responsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)',
    xxxl: '(min-width: 2000px)',
};
var subscribers = [];
var subUid = -1;
var screens = {};
var responsiveObserve = {
    matchHandlers: {},
    dispatch: function (pointMap, breakpointChecked) {
        screens = pointMap;
        if (subscribers.length < 1) {
            return false;
        }
        subscribers.forEach(function (item) {
            item.func(screens, breakpointChecked);
        });
        return true;
    },
    subscribe: function (func) {
        if (subscribers.length === 0) {
            this.register();
        }
        var token = (++subUid).toString();
        subscribers.push({
            token: token,
            func: func,
        });
        func(screens, null);
        return token;
    },
    unsubscribe: function (token) {
        subscribers = subscribers.filter(function (item) { return item.token !== token; });
        if (subscribers.length === 0) {
            this.unregister();
        }
    },
    unregister: function () {
        var _this = this;
        Object.keys(responsiveMap).forEach(function (screen) {
            var matchMediaQuery = responsiveMap[screen];
            var handler = _this.matchHandlers[matchMediaQuery];
            if (handler && handler.mql && handler.listener) {
                handler.mql.removeListener(handler.listener);
            }
        });
    },
    register: function () {
        var _this = this;
        Object.keys(responsiveMap).forEach(function (screen) {
            var matchMediaQuery = responsiveMap[screen];
            var listener = function (_a) {
                var _b;
                var matches = _a.matches;
                _this.dispatch(__assign(__assign({}, screens), (_b = {}, _b[screen] = matches, _b)), screen);
            };
            var mql = window.matchMedia(matchMediaQuery);
            mql.addListener(listener);
            _this.matchHandlers[matchMediaQuery] = {
                mql: mql,
                listener: listener,
            };
            listener(mql);
        });
    },
};
export default responsiveObserve;
