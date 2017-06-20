import Cookies from 'js-cookie';

class AuthService {
  loggedIn() {
    return !!this.getToken();
  }

  getToken() {
    return Cookies.get('token');
  }

  logout() {
    Cookies.remove('token');
  }
}

export default AuthService;
