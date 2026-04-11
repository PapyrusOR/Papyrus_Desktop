const { contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');

contextBridge.exposeInMainWorld('diagnosticAPI', {
  listDir: (dir) => {
    if (!fs.existsSync(dir)) return 'Directory does not exist';
    
    function listRecursive(currentDir, indent) {
      indent = indent || '';
      let result = '';
      try {
        const items = fs.readdirSync(currentDir);
        for (let i = 0; i < Math.min(items.length, 20); i++) {
          const item = items[i];
          const fullPath = path.join(currentDir, item);
          const stat = fs.statSync(fullPath);
          const size = stat.isFile() ? (' (' + (stat.size / 1024 / 1024).toFixed(2) + ' MB)') : '';
          result += indent + item + size + '\n';
          
          if (stat.isDirectory() && (item === '_internal' || item === 'Papyrus')) {
            result += listRecursive(fullPath, indent + '  ');
          }
        }
        if (items.length > 20) {
          result += indent + '... and ' + (items.length - 20) + ' more items\n';
        }
      } catch (e) {
        result += indent + 'Error: ' + e.message + '\n';
      }
      return result;
    }
    
    return listRecursive(dir);
  }
});
