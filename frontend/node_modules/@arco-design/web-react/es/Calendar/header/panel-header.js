import React from 'react';
import IconLeft from '../../../icon/react-icon/IconLeft';
import IconRight from '../../../icon/react-icon/IconRight';
import IconDoubleLeft from '../../../icon/react-icon/IconDoubleLeft';
import IconDoubleRight from '../../../icon/react-icon/IconDoubleRight';
import { isArray } from '../../_util/is';
import cs from '../../_util/classNames';
function PanelHeader(props) {
    var prefixCls = props.prefixCls, changePageShowDate = props.changePageShowDate, headerValueFormat = props.headerValueFormat, mergedPageShowDate = props.mergedPageShowDate, innerMode = props.innerMode, panelOperations = props.panelOperations;
    var isOperationAvailable = function (operation) {
        return isArray(panelOperations) ? panelOperations.indexOf(operation) > -1 : true;
    };
    var showDoubleLeft = isOperationAvailable('double-left');
    var showLeft = isOperationAvailable('left') && innerMode !== 'year';
    var showDoubleRight = isOperationAvailable('double-right');
    var showRight = isOperationAvailable('right') && innerMode !== 'year';
    var getIconClassName = function (isShow) {
        var _a;
        return cs(prefixCls + "-header-icon", (_a = {}, _a[prefixCls + "-header-icon-hidden"] = !isShow, _a));
    };
    return (React.createElement("div", { className: prefixCls + "-header" },
        React.createElement("div", { className: getIconClassName(showDoubleLeft), onClick: function () { return showDoubleLeft && changePageShowDate('prev', 'year'); } }, showDoubleLeft && React.createElement(IconDoubleLeft, null)),
        React.createElement("div", { className: getIconClassName(showLeft), onClick: function () { return showLeft && changePageShowDate('prev', 'month'); } }, showLeft && React.createElement(IconLeft, null)),
        React.createElement("div", { className: prefixCls + "-header-value" }, mergedPageShowDate.format(headerValueFormat)),
        React.createElement("div", { className: getIconClassName(showRight), onClick: function () { return showRight && changePageShowDate('next', 'month'); } }, showRight && React.createElement(IconRight, null)),
        React.createElement("div", { className: getIconClassName(showDoubleRight), onClick: function () { return showDoubleRight && changePageShowDate('next', 'year'); } }, showDoubleRight && React.createElement(IconDoubleRight, null))));
}
export default PanelHeader;
