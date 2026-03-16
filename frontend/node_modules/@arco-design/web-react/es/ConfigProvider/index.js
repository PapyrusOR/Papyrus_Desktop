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
import React, { useEffect } from 'react';
import { isObject } from '../_util/is';
import { lighten } from './util';
import Message from '../Message';
import Notification from '../Notification';
import { setConfigProviderProps } from '../Modal/config';
import { IconContext } from '../../icon/react-icon/context';
import omit from '../_util/omit';
import useMergeProps from '../_util/hooks/useMergeProps';
import { ConfigContext, DefaultConfigProviderProps } from './context';
var colorList = {
    primaryColor: {
        default: '--arcoblue-6',
        hover: '--arcoblue-5',
        active: '--arcoblue-7',
    },
    successColor: {
        default: '--green-6',
        hover: '--green-5',
        active: '--green-7',
    },
    infoColor: {
        default: '--arcoblue-6',
        hover: '--arcoblue-5',
        active: '--arcoblue-7',
    },
    warningColor: {
        default: '--orangered-6',
        hover: '--orangered-5',
        active: '--orangered-7',
    },
    dangerColor: {
        default: '--red-6',
        hover: '--red-5',
        active: '--red-7',
    },
};
function setTheme(theme) {
    if (theme && isObject(theme)) {
        var root_1 = document.body;
        Object.keys(colorList).forEach(function (color) {
            if (theme[color]) {
                root_1.style.setProperty(colorList[color].default, lighten(theme[color], 0));
                if (!theme[color + "Hover"]) {
                    root_1.style.setProperty(colorList[color].hover, lighten(theme[color], 10));
                }
                if (!theme[color + "Active"]) {
                    root_1.style.setProperty(colorList[color].active, lighten(theme[color], -10));
                }
            }
        });
    }
}
var defaultProps = DefaultConfigProviderProps;
var componentConfig = {};
function ConfigProvider(baseProps) {
    var props = useMergeProps(baseProps, defaultProps, componentConfig);
    var theme = props.theme, prefixCls = props.prefixCls, children = props.children, locale = props.locale, rtl = props.rtl, _a = props.effectGlobalNotice, effectGlobalNotice = _a === void 0 ? true : _a, _b = props.effectGlobalModal, effectGlobalModal = _b === void 0 ? true : _b;
    useEffect(function () {
        setTheme(theme);
    }, [theme]);
    useEffect(function () {
        if (effectGlobalNotice) {
            Message.config({ prefixCls: prefixCls, rtl: rtl });
            Notification.config({ prefixCls: prefixCls, rtl: rtl });
        }
    }, [prefixCls, rtl, effectGlobalNotice]);
    function getPrefixCls(componentName, customPrefix) {
        return (customPrefix || prefixCls) + "-" + componentName;
    }
    var config = __assign(__assign({}, omit(props, ['children'])), { getPrefixCls: getPrefixCls });
    useEffect(function () {
        if (effectGlobalModal) {
            setConfigProviderProps({ locale: locale, prefixCls: prefixCls, rtl: rtl });
        }
    }, [locale, prefixCls, rtl, effectGlobalModal]);
    var child = children;
    if (prefixCls && prefixCls !== 'arco') {
        child = React.createElement(IconContext.Provider, { value: { prefixCls: prefixCls } }, children);
    }
    return React.createElement(ConfigContext.Provider, { value: config }, child);
}
ConfigProvider.ConfigContext = ConfigContext;
ConfigProvider.displayName = 'ConfigProvider';
export default ConfigProvider;
export var ConfigConsumer = ConfigContext.Consumer;
export { ConfigContext };
