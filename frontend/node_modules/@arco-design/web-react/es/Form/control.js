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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { Component, isValidElement } from 'react';
import isEqualWith from 'lodash/isEqualWith';
import set from 'lodash/set';
import get from 'lodash/get';
import { FormItemContext } from './context';
import { isArray, isFunction, isNullOrUndefined, isBoolean } from '../_util/is';
import warn from '../_util/warning';
import IconExclamationCircleFill from '../../icon/react-icon/IconExclamationCircleFill';
import IconCloseCircleFill from '../../icon/react-icon/IconCloseCircleFill';
import IconCheckCircleFill from '../../icon/react-icon/IconCheckCircleFill';
import IconLoading from '../../icon/react-icon/IconLoading';
import classNames from '../_util/classNames';
import { isSyntheticEvent, schemaValidate, isFieldMatch, ID_SUFFIX } from './utils';
/**
 * 👀 👀 👀：不要在业务中直接调用，下个大版本将不会对外导出
 */
var Control = /** @class */ (function (_super) {
    __extends(Control, _super);
    function Control(props, context) {
        var _this = _super.call(this, props) || this;
        // 校验信息
        _this.errors = null;
        // 校验 warning 信息
        _this.warnings = null;
        _this.isDestroyed = false;
        // 保存 props.children 或函数类型 props.children() 的返回值
        _this.childrenElement = null;
        // 触发 store 进行状态收集
        // TODO: error, validateStatus ,touched 状态和 UI 组件解耦，统一维护在 store 内部
        _this.triggerStateCollect = function () {
            var innerCollectFormState = _this.context.store.getInnerMethods(true).innerCollectFormState;
            innerCollectFormState();
        };
        // 切换校验状态
        _this.toggleValidateStatus = function (status) {
            _this.validateStatus = status;
            _this.triggerStateCollect();
        };
        // 切换 touch 状态
        _this.toggleTouched = function (touched) {
            _this.touched = isBoolean(touched) ? touched : !_this.touched;
            _this.triggerStateCollect();
        };
        _this.setWarnings = function (warnings) {
            _this.warnings = warnings;
            _this.triggerStateCollect();
        };
        _this.setErrors = function (errors) {
            _this.errors = errors;
            _this.triggerStateCollect();
        };
        _this.getErrors = function () {
            return _this.errors;
        };
        _this.getWarnings = function () {
            return _this.warnings || [];
        };
        _this.isTouched = function () {
            return _this.touched;
        };
        _this.getValidateStatus = function () {
            if (_this.props.validateStatus) {
                return _this.props.validateStatus;
            }
            return _this.validateStatus;
        };
        _this.hasFieldProps = function () {
            return !!_this.props.field;
        };
        _this.clearFormItemError = function (field) {
            if (field === void 0) { field = _this.props.field; }
            // destroy errors
            var updateFormItem = _this.context.updateFormItem;
            updateFormItem && updateFormItem(field, { errors: null, warnings: null });
        };
        _this.updateFormItem = function () {
            if (_this.isDestroyed)
                return;
            _this.forceUpdate();
            var updateFormItem = _this.context.updateFormItem;
            updateFormItem &&
                updateFormItem(_this.props.field, {
                    errors: _this.errors,
                    warnings: _this.warnings,
                });
        };
        _this.getFieldValue = function () {
            var field = _this.props.field;
            var store = _this.context.store;
            return field ? store.getInnerMethods(true).innerGetFieldValue(field) : undefined;
        };
        _this.onStoreChange = function (type, info) {
            var fields = isArray(info.field) ? info.field : [info.field];
            var _a = _this.props, field = _a.field, shouldUpdate = _a.shouldUpdate, dependencies = _a.dependencies;
            // isInner: the value is changed by innerSetValue
            var shouldUpdateItem = function (extra) {
                if (dependencies && shouldUpdate) {
                    warn(true, '`shouldUpdate` of the `Form.Item` will be ignored.');
                }
                if (dependencies) {
                    if (isArray(dependencies) &&
                        dependencies.some(function (depField) { return isFieldMatch(depField, fields); })) {
                        if (_this.isTouched()) {
                            _this.validateField();
                        }
                    }
                }
                else if (shouldUpdate) {
                    var shouldRender = false;
                    if (isFunction(shouldUpdate)) {
                        shouldRender = shouldUpdate(info.prev, info.current, __assign({ field: info.field }, extra));
                    }
                    else {
                        shouldRender = !isEqualWith(info.prev, info.current);
                    }
                    if (shouldRender) {
                        _this.updateFormItem();
                    }
                }
            };
            switch (type) {
                case 'reset':
                    _this.toggleTouched(false);
                    _this.toggleValidateStatus(undefined);
                    _this.setErrors(null);
                    _this.setWarnings(null);
                    // https://github.com/arco-design/arco-design/issues/1460
                    if (dependencies || shouldUpdate) {
                        shouldUpdateItem();
                    }
                    else {
                        // TODO
                        // Keep the previous behavior, removed in the next major release
                        _this.updateFormItem();
                    }
                    break;
                case 'innerSetValue':
                    if (isFieldMatch(field, fields)) {
                        _this.toggleTouched(true);
                        _this.updateFormItem();
                        return;
                    }
                    shouldUpdateItem({
                        isInner: true,
                        isFormList: info.isFormList,
                    });
                    break;
                case 'setFieldValue':
                    if (isFieldMatch(field, fields)) {
                        _this.toggleTouched(true);
                        if (info.data && 'touched' in info.data) {
                            _this.toggleTouched(info.data.touched);
                        }
                        if (info.data && 'warnings' in info.data) {
                            _this.setWarnings(isNullOrUndefined(info.data.warnings) ? [] : [].concat(info.data.warnings));
                        }
                        if (info.data && 'errors' in info.data) {
                            _this.setErrors(info.data.errors);
                        }
                        else if (!isEqualWith(get(info.prev, field), get(info.current, field))) {
                            _this.setErrors(null);
                        }
                        _this.updateFormItem();
                        return;
                    }
                    shouldUpdateItem();
                    break;
                default:
                    break;
            }
        };
        _this.innerSetFieldValue = function (field, value) {
            if (!field)
                return;
            var store = _this.context.store;
            var methods = store.getInnerMethods(true);
            methods.innerSetFieldValue(field, value);
            var changedValue = {};
            set(changedValue, field, value);
            _this.props.onValuesChange &&
                _this.props.onValuesChange(changedValue, __assign({}, store.getFieldsValue()));
        };
        // 仅仅校验下值，不做任何状态变更
        _this.validateFieldOnly = function () {
            var validateMessages = _this.context.validateMessages;
            var _a = _this.props, field = _a.field, rules = _a.rules;
            var value = _this.getFieldValue();
            return schemaValidate(field, value, rules, validateMessages).then(function (_a) {
                var error = _a.error, warning = _a.warning;
                return Promise.resolve({ error: error, value: value, warning: warning, field: field });
            });
        };
        /**
         *
         * @param triggerType the value of validateTrigger.
         * @returns
         */
        _this.validateField = function (triggerType) {
            var _a = _this.context, ctxValidateTrigger = _a.validateTrigger, validateMessages = _a.validateMessages;
            var _b = _this.props, field = _b.field, rules = _b.rules, validateTrigger = _b.validateTrigger;
            var value = _this.getFieldValue();
            // 进入到校验中的状态
            var gotoValidatingStatus = function () {
                var _a;
                var needUpdateItem = _this.errors || ((_a = _this.warnings) === null || _a === void 0 ? void 0 : _a.length);
                _this.toggleValidateStatus('validating');
                _this.setErrors(null);
                _this.setWarnings(null);
                needUpdateItem && _this.updateFormItem();
            };
            var _rules = !triggerType
                ? rules
                : (rules || []).filter(function (rule) {
                    var triggers = [].concat(rule.validateTrigger || validateTrigger || ctxValidateTrigger);
                    return triggers.indexOf(triggerType) > -1;
                });
            if (_rules && _rules.length && field) {
                gotoValidatingStatus();
                return schemaValidate(field, value, _rules, validateMessages).then(function (_a) {
                    var _b;
                    var error = _a.error, warning = _a.warning;
                    _this.setErrors(error ? error[field] : null);
                    _this.setWarnings(warning || null);
                    _this.toggleValidateStatus(_this.errors ? 'error' : ((_b = _this.warnings) === null || _b === void 0 ? void 0 : _b.length) ? 'warning' : 'success');
                    _this.updateFormItem();
                    return Promise.resolve({ error: error, value: value, field: field });
                });
            }
            return Promise.resolve({ error: null, value: value, field: field });
        };
        // 每次 render 都会作为 onChange 传递给 children，需要保证引用地址不变
        // 所以 handleTrigger 需要声明在类上，并且直接作为 children.props.onChange
        _this.handleTrigger = function (_value) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var children = (_this.childrenElement || _this.props.children);
            var store = _this.context.store;
            var _b = _this.props, field = _b.field, trigger = _b.trigger, normalize = _b.normalize, getValueFromEvent = _b.getValueFromEvent;
            var value = isFunction(getValueFromEvent) ? getValueFromEvent.apply(void 0, __spreadArray([_value], __read(args), false)) : _value;
            var normalizeValue = value;
            // break if value is instance of SyntheticEvent, 'cos value is missing
            if (isSyntheticEvent(value)) {
                warn(true, 'changed value missed, please check whether extra elements is outta input/select controled by Form.Item');
                value.stopPropagation();
                return;
            }
            if (typeof normalize === 'function') {
                normalizeValue = normalize(value, store.getFieldValue(field), __assign({}, store.getFieldsValue()));
            }
            _this.toggleTouched(true);
            _this.innerSetFieldValue(field, normalizeValue);
            _this.validateField(trigger);
            if (isValidElement(children) && children.props && children.props[trigger]) {
                if (!_this.props.isFormList) {
                    // https://github.com/arco-design/arco-design/issues/1886
                    (_a = children.props)[trigger].apply(_a, __spreadArray([normalizeValue], __read(args), false));
                }
            }
        };
        _this.getChild = function () {
            var children = _this.props.children;
            var store = _this.context.store;
            var child = children;
            if (isFunction(children)) {
                child = children(store.getFields(), __assign({}, store), _this.props.isFormList && {
                    value: _this.getFieldValue(),
                    onChange: _this.handleTrigger,
                });
            }
            _this.childrenElement = child;
            return child;
        };
        if ('initialValue' in props && _this.hasFieldProps()) {
            var innerMethods = context.store.getInnerMethods(true);
            innerMethods.innerSetInitialValue(props.field, props.initialValue);
        }
        return _this;
    }
    Control.prototype.componentDidMount = function () {
        var store = this.context.store;
        if (store) {
            var innerMethods = store.getInnerMethods(true);
            this.removeRegisterField = innerMethods.registerField(this);
        }
        this.isDestroyed = false;
    };
    Control.prototype.componentDidUpdate = function (prevProps) {
        // key 未改变，但 field 改变了，则需要把绑定在之前 prevProps.field 上的错误状态调整到 props.field
        // 一般会把 field 直接作为 control 的 key，他们会同步变动，不会触发此逻辑
        // 在 FormList 下，`FormItem` 顺序会被改变，为了保证校验状态被保留，key 不会改变但 field 和字段顺序有关
        if (prevProps.field !== this.props.field &&
            this.props._key &&
            prevProps._key === this.props._key) {
            this.updateFormItem();
            this.clearFormItemError(prevProps.field);
        }
    };
    Control.prototype.componentWillUnmount = function () {
        this.removeRegisterField && this.removeRegisterField();
        this.removeRegisterField = null;
        this.clearFormItemError();
        this.isDestroyed = true;
    };
    /**
     * 收集rules里的validateTrigger字段
     */
    Control.prototype.getValidateTrigger = function () {
        var _validateTrigger = this.props.validateTrigger || this.context.validateTrigger || 'onChange';
        var rules = this.props.rules || [];
        var result = [];
        rules.map(function (item) {
            result = result.concat(item.validateTrigger || _validateTrigger);
        });
        return Array.from(new Set(result));
    };
    Control.prototype.renderControl = function (children, id) {
        var _a;
        var _this = this;
        var _b;
        var _c = this.props, field = _c.field, _d = _c.trigger, trigger = _d === void 0 ? 'onChange' : _d, _e = _c.triggerPropName, triggerPropName = _e === void 0 ? 'value' : _e, validateStatus = _c.validateStatus, formatter = _c.formatter;
        var _f = this.context, store = _f.store, ctxDisabled = _f.disabled;
        var disabled = 'disabled' in this.props ? this.props.disabled : ctxDisabled;
        var child = React.Children.only(children);
        var childProps = {
            // used by label
            id: classNames(((_b = child.props) === null || _b === void 0 ? void 0 : _b.id) || (_a = {}, _a["" + id + ID_SUFFIX] = id, _a)),
        };
        this.getValidateTrigger().forEach(function (vt) {
            childProps[vt] = function (e) {
                var _a, _b;
                _this.validateField(vt);
                ((_a = child.props) === null || _a === void 0 ? void 0 : _a[vt]) && ((_b = child.props) === null || _b === void 0 ? void 0 : _b[vt](e));
            };
        });
        childProps[trigger] = this.handleTrigger;
        if (disabled !== undefined && !('disabled' in child.props)) {
            childProps.disabled = disabled;
        }
        // 保持引用地址不变，fix https://github.com/arco-design/arco-design/issues/1800
        var _value = get(store.getInnerMethods(true).innerGetStore(), field);
        if (isFunction(formatter)) {
            _value = formatter(_value);
        }
        childProps[triggerPropName] = _value;
        if (!validateStatus && this.errors) {
            childProps.error = true;
        }
        return React.cloneElement(child, childProps);
    };
    Control.prototype.render = function () {
        var _a = this.props, noStyle = _a.noStyle, field = _a.field, isFormList = _a.isFormList, hasFeedback = _a.hasFeedback;
        var validateStatus = this.getValidateStatus();
        var _b = this.context, prefixCls = _b.prefixCls, getFormElementId = _b.getFormElementId;
        var child = this.getChild();
        var id = this.hasFieldProps() ? getFormElementId(field) : undefined;
        if (this.hasFieldProps() && !isFormList && React.Children.count(child) === 1) {
            child = this.renderControl(child, id);
        }
        if (noStyle) {
            return child;
        }
        return (React.createElement("div", { className: prefixCls + "-item-control-wrapper" },
            React.createElement("div", { className: prefixCls + "-item-control", id: id },
                React.createElement("div", { className: prefixCls + "-item-control-children" },
                    child,
                    validateStatus && hasFeedback && (React.createElement("div", { className: prefixCls + "-item-feedback " + prefixCls + "-item-feedback-" + validateStatus },
                        validateStatus === 'warning' && React.createElement(IconExclamationCircleFill, null),
                        validateStatus === 'success' && React.createElement(IconCheckCircleFill, null),
                        validateStatus === 'error' && React.createElement(IconCloseCircleFill, null),
                        validateStatus === 'validating' && React.createElement(IconLoading, null)))))));
    };
    Control.defaultProps = {
        trigger: 'onChange',
        triggerPropName: 'value',
    };
    Control.isFormControl = true;
    Control.contextType = FormItemContext;
    return Control;
}(Component));
export default Control;
