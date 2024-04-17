import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import './global.css';

function App() {
  const [isDark, setIsDark] = useState(false);

  const handleThemeMode = () => {
    setIsDark(!isDark);
  };

  return (
    <div theme-mode={isDark ? 'dark' : 'ligth'}>
      <Dashboard isDark={isDark} handleThemeMode={handleThemeMode} />
    </div>
  );
}

export default App;
