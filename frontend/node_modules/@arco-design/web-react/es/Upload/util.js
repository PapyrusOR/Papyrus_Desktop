import { isArray, isObject } from '../_util/is';
export var isAcceptFile = function (file, propsAccept) {
    var accept = isObject(propsAccept) ? propsAccept === null || propsAccept === void 0 ? void 0 : propsAccept.type : propsAccept;
    // 显示设置 strict=false，才是非严格模式，不走过滤逻辑
    var strict = !(isObject(propsAccept) && propsAccept.strict === false);
    if (strict && accept && file) {
        var accepts = isArray(accept)
            ? accept
            : accept
                .split(',')
                .map(function (x) { return x.trim(); })
                .filter(function (x) { return x; });
        var fileExtension_1 = (file.name.indexOf('.') > -1 ? "." + file.name.split('.').pop() : '').toLowerCase();
        return accepts.some(function (type) {
            var typeText = type && type.toLowerCase();
            var fileType = (file.type || '').toLowerCase();
            var baseFileType = fileType.split('/')[0]; // audio/mpeg => audio;
            // `${baseFileType}/${fileExtension}` === typeText
            // filetype is audio/mpeg, but accept is audio/mp3, should return true
            if (typeText === fileType ||
                "" + baseFileType + fileExtension_1.replace('.', '/') === typeText) {
                // 类似excel文件这种
                // 比如application/vnd.ms-excel和application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
                // 本身就带有.字符的，不能走下面的.jpg等文件扩展名判断处理
                // 所以优先对比input的accept类型和文件对象的type值
                return true;
            }
            // */*,*  之类的所有类型
            if (/^\*(\/\*)?$/.test(typeText)) {
                return true;
            }
            if (/\/\*/.test(typeText)) {
                // image/* 这种通配的形式处理
                return fileType.replace(/\/.*$/, '') === typeText.replace(/\/.*$/, '');
            }
            if (/\..*/.test(typeText)) {
                // .jpg 等后缀名
                var suffixList = [typeText];
                // accept=".jpg", jpeg后缀类型同样可以上传，反之亦然
                if (typeText === '.jpg' || typeText === '.jpeg') {
                    suffixList = ['.jpg', '.jpeg'];
                }
                return suffixList.indexOf(fileExtension_1) > -1;
            }
            return false;
        });
    }
    return !!file;
};
export var getFiles = function (fileList, accept) {
    if (!fileList) {
        return;
    }
    var files = [].slice.call(fileList);
    if (accept) {
        files = files.filter(function (file) {
            return isAcceptFile(file, accept);
        });
    }
    return files;
};
export var loopDirectory = function (items, accept, callback) {
    var files = [];
    var restFileCount = 0; // 剩余上传文件的数量
    var onFinish = function () {
        !restFileCount && callback(files);
    };
    var _loopDirectory = function (item) {
        restFileCount += 1;
        if (item === null || item === void 0 ? void 0 : item.isFile) {
            item.file(function (file) {
                restFileCount -= 1;
                if (isAcceptFile(file, accept)) {
                    Object.defineProperty(file, 'webkitRelativePath', {
                        value: item.fullPath.replace(/^\//, ''),
                    });
                    files.push(file);
                }
                onFinish();
            });
            return;
        }
        if (item === null || item === void 0 ? void 0 : item.isDirectory) {
            // item 是个文件夹
            var reader_1 = item.createReader();
            var flag_1 = false;
            var readEntries_1 = function () {
                reader_1.readEntries(function (entries) {
                    if (!flag_1) {
                        restFileCount -= 1;
                        flag_1 = true;
                    }
                    if (entries.length === 0) {
                        onFinish();
                    }
                    else {
                        readEntries_1(); // the maximum files read using readEntries is 100
                        entries.forEach(_loopDirectory);
                    }
                });
            };
            readEntries_1();
            return;
        }
        restFileCount -= 1;
        onFinish();
    };
    var list = [].slice.call(items);
    list.forEach(function (item) {
        if (item.webkitGetAsEntry) {
            _loopDirectory(item.webkitGetAsEntry());
        }
    });
};
