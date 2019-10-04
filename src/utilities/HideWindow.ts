const { ipcRenderer } = window.require('electron');

declare global {
  interface Window {
    require: any;
  }
}

export function hideWindow(event: any) {
  let hideWindow = true;
  event.path.map(object => {
    if (object.id === 'mainElement') {
      hideWindow = false;
    }
  });

  hideWindow && ipcRenderer.send('hideWindow');
}
