import ReactDOM from 'react-dom/client';
import 'src/index.css';
import { Provider } from 'react-redux';
import { WrappedApp } from 'app/App';
import { store } from 'src/store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <WrappedApp />
  </Provider>
);
