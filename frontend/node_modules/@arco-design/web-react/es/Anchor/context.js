import { createContext } from 'react';
export default createContext({
    direction: 'vertical',
    currentLink: '',
    onLinkClick: function () { },
    addLink: function () { },
    removeLink: function () { },
});
