import escapeRegExp from 'lodash/escapeRegExp';
import React, { cloneElement } from 'react';
import { isArray } from './is';
export default function getHighlightText(_a) {
    var nodeList = _a.nodeList, pattern = _a.pattern, highlightClassName = _a.highlightClassName;
    if (!pattern) {
        return nodeList;
    }
    var transformNode = function (node) {
        if (node && node.props && typeof node.props.children === 'string') {
            return cloneElement(node, undefined, React.createElement(HighlightText, { text: node.props.children, keyword: pattern, highlightClassName: highlightClassName }));
        }
        return node;
    };
    return isArray(nodeList) ? nodeList.map(function (node) { return transformNode(node); }) : transformNode(nodeList);
}
function HighlightText(_a) {
    var text = _a.text, keyword = _a.keyword, highlightClassName = _a.highlightClassName;
    if (!keyword)
        return React.createElement(React.Fragment, null, text);
    // limit keyword length to avoid Regular expression too large error
    if (keyword.length > 1000) {
        keyword = keyword.slice(0, 1000);
    }
    // 注意这里的括号，这里使用了带capture group功能的正则，来split字符串
    // 从而在strArr中可以保留匹配文本
    var re = new RegExp("(" + escapeRegExp(keyword) + ")", 'i');
    var strArr = text.split(re);
    return (React.createElement(React.Fragment, null, strArr.map(function (item, index) {
        return re.test(item) ? (React.createElement("span", { key: index, className: highlightClassName }, item)) : (React.createElement("span", { key: index }, item));
    })));
}
