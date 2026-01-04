import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes/AppRoutes'
import { ThemeProvider } from './ThemeProvider/ThemeProvider';

const App = () => {
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(storedTheme);
  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App