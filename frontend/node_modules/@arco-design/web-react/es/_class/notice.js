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
import React, { Component, createRef } from 'react';
import IconClose from '../../icon/react-icon/IconClose';
import IconCheckCircleFill from '../../icon/react-icon/IconCheckCircleFill';
import IconCloseCircleFill from '../../icon/react-icon/IconCloseCircleFill';
import IconInfoCircleFill from '../../icon/react-icon/IconInfoCircleFill';
import IconExclamationCircleFill from '../../icon/react-icon/IconExclamationCircleFill';
import IconLoading from '../../icon/react-icon/IconLoading';
import cs from '../_util/classNames';
import IconHover from '../_class/icon-hover';
import { IconContext } from '../../icon/react-icon/context';
import ConfigProvider from '../ConfigProvider';
import { ConfigContext } from '../ConfigProvider/context';
var Notice = /** @class */ (function (_super) {
    __extends(Notice, _super);
    function Notice(props) {
        var _this = _super.call(this, props) || this;
        _this.getRootDOMNode = function () {
            return _this.rootDOMRef.current;
        };
        _this.startTimer = function () {
            var _a = _this.props, duration = _a.duration, onClose = _a.onClose, id = _a.id;
            // 自动关闭
            if (duration !== 0) {
                _this.timer = window.setTimeout(function () {
                    onClose && onClose(id);
                    _this.removeTimer();
                }, duration);
            }
        };
        _this.removeTimer = function () {
            if (_this.timer) {
                window.clearTimeout(_this.timer);
                _this.timer = null;
            }
        };
        _this.onClose = function () {
            _this.props.onClose && _this.props.onClose(_this.props.id);
        };
        _this.renderIcon = function () {
            var _a = _this.props, showIcon = _a.showIcon, icon = _a.icon, type = _a.type, prefixCls = _a.prefixCls, iconPrefix = _a.iconPrefix;
            var content;
            if (icon) {
                content = icon;
            }
            else if (showIcon) {
                switch (type) {
                    case 'info':
                        content = React.createElement(IconInfoCircleFill, null);
                        break;
                    case 'success':
                        content = React.createElement(IconCheckCircleFill, null);
                        break;
                    case 'error':
                        content = React.createElement(IconCloseCircleFill, null);
                        break;
                    case 'warning':
                        content = React.createElement(IconExclamationCircleFill, null);
                        break;
                    case 'loading':
                        content = React.createElement(IconLoading, null);
                        break;
                    default:
                        break;
                }
                content = (React.createElement(IconContext.Provider, { value: iconPrefix ? { prefixCls: iconPrefix } : {} }, content));
            }
            return React.createElement("span", { className: prefixCls + "-icon" }, content);
        };
        _this.onMouseEnter = function () {
            _this.removeTimer();
        };
        _this.onMouseLeave = function () {
            // An update operation may be triggered after mouseEnter to start a new timer.
            // mouseEnter(clear) => clickBtn => update(new timer) => mouseLeave
            _this.removeTimer();
            _this.startTimer();
        };
        _this.rootDOMRef = createRef();
        return _this;
    }
    Notice.prototype.componentDidMount = function () {
        this.startTimer();
    };
    Notice.prototype.componentDidUpdate = function (nextProps) {
        if (nextProps.duration !== this.props.duration || this.props.update) {
            this.removeTimer();
            this.startTimer();
        }
    };
    Notice.prototype.componentWillUnmount = function () {
        this.removeTimer();
    };
    Notice.prototype.render = function () {
        var _a;
        var _b = this.props, title = _b.title, content = _b.content, showIcon = _b.showIcon, className = _b.className, style = _b.style, type = _b.type, btn = _b.btn, icon = _b.icon, prefixCls = _b.prefixCls, closable = _b.closable, noticeType = _b.noticeType, iconPrefix = _b.iconPrefix, rtl = _b.rtl, closeIcon = _b.closeIcon, classPrefixCls = _b.classPrefixCls;
        var classNames = cs(prefixCls, prefixCls + "-" + type, (_a = {},
            _a[prefixCls + "-closable"] = closable,
            _a[prefixCls + "-rtl"] = rtl,
            _a), className);
        var _closable = 'closable' in this.props ? closable : true;
        var shouldRenderIcon = showIcon;
        if (type === 'normal' && !icon) {
            shouldRenderIcon = false;
        }
        var configContext = __assign({}, this.context);
        if (classPrefixCls) {
            configContext.prefixCls = classPrefixCls;
        }
        if (noticeType === 'message') {
            _closable = closable;
            return (React.createElement(ConfigProvider, __assign({}, configContext, { effectGlobalModal: false, effectGlobalNotice: false }),
                React.createElement("div", { style: { textAlign: 'center' }, onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave, ref: this.rootDOMRef },
                    React.createElement("div", { className: classNames, style: style, role: "alert" },
                        shouldRenderIcon && this.renderIcon(),
                        React.createElement("span", { className: prefixCls + "-content" }, content),
                        _closable &&
                            (closeIcon !== undefined ? (React.createElement("span", { onClick: this.onClose, className: prefixCls + "-close-btn" }, closeIcon)) : (React.createElement(IconHover, { prefix: prefixCls, className: prefixCls + "-close-btn", onClick: this.onClose },
                                React.createElement(IconClose, null))))))));
        }
        if (noticeType === 'notification') {
            return (React.createElement(ConfigProvider, __assign({}, configContext, { effectGlobalModal: false, effectGlobalNotice: false }),
                React.createElement("div", { ref: this.rootDOMRef, onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave },
                    React.createElement("div", { className: classNames, style: style, role: "alert" },
                        shouldRenderIcon && React.createElement("div", { className: prefixCls + "-left" }, this.renderIcon()),
                        React.createElement("div", { className: prefixCls + "-right" },
                            title && React.createElement("div", { className: prefixCls + "-title" }, title),
                            React.createElement("div", { className: prefixCls + "-content" }, content),
                            btn && React.createElement("div", { className: prefixCls + "-btn-wrapper" }, btn)),
                        _closable &&
                            (closeIcon !== undefined ? (React.createElement("span", { onClick: this.onClose, className: prefixCls + "-close-btn" }, closeIcon)) : (React.createElement(IconHover, { prefix: prefixCls, className: prefixCls + "-close-btn", onClick: this.onClose },
                                React.createElement(IconContext.Provider, { value: iconPrefix ? { prefixCls: iconPrefix } : {} },
                                    React.createElement(IconClose, null)))))))));
        }
    };
    Notice.defaultProps = {
        type: 'info',
        showIcon: true,
        noticeType: 'message',
        duration: 3000,
    };
    Notice.contextType = ConfigContext;
    return Notice;
}(Component));
export default Notice;
