import React from 'react';
import GlobalStyles from './GloablStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import PostDetail from './pages/PostDetail';
import store from './store/store';
import Main from './pages/Main';

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
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
      </Provider>
    </div>
  );
};

export default App;
