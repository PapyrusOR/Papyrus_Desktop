export default function mergeProps(_componentProps, _defaultProps, _globalComponentConfig, propsNameList) {
    var defaultProps = _defaultProps || {};
    var globalComponentConfig = _globalComponentConfig || {};
    var componentProps = _componentProps || {};
    var propNameSet = propsNameList
        ? new Set(propsNameList)
        : new Set(Object.keys(componentProps)
            .concat(Object.keys(defaultProps))
            .concat(Object.keys(globalComponentConfig)));
    var props = {};
    propNameSet.forEach(function (propName) {
        if (componentProps[propName] !== undefined) {
            props[propName] = componentProps[propName];
        }
        else if (propName in globalComponentConfig) {
            props[propName] = globalComponentConfig[propName];
        }
        else if (propName in defaultProps) {
            props[propName] = defaultProps[propName];
        }
    });
    return props;
}
