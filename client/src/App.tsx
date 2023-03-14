import React from 'react';
import { Provider } from 'react-redux';
import GlobalStyles from './GloablStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostDetail from './pages/PostDetail';
import Main from './pages/Main';
import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <GlobalStyles />
        <BrowserRouter>
          <header className="header">Header</header>
          <main>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/post/:postId/" element={<PostDetail />} />
            </Routes>
          </main>
          <footer className="footer">Footer</footer>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
