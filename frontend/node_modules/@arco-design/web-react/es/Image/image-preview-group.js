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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState, } from 'react';
import { isArray, isObject, isUndefined } from '../_util/is';
import useIsFirstRender from '../_util/hooks/useIsFirstRender';
import useMergeValue from '../_util/hooks/useMergeValue';
import ImagePreview from './image-preview';
import { PreviewGroupContext } from './previewGroupContext';
function PreviewGroup(props, ref) {
    var children = props.children, srcList = props.srcList, infinite = props.infinite, propCurrentIndex = props.current, defaultCurrent = props.defaultCurrent, onChange = props.onChange, propVisible = props.visible, defaultVisible = props.defaultVisible, forceRender = props.forceRender, onVisibleChange = props.onVisibleChange, restProps = __rest(props, ["children", "srcList", "infinite", "current", "defaultCurrent", "onChange", "visible", "defaultVisible", "forceRender", "onVisibleChange"]);
    var _a = __read(useMergeValue(false, {
        value: propVisible,
        defaultValue: defaultVisible,
    }), 2), visible = _a[0], setVisible = _a[1];
    var propPreviewUrlMap = useMemo(function () { return (srcList ? new Map(srcList.map(function (url, index) { return [index, { url: url, preview: true }]; })) : null); }, [srcList]);
    var isFirstRender = useIsFirstRender();
    var getPreviewUrlMap = function () { return (propPreviewUrlMap ? new Map(propPreviewUrlMap) : new Map()); };
    var _b = __read(useState(getPreviewUrlMap()), 2), previewUrlMap = _b[0], setPreviewUrlMap = _b[1];
    var previewPropsMapRef = useRef();
    var previewPropsMap = previewPropsMapRef.current || new Map();
    var setPreviewPropsMap = function (cb) {
        previewPropsMapRef.current = cb(previewPropsMapRef.current);
    };
    useEffect(function () {
        if (isFirstRender)
            return;
        setPreviewUrlMap(getPreviewUrlMap());
    }, [propPreviewUrlMap]);
    var canPreviewUrlMap = new Map(Array.from(previewUrlMap)
        .filter(function (_a) {
        var _b = __read(_a, 2), preview = _b[1].preview;
        return preview;
    })
        .map(function (_a) {
        var _b = __read(_a, 2), id = _b[0], url = _b[1].url;
        return [id, url];
    }));
    var _c = __read(useMergeValue(0, {
        value: propCurrentIndex,
        defaultValue: defaultCurrent,
    }), 2), currentIndex = _c[0], setCurrentIndex = _c[1];
    function registerPreviewUrl(id, url, preview) {
        if (!propPreviewUrlMap) {
            setPreviewUrlMap(function (pre) {
                return new Map(pre).set(id, {
                    url: url,
                    preview: preview,
                });
            });
        }
        return function unRegisterPreviewUrl() {
            if (!propPreviewUrlMap) {
                setPreviewUrlMap(function (pre) {
                    var cloneMap = new Map(pre);
                    var hasDelete = cloneMap.delete(id);
                    return hasDelete ? cloneMap : pre;
                });
            }
        };
    }
    function registerPreviewProps(id, previewProps) {
        setPreviewPropsMap(function (pre) { return new Map(pre).set(id, isObject(previewProps) ? previewProps : {}); });
        return function unRegisterPreviewProps() {
            setPreviewPropsMap(function (pre) {
                var cloneMap = new Map(pre);
                var hasDelete = cloneMap.delete(id);
                return hasDelete ? cloneMap : pre;
            });
        };
    }
    var refPreview = useRef();
    useImperativeHandle(ref, function () { return ({
        reset: function () {
            refPreview.current && refPreview.current.reset();
        },
    }); });
    var handleVisibleChange = function (newVisible, preVisible) {
        var _preVisible = isUndefined(preVisible) ? visible : preVisible;
        onVisibleChange && onVisibleChange(newVisible, _preVisible);
        setVisible(newVisible);
    };
    var handleSwitch = function (index) {
        onChange && onChange(index);
        setCurrentIndex(index);
    };
    var loopImageIndex = function (children) {
        var index = 0;
        var loop = function (children) {
            var result = React.Children.map(children, function (child) {
                if (child && child.props && child.type) {
                    var displayName = child.type.displayName;
                    if (displayName === 'Image') {
                        return React.cloneElement(child, { _index: index++ });
                    }
                }
                if (child && child.props && child.props.children) {
                    return React.cloneElement(child, {
                        children: loop(child.props.children),
                    });
                }
                return child;
            });
            // 避免单个子节点 <div></div> 被处理为  [<div></div>] 格式
            if (!isArray(children) && React.Children.count(children) === 1) {
                return result[0];
            }
            return result;
        };
        return loop(children);
    };
    var renderList = function () {
        var array = Array.from(canPreviewUrlMap.values());
        if (array.length > 0) {
            return (React.createElement("div", { style: { display: 'none' } }, array.map(function (src) { return (React.createElement("img", { key: src, src: src })); })));
        }
        return null;
    };
    return (React.createElement(PreviewGroupContext.Provider, { value: {
            previewGroup: true,
            previewUrlMap: canPreviewUrlMap,
            previewPropsMap: previewPropsMap,
            infinite: infinite,
            currentIndex: currentIndex,
            setCurrentIndex: handleSwitch,
            setPreviewUrlMap: setPreviewUrlMap,
            registerPreviewUrl: registerPreviewUrl,
            registerPreviewProps: registerPreviewProps,
            visible: visible,
            handleVisibleChange: handleVisibleChange,
        } },
        loopImageIndex(children),
        React.createElement(ImagePreview, __assign({ ref: refPreview, src: "", visible: visible, onVisibleChange: handleVisibleChange }, restProps)),
        forceRender && renderList()));
}
var PreviewGroupComponent = forwardRef(PreviewGroup);
PreviewGroupComponent.displayName = 'ImagePreviewGroup';
export default PreviewGroupComponent;
