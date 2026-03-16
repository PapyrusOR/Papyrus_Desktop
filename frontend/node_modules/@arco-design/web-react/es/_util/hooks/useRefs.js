// 保存一个ref列表
import { useRef } from 'react';
export default function useRefs(defaultValue) {
    if (defaultValue === void 0) { defaultValue = []; }
    var listRef = useRef(defaultValue);
    var setListRef = function (element, index) {
        if (index !== undefined) {
            listRef.current[index] = element;
        }
        else {
            listRef.current.push(element);
        }
    };
    return [listRef.current, setListRef];
}
