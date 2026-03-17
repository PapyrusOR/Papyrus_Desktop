
import { useState } from 'react';
import TitleBar from './TitleBar';
import Sidebar from './Sidebar';
import StatusBar from './StatusBar';

const App = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <div style={{ width: '1440px', height: '900px', margin: '0 auto', background: '#ffffff', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <TitleBar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <div style={{ flex: 1, overflow: 'auto' }}>
        </div>
      </div>
      <StatusBar />
    </div>
  );
};

export default App;
