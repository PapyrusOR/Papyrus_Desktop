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
var configProvider = {};
export function setConfigProviderProps(configProviderProps) {
    configProvider = __assign({}, configProviderProps);
}
export function getConfigProviderProps() {
    return configProvider;
}
var modalConfig = {
    simple: true,
};
export var setModalConfig = function (config) {
    modalConfig = __assign(__assign({}, modalConfig), config);
};
export var getModalConfig = function () {
    return modalConfig;
};
export var destroyList = [];
