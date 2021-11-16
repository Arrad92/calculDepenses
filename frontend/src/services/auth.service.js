import axios from "axios";

const API_URL = "http://localhost:8080/User/";

export const AuthenticationService = ()=>{
    const login = (username,password)=>{
        return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.token));
        }

        return response.data;
      });
    }
    const logout = ()=>{
        localStorage.removeItem("user");
    }

    const register = (username,email,password)=>{
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
          });
    }
    const getCurrentUser = ()=>{
        return JSON.parse(localStorage.getItem('user'));
    }
    return {login,logout,register,getCurrentUser};
}

export default AuthenticationService();