import { Component } from 'react';
import ReactDOM from 'react-dom';
import { isObject, isFunction, isReact18 } from './is';
import warning from './warning';
var __SECRET_INTERNALS__ = '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED';
var CopyReactDOM = ReactDOM;
var updateUsingClientEntryPoint = function (skipWarning) {
    // https://github.com/facebook/react/blob/17806594cc28284fe195f918e8d77de3516848ec/packages/react-dom/npm/client.js#L10
    // Avoid console warning
    if (isObject(CopyReactDOM[__SECRET_INTERNALS__])) {
        CopyReactDOM[__SECRET_INTERNALS__].usingClientEntryPoint = skipWarning;
    }
};
var createRoot;
try {
    createRoot = CopyReactDOM.createRoot;
}
catch (_) {
    //
}
var copyRender;
var setCopyRender = function () {
    if (isReact18 && createRoot) {
        copyRender = function (app, container) {
            updateUsingClientEntryPoint(true);
            var root = createRoot(container);
            updateUsingClientEntryPoint(false);
            root.render(app);
            root._unmount = function () {
                setTimeout(function () {
                    var _a;
                    (_a = root === null || root === void 0 ? void 0 : root.unmount) === null || _a === void 0 ? void 0 : _a.call(root);
                });
            };
            return root;
        };
    }
    else {
        copyRender = function (app, container) {
            CopyReactDOM.render(app, container);
            return {
                render: function (app) {
                    CopyReactDOM.render(app, container);
                },
                _unmount: function () {
                    CopyReactDOM.unmountComponentAtNode(container);
                },
            };
        };
    }
};
var warnedInstancesWeakSet;
function hasInstanceWarned(instance) {
    var ctor = instance.constructor;
    if (typeof ctor !== 'function')
        return false;
    if (!warnedInstancesWeakSet && typeof WeakSet === 'function') {
        warnedInstancesWeakSet = new WeakSet();
    }
    var hasWarned = !!(warnedInstancesWeakSet === null || warnedInstancesWeakSet === void 0 ? void 0 : warnedInstancesWeakSet.has(ctor));
    warnedInstancesWeakSet === null || warnedInstancesWeakSet === void 0 ? void 0 : warnedInstancesWeakSet.add(ctor);
    return hasWarned;
}
/**
 *
 * @param element
 * @param instance: 兜底 findDOMNode 查找，一般都是 this
 * @returns
 */
export var findDOMNode = function (element, instance) {
    // 类组件，非 forwardRef(function component) 都拿不到真实dom
    if (element && element instanceof Element) {
        return element;
    }
    if (element && element.current && element.current instanceof Element) {
        return element.current;
    }
    // react 19 findDOMNode已经被废弃，调用直接报错，所以优先读取 getRootDOMNode 方法
    if (element && isFunction(element.getRootDOMNode)) {
        return element.getRootDOMNode();
    }
    if (element instanceof Component) {
        if (ReactDOM.findDOMNode) {
            return ReactDOM.findDOMNode(element);
        }
    }
    // 一般 useImperativeHandle 的元素拿到的 ref 不是 dom 元素且不存在 getRootDOMNode ，会走到这里。
    if (instance) {
        warning(isReact18 && !hasInstanceWarned(instance), 'Element does not define the `getRootDOMNode` method causing a call to React.findDOMNode. but findDOMNode is deprecated in StrictMode. Please check the code logic', { element: element, instance: instance });
        if (ReactDOM.findDOMNode) {
            return ReactDOM.findDOMNode(instance);
        }
    }
    return null;
};
// 回调children的原始 ref ，适配函数 ref or ref.current 场景
export var callbackOriginRef = function (children, node) {
    if (children && children.ref) {
        if (isFunction(children.ref)) {
            children === null || children === void 0 ? void 0 : children.ref(node);
        }
        if ('current' in children.ref) {
            children.ref.current = node;
        }
    }
};
// 这个主要是给 polyfill 调用下。 因为 react 19 的 index.js 不会再导出 createRoot，必须从 react-dom/client 导入 createRoot
export var setCreateRoot = function (_createRoot) {
    createRoot = _createRoot;
    setCopyRender();
};
setCopyRender();
export var render = function (node, el) {
    return copyRender(node, el);
};
