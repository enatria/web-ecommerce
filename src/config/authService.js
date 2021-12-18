import { getAccessToken, getAdmin } from './tokenCreator';
import axios from 'axios'
function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


export const authenticate = async (auth) => {
  if (validateEmail(auth.username)) {
    if (auth.username === "admin@bukapedia.com" && auth.password === "admin123") {
      return { status: "admin", data: { user: "admin", email: "admin@bukapedia.com", token: "admin@bukapedia.com" } }
    }
    else {
      return { status: false, data: "Email dan Password tidak terdaftar!" };
    }
  } else {
    try {
      let res = await axios.post('https://fakestoreapi.com/auth/login', { username: auth.username, password: auth.password })
      let data = await res.data;
      return { status: "true", data: { user: "user", token: data.token } };
    } catch (error) {
      console.log(error.response); // this is the main part. Use the response property from the error object
      if (error.response.status === 401) {
        return { status: false, data: "Username dan Password tidak terdaftar!" };
      } else {
        return { status: false, data: "Terjadi Kesalahan!" };
      }
    }
  };
}

export const isAuthenticated = () => {
  return getAccessToken() ? true : false;
};
export const isAdmin = () => {
  return getAdmin() ? true : false;
};
