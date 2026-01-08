import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes/AppRoutes'
import { ThemeProvider } from './Contexts/ThemeProvider/ThemeProvider';
import CurrencyProvider from './Contexts/CurrencyProvider/CurrencyProvider';

const App = () => {
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(storedTheme);

  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <CurrencyProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CurrencyProvider>
    </ThemeProvider>
  );
};


export default App