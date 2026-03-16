import React from 'react';
export interface PortalProps {
    /** Portal 挂载的容器 */
    getContainer: () => HTMLElement;
    children?: React.ReactNode;
}
declare const Portal: (props: PortalProps) => React.ReactPortal;
export default Portal;
