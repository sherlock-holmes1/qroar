import { createRoot } from 'react-dom/client';
import '@src/index.css';
import Popup from '@src/Popup';
import { initSentry } from '@extension/shared';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  initSentry();
  const root = createRoot(appContainer);

  root.render(<Popup />);
}

init();
