import Cookies from 'js-cookie';

export const checkIsLogin = () => {
  const auth = Cookies.get('Authorization');
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');
  const isLogin = auth && role && name;

  return isLogin;
};
