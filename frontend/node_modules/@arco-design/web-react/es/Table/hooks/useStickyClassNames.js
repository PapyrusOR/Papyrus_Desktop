import { useMemo } from 'react';
import cs from '../../_util/classNames';
import { isObject } from '../../_util/is';
// get sticky cell's className
function useStickyClassNames(groupColumns, columns, prefixCls) {
    var colFixed = columns.map(function (c) { return c.fixed; });
    function getClassNameFromColumn(column, index) {
        var _a;
        return cs((_a = {},
            _a[prefixCls + "-col-fixed-left"] = column.fixed === 'left',
            _a[prefixCls + "-col-fixed-right"] = column.fixed === 'right',
            _a[prefixCls + "-col-fixed-left-last"] = column.fixed === 'left' &&
                (isObject(columns[index + 1]) ? columns[index + 1].fixed !== 'left' : true),
            _a[prefixCls + "-col-fixed-right-first"] = column.fixed === 'right' &&
                (isObject(columns[index - 1]) ? columns[index - 1].fixed !== 'right' : true),
            _a));
    }
    var stickyClassNames = useMemo(function () {
        return columns.map(function (column, index) { return getClassNameFromColumn(column, index); });
    }, [colFixed.join('-')]);
    var groupStickyClassNames = useMemo(function () {
        return groupColumns.map(function (gc) {
            return gc.map(function (column, i) {
                var index = i;
                var columnIndex = column.$$columnIndex;
                if (Array.isArray(columnIndex) && columnIndex.length === 2) {
                    index = column.fixed === 'right' ? columnIndex[0] : columnIndex[1];
                }
                else if (typeof columnIndex === 'number') {
                    index = columnIndex;
                }
                return getClassNameFromColumn(column, index);
            });
        });
    }, [groupColumns.map(function (c) { return "|" + c.map(function (a) { return a.fixed || 'undefined'; }).join('-') + "|"; }).join('_')]);
    return [groupStickyClassNames, stickyClassNames];
}
export default useStickyClassNames;
