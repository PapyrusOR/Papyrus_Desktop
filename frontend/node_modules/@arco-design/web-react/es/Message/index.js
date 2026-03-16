var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import ArcoCSSTransition from '../_util/CSSTransition';
import { render } from '../_util/react-dom';
import BaseNotification from '../_class/notification';
import Notice from '../_class/notice';
import cs from '../_util/classNames';
import { isUndefined, isNumber } from '../_util/is';
import useMessage from './useMessage';
var messageTypes = ['info', 'success', 'error', 'warning', 'loading', 'normal'];
var messageInstance = {};
var maxCount;
var prefixCls;
var duration;
var container;
var rtl;
var closable;
function addInstance(noticeProps) {
    var _noticeProps = __assign({ position: 'top', duration: duration }, noticeProps);
    var position = _noticeProps.position, transitionClassNames = _noticeProps.transitionClassNames, transitionTimeout = _noticeProps.transitionTimeout;
    var id;
    var _a = messageInstance[position] || {}, instance = _a.instance, pending = _a.pending;
    if (instance || pending) {
        var add_1 = function () {
            var instance = (messageInstance[position] || {}).instance;
            var notices = instance.state.notices;
            var updated = notices.find(function (notice) { return notice.id === noticeProps.id; });
            var _mergerProps = __assign(__assign({}, _noticeProps), { update: updated });
            if (notices.length >= maxCount) {
                if (updated) {
                    instance.add(__assign(__assign({}, _mergerProps), { id: updated.id }));
                }
                else {
                    notices.shift();
                    instance.add(_mergerProps);
                }
            }
            else {
                id = instance.add(_mergerProps);
            }
        };
        if (instance) {
            add_1();
        }
        else if (pending === null || pending === void 0 ? void 0 : pending.then) {
            pending.then(function () {
                add_1();
                messageInstance[position].pending = null;
            });
        }
    }
    else {
        var div_1 = document.createElement('div');
        (container || document.body).appendChild(div_1);
        messageInstance[position] = {};
        messageInstance[position].pending = new Promise(function (resolve) {
            render(React.createElement(Message, { transitionClassNames: transitionClassNames, transitionTimeout: transitionTimeout, ref: function (instance) {
                    if (!messageInstance[position]) {
                        // getContainer 变化时，会重置 messageInstance
                        // pending 中的逻辑执行晚于重置逻辑时，这里需判空
                        messageInstance[position] = {};
                    }
                    messageInstance[position].instance = instance;
                    id = instance.add(_noticeProps);
                    resolve(null);
                } }), div_1);
        });
    }
    var result = function () {
        var _a, _b;
        (_b = (_a = messageInstance[position]) === null || _a === void 0 ? void 0 : _a.instance) === null || _b === void 0 ? void 0 : _b.remove(id);
    };
    return result;
}
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.remove = function (id) {
            var noticeItem = _this.state.notices.find(function (item) { return item.id === id; });
            if (noticeItem) {
                _this.update(__assign(__assign({}, noticeItem), { style: __assign(__assign({}, noticeItem.style), { opacity: 0 }) }));
            }
            // 100 是透明度动画结束的时间
            setTimeout(function () {
                _super.prototype.remove.call(_this, id);
            }, 100);
        };
        return _this;
    }
    Message.prototype.render = function () {
        var _this = this;
        var _a = this.props, transitionClassNames = _a.transitionClassNames, _transitionTimeout = _a.transitionTimeout, _prefixCls = _a.prefixCls, _rtl = _a.rtl, _closable = _a.closable;
        var _b = this.state, notices = _b.notices, position = _b.position;
        var mergedPrefixCls = _prefixCls || prefixCls;
        var mergedRtl = !isUndefined(_rtl) ? _rtl : rtl;
        var mergeClosable = !isUndefined(_closable) ? _closable : closable;
        var prefixClsMessage = mergedPrefixCls ? mergedPrefixCls + "-message" : 'arco-message';
        var transitionTimeout = {
            enter: isNumber(_transitionTimeout === null || _transitionTimeout === void 0 ? void 0 : _transitionTimeout.enter) ? _transitionTimeout === null || _transitionTimeout === void 0 ? void 0 : _transitionTimeout.enter : 100,
            exit: isNumber(_transitionTimeout === null || _transitionTimeout === void 0 ? void 0 : _transitionTimeout.exit) ? _transitionTimeout === null || _transitionTimeout === void 0 ? void 0 : _transitionTimeout.exit : 300,
        };
        var classNames = cs(prefixClsMessage + "-wrapper", prefixClsMessage + "-wrapper-" + position);
        return (React.createElement("div", { className: classNames },
            React.createElement(TransitionGroup, { component: null }, notices.map(function (notice) { return (React.createElement(ArcoCSSTransition, { key: notice.id, timeout: transitionTimeout, classNames: transitionClassNames || "fadeMessage", onExit: function (e) {
                    if (!e)
                        return;
                    e.style.height = e.scrollHeight + "px";
                }, onExiting: function (e) {
                    if (!e)
                        return;
                    e.style.height = 0;
                }, onExited: function (e) {
                    if (!e)
                        return;
                    e.style.height = 0;
                    notice.onClose && notice.onClose();
                } },
                React.createElement(Notice, __assign({}, notice, { prefixCls: prefixClsMessage, classPrefixCls: mergedPrefixCls, iconPrefix: mergedPrefixCls, onClose: _this.remove, noticeType: "message", rtl: mergedRtl }, (isUndefined(mergeClosable) ? {} : { closable: mergeClosable }))))); }))));
    };
    Message.config = function (options) {
        if (options === void 0) { options = {}; }
        if (isNumber(options.maxCount)) {
            maxCount = options.maxCount;
        }
        if (options.prefixCls) {
            prefixCls = options.prefixCls;
        }
        if (isNumber(options.duration)) {
            duration = options.duration;
        }
        if (typeof options.rtl === 'boolean') {
            rtl = options.rtl;
        }
        if (typeof options.closable === 'boolean') {
            closable = options.closable;
        }
        if (options.getContainer && options.getContainer() !== container) {
            container = options.getContainer();
            Object.values(messageInstance).forEach(function (_a) {
                var instance = _a.instance;
                return instance === null || instance === void 0 ? void 0 : instance.clear();
            });
            messageInstance = {};
        }
    };
    Message.clear = function () {
        Object.values(messageInstance).forEach(function (_a) {
            var instance = _a.instance;
            instance === null || instance === void 0 ? void 0 : instance.clear();
        });
    };
    Message.addInstance = addInstance;
    return Message;
}(BaseNotification));
messageTypes.forEach(function (type) {
    Message[type] = function (noticeProps) {
        var props = typeof noticeProps === 'string' ? { content: noticeProps } : noticeProps;
        return addInstance(__assign(__assign({}, props), { type: type }));
    };
});
Message.useMessage = useMessage;
export default Message;
