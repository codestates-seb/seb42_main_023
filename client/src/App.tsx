import React from 'react';
import GlobalStyles from './GloablStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import SetNickname from './pages/SetNickname';
import RecommendLoan from './pages/RecommendLoan';
import HappyHouse from './pages/HappyHouse';
import AdminReport from './pages/AdminReport';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import Main from './pages/Main';
import store from './store/store';
import Footer from './components/common/Footer';
import HeaderDefault from './components/common/HeaderDefault';
import TempToken from './pages/tempToken';
import MyPage from './pages/MyPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <GlobalStyles />
        <BrowserRouter>
          <HeaderDefault />
          <main>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/posts/:postId/" element={<PostDetail />} />
              <Route path="/posts/create" element={<CreatePost />} />
              <Route path="/posts/update/:postId" element={<UpdatePost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/setnickname" element={<SetNickname />} />
              <Route path="/adminreport" element={<AdminReport />} />
              <Route path="/recommendedloan" element={<RecommendLoan />} />
              <Route path="/happyhouse" element={<HappyHouse />} />
              <Route path="/temptoken" element={<TempToken />} />
              <Route path="/post/" element={<CreatePost />} />
              <Route path="/mypage" element={<MyPage />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
