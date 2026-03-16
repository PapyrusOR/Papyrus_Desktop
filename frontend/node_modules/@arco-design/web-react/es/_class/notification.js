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
/* eslint-disable react/no-unused-state */
import { Component } from 'react';
function getId(noticeProps) {
    if (noticeProps === null || noticeProps === void 0 ? void 0 : noticeProps.id) {
        return noticeProps === null || noticeProps === void 0 ? void 0 : noticeProps.id;
    }
    return "arco_notice_id_" + Math.random().toFixed(10).slice(2);
}
var BaseNotice = /** @class */ (function (_super) {
    __extends(BaseNotice, _super);
    function BaseNotice(props) {
        var _this = _super.call(this, props) || this;
        _this.add = function (noticeProps) {
            var id = getId(noticeProps);
            var oldNotices = _this.state.notices;
            // update notice
            if (noticeProps.id && ~oldNotices.findIndex(function (notice) { return notice.id === noticeProps.id; })) {
                _this.update(noticeProps);
            }
            else {
                _this.setState(function (prevState) {
                    return {
                        notices: prevState.notices.concat(__assign(__assign({}, noticeProps), { id: id })),
                        position: noticeProps.position,
                    };
                });
            }
            return id;
        };
        _this.update = function (newNotice) {
            _this.setState(function (prevState) {
                var updatedNotices = prevState.notices.map(function (oldNotice) {
                    return newNotice.id === oldNotice.id ? newNotice : oldNotice;
                });
                return {
                    notices: updatedNotices,
                };
            }, function () {
                _this.setState(function (prevState) {
                    var notices = prevState.notices.map(function (notice) {
                        if (newNotice.id === notice.id && notice.update) {
                            delete notice.update;
                        }
                        return notice;
                    });
                    return { notices: notices };
                });
            });
        };
        _this.clear = function () {
            _this.setState({
                notices: [],
            });
        };
        _this.state = {
            notices: [],
            position: 'topRight',
        };
        _this.remove = _this.remove.bind(_this);
        return _this;
    }
    BaseNotice.prototype.remove = function (id) {
        this.setState(function (state) {
            var newNotices = state.notices.filter(function (notice) { return notice.id !== id; });
            return {
                notices: newNotices,
            };
        });
    };
    return BaseNotice;
}(Component));
export default BaseNotice;
