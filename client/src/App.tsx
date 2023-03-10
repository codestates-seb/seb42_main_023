import GlobalStyles from './GloablStyles';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <header className="header">Header</header>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </main>
      <footer className="footer">Footer</footer>
    </div>
  );
}

export default App;
