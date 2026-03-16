import { createContext } from 'react';
export var PreviewGroupContext = createContext({
    previewGroup: false,
    previewUrlMap: new Map(),
    previewPropsMap: new Map(),
    infinite: true,
    currentIndex: 0,
    setCurrentIndex: function () { return null; },
    setPreviewUrlMap: function () { return null; },
    registerPreviewUrl: function () { return null; },
    registerPreviewProps: function () { return null; },
    visible: false,
    handleVisibleChange: function () { return null; },
});
