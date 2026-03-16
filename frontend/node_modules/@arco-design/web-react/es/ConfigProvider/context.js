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
import React, { createContext } from 'react';
import defaultLocale from '../locale/default';
import Empty from '../Empty';
function renderEmpty(componentName) {
    switch (componentName) {
        default:
            return React.createElement(Empty, null);
    }
}
export var DefaultConfigProviderProps = {
    locale: defaultLocale,
    prefixCls: 'arco',
    getPopupContainer: function () { return document.body; },
    size: 'default',
    renderEmpty: renderEmpty,
    focusLock: {
        modal: { autoFocus: true },
        drawer: { autoFocus: true },
    },
};
export var ConfigContext = createContext(__assign({ getPrefixCls: function (componentName, customPrefix) {
        return (customPrefix || 'arco') + "-" + componentName;
    } }, DefaultConfigProviderProps));
