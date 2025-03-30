import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { StyledEngineProvider } from '@mui/material/styles'; // Import StyledEngineProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Force MUI to use styled-components instead of Emotion */}
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

