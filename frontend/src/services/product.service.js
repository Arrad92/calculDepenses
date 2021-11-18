
import axios from 'axios';
import {host} from '../././const.js'
import authHeader from './auth-header.js';

const API_URL = host+"Produit/";
export const ProductService = ()=>{
    
    const listProducts = ()=>{
    return axios
      .post(API_URL + "all", {
        
      },{ headers: authHeader() })
      .then(response => {
        return response.data;
      });

    }

    return {listProducts};
}