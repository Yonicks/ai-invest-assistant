import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import './styles.css';

// @ts-ignore
const base = import.meta.env.BASE_URL; // '/ai-invest-assistant/'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter basename={base}>
    <App />
  </BrowserRouter>
);
