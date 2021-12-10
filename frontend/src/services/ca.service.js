import axios from 'axios';
import {host} from '../././const.js'
import authHeader from './auth-header.js';

const API_URL = host+"Revenu/";
export const CAService = ()=>{

    const listCA = ()=>{
        return axios
      .post(API_URL + "all", {
        
      },{ headers: authHeader() })
      .then(response => {
        return response.data;
      }).catch((err)=>{
          
          if(err.response.status == 403){
              localStorage.removeItem("user");
            return 403;
          }
        console.log(err);
    });
    }
    const createCA = (ca)=>{
        return axios
      .post(API_URL + "create", ca,{ headers: authHeader() })
      .then(response => {
        return response.data;
      }).catch((err)=>{
          
        if(err.response.status == 403){
            localStorage.removeItem("user");
          return 403;
        }
      console.log(err);
  });;
    }
    const deleteCA = (id)=>{
        return axios
      .post(API_URL + "delete?id="+id, {},{ headers: authHeader() })
      .then(response => {
        return response.data;
      }).catch((err)=>{
          
        if(err.response.status == 403){
            localStorage.removeItem("user");
          return 403;
        }
      console.log(err);
  });
    }

    return {listCA,createCA,deleteCA};

}