/** merge multiple children to a string node */
import React from 'react';
import { isString, isNumber } from './is';
var isSingleNode = function (child) {
    return isString(child) || isNumber(child);
};
export default function mergedToString(children) {
    var mergedResult = [''];
    React.Children.forEach(children, function (child) {
        var prevIndex = mergedResult.length - 1;
        var prevChild = mergedResult[prevIndex];
        if (isSingleNode(child) && isSingleNode(prevChild)) {
            mergedResult[prevIndex] = "" + prevChild + child;
        }
        else if (child && child.props && child.props.children) {
            mergedResult.push(mergedToString(child.props.children));
        }
    });
    return mergedResult.join('');
}
