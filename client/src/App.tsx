import React from 'react';
import GlobalStyles from './GloablStyles';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
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

const App: React.FC = () => {
  // const [isLogin, setIsLogin] = useState(false);
  // const [accessToken, setAccessToken] = useState('');

  // const getAccessToken = async (authorizationCode: any) => {
  //   axios.post('http://localhost:4000/callback', {authorizationCode})
  //   .then(res => {
  //     setAccessToken(res.data.accessToken)
  //     setIsLogin(true)
  //   })

  // useEffect(() => {
  //   // Authorization Server로부터 클라이언트로 리디렉션된 경우, Authorization Code가 함께 전달됩니다.
  //   // ex) http://localhost:3000/mypage?code=5e52fb85d6a1ed46a51f
  //   const url = new URL(window.location.href);
  //   const authorizationCode = url.searchParams.get('code');
  //   if (authorizationCode) {
  //     getAccessToken(authorizationCode);
  //   }
  // }, []);

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
              <Route path="/post/:postId/" element={<PostDetail />} />
              <Route path="/post/" element={<CreatePost />} />
              <Route path="/post/update" element={<UpdatePost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/setnickname" element={<SetNickname />} />
              <Route path="/adminreport" element={<AdminReport />} />
              <Route path="/recommendedloan" element={<RecommendLoan />} />
              <Route path="/happyhouse" element={<HappyHouse />} />
              <Route path="/posts/create" element={<CreatePost />} />
              <Route path="/posts/update" element={<UpdatePost />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
