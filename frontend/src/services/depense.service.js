
import axios from 'axios';
import {host} from '../././const.js'
import authHeader from './auth-header.js';

const API_URL = host+"Depense/";
export const DepenseService = ()=>{
    
    const listDepenses = ()=>{
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
    const createDepense = (product)=>{
      return axios
      .post(API_URL + "create", product,{ headers: authHeader() })
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
    const deleteDepense = (id)=>{
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

    return {listDepenses,createDepense,deleteDepense};
}