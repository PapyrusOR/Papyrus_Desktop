import React, { useRef, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { scrollTo } from './util';
import cs from '../_util/classNames';
import usePrevious from '../_util/hooks/usePrevious';
export default function TimeColumn(props) {
    var prefixCls = props.prefixCls, list = props.list, value = props.value, onHandleSelect = props.onHandleSelect, unit = props.unit, popupVisible = props.popupVisible, scrollSticky = props.scrollSticky;
    var lis = useRef(new Map());
    var wrapper = useRef();
    var ul = useRef();
    var listItemHeight = useRef(0);
    var prevPopupVisible = usePrevious(popupVisible);
    var prevScrollTop = useRef(wrapper.current && wrapper.current.scrollTop);
    useEffect(function () {
        var li = lis.current.get(value);
        if (li && popupVisible && prevPopupVisible) {
            scrollTo(wrapper.current, li.offsetTop, 150);
            prevScrollTop.current = li.offsetTop;
        }
    }, [value]);
    useEffect(function () {
        if (popupVisible && popupVisible !== prevPopupVisible) {
            var li = lis.current.get(value);
            if (li) {
                scrollTo(wrapper.current, li.offsetTop, 0);
                prevScrollTop.current = li.offsetTop;
            }
        }
    }, [popupVisible, prevPopupVisible]);
    useEffect(function () {
        if (list.length <= 1) {
            return;
        }
        listItemHeight.current =
            (ul.current.clientHeight - wrapper.current.clientHeight) / (list.length - 1);
    }, [list.length]);
    var onScrollList = useCallback(debounce(function () {
        var mathFunc = wrapper.current.scrollTop - prevScrollTop.current > 0 ? Math.ceil : Math.floor;
        var index = mathFunc(wrapper.current.scrollTop / listItemHeight.current);
        if (index !== value && list[index] && !list[index].disabled) {
            onHandleSelect(list[index].value, unit);
        }
    }, 100), [onHandleSelect]);
    return (React.createElement("div", { className: cs(prefixCls + "-list"), ref: wrapper, onWheel: scrollSticky ? onScrollList : undefined },
        React.createElement("ul", { ref: ul }, list.map(function (item) {
            var _a;
            return (React.createElement("li", { key: item.value, className: cs(prefixCls + "-cell", (_a = {},
                    _a[prefixCls + "-cell-disabled"] = item.disabled,
                    _a[prefixCls + "-cell-selected"] = item.selected,
                    _a)), onClick: function () { return !item.disabled && onHandleSelect(item.value, unit); }, ref: function (element) {
                    lis.current.set(item.value, element);
                } },
                React.createElement("div", { className: prefixCls + "-cell-inner" }, item.label)));
        }))));
}
