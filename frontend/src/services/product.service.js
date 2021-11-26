
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
    const createProduct = (product)=>{
      return axios
      .post(API_URL + "create", product,{ headers: authHeader() })
      .then(response => {
        return response.data;
      });
    }
    const deleteProduct = (id)=>{
      return axios
      .post(API_URL + "delete?id="+id, {},{ headers: authHeader() })
      .then(response => {
        return response.data;
      });
    }

    return {listProducts,createProduct,deleteProduct};
}