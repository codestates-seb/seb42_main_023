import React from 'react';

import GlobalStyles from './GloablStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import Main from './pages/Main';
import store from './store/store';

const App: React.FC = () => {
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
              <Route path="/post/" element={<CreatePost />} />
              <Route path="/post/update" element={<UpdatePost />} />
            </Routes>
          </main>
          <footer className="footer">Footer</footer>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
