const { ipcRenderer } = window.require('electron');

declare global {
  interface Window {
    require: any;
  }
}

export function hideWindow(event: any) {
  if (event.toElement.id !== 'mainElement') {
    ipcRenderer.send('hideWindow');
  }
}