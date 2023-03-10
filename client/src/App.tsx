import GlobalStyles from './GloablStyles';
import React from 'react';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <header className="header">Header</header>
      <main>
        <Login />
      </main>
      <footer className="footer">Footer</footer>
    </div>
  );
}

export default App;
