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
import React, { createRef, useRef } from 'react';
import ContextHolderElement from '../../_util/contextHolder';
import HookModal from './hookModal';
import { normalizeConfig } from '../confirm';
import { destroyList } from '../config';
function useModal() {
    var contextHolderRef = useRef();
    var holderEle = React.createElement(ContextHolderElement, { ref: contextHolderRef });
    var uuid = 0;
    function addNewModal(config) {
        var _a;
        uuid += 1;
        var modalRef = createRef();
        var currentConfig = __assign({}, config);
        function afterClose() {
            config.afterClose && config.afterClose();
            removeModalInstance();
        }
        var modal = (React.createElement(HookModal, __assign({ key: uuid, ref: modalRef }, normalizeConfig(__assign({}, config)), { afterClose: afterClose })));
        (_a = contextHolderRef.current) === null || _a === void 0 ? void 0 : _a.addInstance(modal);
        function removeModalInstance() {
            var _a;
            (_a = contextHolderRef.current) === null || _a === void 0 ? void 0 : _a.removeInstance(modal);
        }
        function close() {
            var _a;
            (_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.close();
        }
        function update(newConfig) {
            var _a;
            currentConfig = __assign(__assign({}, currentConfig), newConfig);
            (_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.update(normalizeConfig(__assign({}, currentConfig)));
        }
        destroyList.push(close);
        return {
            close: close,
            update: update,
        };
    }
    var modalFuncs = {
        confirm: function (config) {
            return addNewModal(__assign({}, config));
        },
    };
    ['info', 'success', 'warning', 'error'].forEach(function (type) {
        modalFuncs[type] = function (config) {
            return addNewModal(__assign(__assign({}, config), { isNotice: true, noticeType: type }));
        };
    });
    return [modalFuncs, holderEle];
}
export default useModal;
