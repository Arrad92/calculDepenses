import React from "react";
import { useSelector } from 'react-redux';
export const useAuthed = ()=>{
    const authed = localStorage.getItem("user") ? true : false;
    return authed;
}