import axios from "axios";
import {host} from '../././const.js'

const API_URL = host+"User/";

export const AuthenticationService = ()=>{
    const login = (username,password)=>{
        return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem("user",JSON.stringify({token:response.data.replace('{token:','').replace('}','').trim()}) );
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