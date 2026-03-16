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
import { render as ReactDOMRender } from '../_util/react-dom';
import Modal from './modal';
import IconInfoCircleFill from '../../icon/react-icon/IconInfoCircleFill';
import IconCheckCircleFill from '../../icon/react-icon/IconCheckCircleFill';
import IconExclamationCircleFill from '../../icon/react-icon/IconExclamationCircleFill';
import IconCloseCircleFill from '../../icon/react-icon/IconCloseCircleFill';
import { getModalConfig, destroyList, getConfigProviderProps } from './config';
import ConfigProvider from '../ConfigProvider';
function ConfirmModal(props) {
    var _a = getModalConfig(), prefixCls = _a.prefixCls, simple = _a.simple;
    return (React.createElement(Modal, __assign({ prefixCls: prefixCls, simple: simple }, props), props.content));
}
// 如果是消息提示型弹出框，那么只有确认按钮
export var normalizeConfig = function (_config) {
    var icon = _config.icon;
    if (!icon && icon !== null) {
        icon = React.createElement(IconExclamationCircleFill, null);
        if (_config.isNotice) {
            switch (_config.noticeType) {
                case 'info':
                    icon = React.createElement(IconInfoCircleFill, null);
                    break;
                case 'success':
                    icon = React.createElement(IconCheckCircleFill, null);
                    break;
                case 'warning':
                    icon = React.createElement(IconExclamationCircleFill, null);
                    break;
                case 'error':
                    icon = React.createElement(IconCloseCircleFill, null);
                    break;
                default:
                    break;
            }
        }
    }
    if (_config.isNotice) {
        _config.hideCancel = true;
    }
    _config.title =
        icon === null && _config.title === null ? null : (React.createElement("span", null,
            icon,
            _config.title));
    return _config;
};
function confirm(config, renderFunc) {
    var root;
    var div = document.createElement('div');
    document.body.appendChild(div);
    var configProviderProps = getConfigProviderProps();
    function render(props) {
        var dom = (React.createElement(ConfigProvider, __assign({}, configProviderProps),
            React.createElement(ConfirmModal, __assign({}, props, { onCancel: onCancel }))));
        if (root) {
            root.render(dom);
        }
        else {
            root = ReactDOMRender(dom, div);
        }
    }
    var renderFunction = renderFunc || render;
    var modalConfig = __assign(__assign({}, config), { visible: false });
    var onOk = function () {
        var ret;
        var _onOk = config.onOk || config.onConfirm;
        if (_onOk) {
            ret = _onOk();
        }
        if (ret && ret.then) {
            modalConfig.confirmLoading = true;
            renderFunction(modalConfig);
            ret.then(function () {
                onCancel(true);
            }, function (e) {
                console.error(e);
                modalConfig.confirmLoading = false;
                renderFunction(modalConfig);
            });
        }
        if (!ret) {
            onCancel(true);
        }
    };
    // 如果是promise，那么处理loading和加载完成关闭
    modalConfig.onOk = onOk;
    modalConfig = normalizeConfig(modalConfig);
    modalConfig.visible = true;
    renderFunction(modalConfig);
    function destroy() {
        root = root === null || root === void 0 ? void 0 : root._unmount();
        if (div.parentNode) {
            div.parentNode.removeChild(div);
        }
        for (var i = 0; i < destroyList.length; i++) {
            var fn = destroyList[i];
            if (fn === close) {
                destroyList.splice(i, 1);
                break;
            }
        }
    }
    function onCancel(isOnOk) {
        !isOnOk && config.onCancel && config.onCancel();
        modalConfig.visible = false;
        modalConfig.afterClose = function () {
            config.afterClose && config.afterClose();
            destroy();
        };
        renderFunction(modalConfig);
    }
    function update(newConfig) {
        modalConfig = __assign(__assign(__assign({}, modalConfig), { title: config.title }), newConfig);
        modalConfig = normalizeConfig(modalConfig);
        renderFunction(modalConfig);
    }
    function close() {
        modalConfig.visible = false;
        modalConfig.afterClose = function () {
            config.afterClose && config.afterClose();
            destroy();
        };
        renderFunction(modalConfig);
    }
    destroyList.push(close);
    return {
        close: close,
        update: update,
    };
}
export default confirm;
