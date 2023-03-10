import GlobalStyles from './GloablStyles';
import React from 'react';
// import Login from './pages/Login';
// import SetNickname from './pages/SetNickname';
import AdminReport from './pages/AdminReport';

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <header className="header">Header</header>
      <main>
        {/* <Login /> */}
        {/* <SetNickname /> */}
        <AdminReport />
      </main>
      <footer className="footer">Footer</footer>
    </div>
  );
}

export default App;
