import { ColorPickerMode } from './interface';
export var getMode = function (mode) {
    if (Array.isArray(mode) && mode.length === 1) {
        return mode[0];
    }
    return mode;
};
export var isSingleMode = function (mode) {
    return getMode(mode) === ColorPickerMode.Single;
};
export var isGradientMode = function (mode) {
    return getMode(mode) === ColorPickerMode.Gradient;
};
export var isMultiMode = function (mode) {
    return Array.isArray(getMode(mode));
};
export var getInitialActiveMode = function (mode) {
    if (isMultiMode(mode)) {
        return ColorPickerMode.Gradient;
    }
    return mode;
};
export var getModeByValue = function (value, defaultValue, mode) {
    if (value && Array.isArray(value)) {
        return ColorPickerMode.Gradient;
    }
    if (value && typeof value === 'string') {
        return ColorPickerMode.Single;
    }
    if (defaultValue && Array.isArray(defaultValue)) {
        return ColorPickerMode.Gradient;
    }
    if (defaultValue && typeof defaultValue === 'string') {
        return ColorPickerMode.Single;
    }
    return getInitialActiveMode(mode);
};
