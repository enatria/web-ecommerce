export const setTokens = (authRes) => {;
    localStorage.setItem('token', JSON.stringify(authRes.token));
  };

  export const setAdmin = (authRes) => {
    localStorage.setItem('admin', JSON.stringify(authRes.user));
    localStorage.setItem('token', JSON.stringify(authRes.token));
  };

  export const removeTokens = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
  };
  export const getAccessToken = () => localStorage.getItem('token')?.slice(1, -1);
  export const getAdmin = () => localStorage.getItem('admin')?.slice(1, -1);
  export const getUser = () => localStorage.getItem('user');
  export const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));
  