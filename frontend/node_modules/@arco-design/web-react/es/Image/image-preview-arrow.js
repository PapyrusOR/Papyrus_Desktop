import React, { useContext } from 'react';
import IconLeft from '../../icon/react-icon/IconLeft';
import IconRight from '../../icon/react-icon/IconRight';
import { ConfigContext } from '../ConfigProvider';
import cs from '../_util/classNames';
function ImagePreviewArrow(props) {
    var _a, _b;
    var current = props.current, previewCount = props.previewCount, _c = props.infinite, infinite = _c === void 0 ? false : _c, onPrev = props.onPrev, onNext = props.onNext;
    var getPrefixCls = useContext(ConfigContext).getPrefixCls;
    var prefixCls = getPrefixCls('image-preview');
    var classNames = cs(prefixCls + "-arrow");
    var disableLeft = !infinite && current <= 0;
    var disableRight = !infinite && current >= previewCount - 1;
    return (React.createElement("div", { className: classNames },
        React.createElement("div", { className: cs(prefixCls + "-arrow-left", (_a = {},
                _a[prefixCls + "-arrow-disabled"] = disableLeft,
                _a)), onClick: function (e) {
                e.preventDefault();
                !disableLeft && (onPrev === null || onPrev === void 0 ? void 0 : onPrev());
            } },
            React.createElement(IconLeft, null)),
        React.createElement("div", { className: cs(prefixCls + "-arrow-right", (_b = {},
                _b[prefixCls + "-arrow-disabled"] = disableRight,
                _b)), onClick: function (e) {
                e.preventDefault();
                !disableRight && (onNext === null || onNext === void 0 ? void 0 : onNext());
            } },
            React.createElement(IconRight, null))));
}
export default ImagePreviewArrow;
