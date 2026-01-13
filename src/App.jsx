import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes/AppRoutes'
import { ThemeProvider } from './Contexts/ThemeProvider/ThemeProvider';
import CurrencyProvider from './Contexts/CurrencyProvider/CurrencyProvider';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(storedTheme);

  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <CurrencyProvider>
        <BrowserRouter>
          <AppRoutes />
          {/* Toast notifications container */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark" // black bg + white text
          />
        </BrowserRouter>
      </CurrencyProvider>
    </ThemeProvider>
  );
};


export default App