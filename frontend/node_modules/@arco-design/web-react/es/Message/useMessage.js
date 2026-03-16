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
import React, { useRef, useMemo } from 'react';
import ContextHolderElement from '../_util/contextHolder';
import Message from '.';
import { isString } from '../_util/is';
function useMessage(commonConfig) {
    if (commonConfig === void 0) { commonConfig = {}; }
    var maxCount = commonConfig.maxCount, _a = commonConfig.duration, duration = _a === void 0 ? 3000 : _a, _prefixCls = commonConfig.prefixCls;
    var contextHolderRef = useRef();
    var holderEle = useMemo(function () { return React.createElement(ContextHolderElement, { ref: contextHolderRef }); }, []);
    var messageInstance = {};
    var notice;
    function addNotice(config) {
        var prefixCls, rtl;
        if (contextHolderRef.current) {
            var contextConfig = contextHolderRef.current.getContextConfig();
            rtl = contextConfig.rtl;
            prefixCls = contextConfig.prefixCls;
        }
        var mergedPrefixCls = _prefixCls || prefixCls;
        var _noticeProps = __assign({ position: 'top', duration: duration }, config);
        var position = _noticeProps.position, transitionClassNames = _noticeProps.transitionClassNames;
        var id;
        if (messageInstance[position]) {
            var notices = messageInstance[position].state.notices;
            if (notices.length >= maxCount) {
                var updated = notices[0];
                id = updated.id;
                notices.shift();
                messageInstance[position].add(__assign(__assign({}, _noticeProps), { id: id }));
            }
            else {
                id = messageInstance[position].add(_noticeProps);
            }
        }
        else {
            notice = (React.createElement(Message, { transitionClassNames: transitionClassNames, ref: function (instance) {
                    messageInstance[position] = instance;
                    if (messageInstance[position]) {
                        id = messageInstance[position].add(_noticeProps);
                    }
                }, prefixCls: mergedPrefixCls, rtl: rtl }));
            contextHolderRef.current.addInstance(notice);
        }
        var close = function () {
            if (messageInstance[position]) {
                messageInstance[position].remove(id);
            }
        };
        return close;
    }
    var messageFuncs = {};
    ['info', 'success', 'warning', 'error', 'normal'].forEach(function (type) {
        messageFuncs[type] = function (config) {
            var _config = isString(config) ? { content: config } : config;
            return addNotice(__assign(__assign({}, _config), { type: type }));
        };
    });
    return [messageFuncs, holderEle];
}
export default useMessage;
