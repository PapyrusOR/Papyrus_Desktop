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
import React from 'react';
import Button from '../../../Button';
import Tag from '../../../Tag';
import { IconSearch } from '../../../../icon';
import { NOOP } from '../../../_util/constant';
export var columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Sex',
        dataIndex: 'sex',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
];
export var columnsSorter = (function () {
    return columns.map(function (d) {
        if (d.title === 'Age') {
            return __assign(__assign({}, d), { defaultSortOrder: 'ascend', sorter: function (a, b) { return a.age - b.age; } });
        }
        return d;
    });
})();
export var columnsFilter = (function () {
    return columns.map(function (d) {
        if (d.title === 'Sex') {
            return __assign(__assign({}, d), { defaultFilters: ['male'], filters: [
                    {
                        text: 'Male',
                        value: 'male',
                    },
                    {
                        text: 'Female',
                        value: 'female',
                    },
                ], onFilter: function (value, row) { return row.sex === value; } });
        }
        return d;
    });
})();
export var columnsFilterCustom = (function () {
    return columns.map(function (d) {
        if (d.title === 'Sex') {
            return __assign(__assign({}, d), { filterIcon: React.createElement(IconSearch, null), filterDropdown: function (_a) {
                    var setFilterKeys = _a.setFilterKeys, confirm = _a.confirm;
                    return (React.createElement("div", { className: "arco-table-custom-filter" },
                        React.createElement(Button, { onClick: function () {
                                setFilterKeys(['male'], NOOP);
                            } }, "set value"),
                        React.createElement(Button, { onClick: function () {
                                confirm();
                            } }, "ok")));
                }, onFilter: function (value, row) { return row.sex === value; } });
        }
        return d;
    });
})();
export var columnsCustomRender = (function () {
    return columns.map(function (d) {
        if (d.title === 'Sex') {
            return __assign(__assign({}, d), { render: function (col) {
                    return React.createElement(Tag, null, col);
                } });
        }
        return d;
    });
})();
export var columnsFixedColumns = (function () {
    return columns.map(function (d) {
        if (d.title === 'Name') {
            return __assign(__assign({}, d), { fixed: 'left', width: 100 });
        }
        if (d.title === 'Email') {
            return __assign(__assign({}, d), { fixed: 'right', width: 120 });
        }
        return d;
    });
})();
export var columnsCustomStyle = (function () {
    return columns.map(function (d) {
        if (d.title === 'Name') {
            return __assign(__assign({}, d), { className: 'red', headerCellStyle: {
                    backgroundColor: 'rgb(0, 0, 0)',
                    color: 'rgb(255, 255, 255)',
                }, bodyCellStyle: {
                    color: 'rgb(255, 255, 255)',
                } });
        }
        if (d.title === 'Address') {
            return __assign(__assign({}, d), { cellStyle: {
                    color: 'rgb(1, 1, 1)',
                } });
        }
        return d;
    });
})();
export var columnsGroupColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Other',
        children: [
            {
                title: 'Address',
                dataIndex: 'address',
            },
            {
                title: 'Sex',
                dataIndex: 'sex',
            },
            {
                title: 'Age',
                dataIndex: 'age',
            },
        ],
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
];
export var multipleSorterColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: function (a, b) {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        },
    },
    {
        title: 'Age',
        dataIndex: 'age',
        sorter: function (a, b) { return a.age - b.age; },
    },
    {
        title: 'Score A',
        dataIndex: 'scoreA',
        defaultSortOrder: 'descend',
        sorter: {
            compare: function (a, b) { return a.scoreA - b.scoreA; },
            multiple: 3,
        },
    },
    {
        title: 'Score B',
        dataIndex: 'scoreB',
        defaultSortOrder: 'ascend',
        sorter: {
            compare: function (a, b) { return a.scoreB - b.scoreB; },
            multiple: 2,
        },
    },
    {
        title: 'Score C',
        dataIndex: 'scoreC',
        defaultSortOrder: 'descend',
        sorter: {
            compare: function (a, b) { return a.scoreC - b.scoreC; },
            multiple: 1,
        },
    },
];
