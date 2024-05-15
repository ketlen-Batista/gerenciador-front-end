// import React, { useState } from 'react';
// import './global.css';
// import Dashboard from './pages/Dashboard';
// function App() {
//   const [isDark, setIsDark] = useState(false);
//   const handleThemeMode = () => {
//     setIsDark(!isDark);
//   };
//   return (
//     <div theme-mode={isDark ? 'dark' : 'ligth'}>
//       <Dashboard isDark={isDark} handleThemeMode={handleThemeMode} />
//     </div>
//   );
// }
// export default App;
import React, { useState } from 'react';

import { router } from '@routes/router';
import { RouterProvider } from 'react-router-dom';

import './global.css';

function App() {
  // const [isDark, setIsDark] = useState(false);

  // const handleThemeMode = () => {
  //   setIsDark(!isDark);
  // };

  return (
    // <div theme-mode={isDark ? 'dark' : 'ligth'}>
    <RouterProvider router={router} />
    // </div>
  );
}

export default App;
